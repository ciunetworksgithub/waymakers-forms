#these will be sent wiht every request to log into the API
$headers = @{
  "UserName"= "e7sd77klwrn6w42@CIUNETWORKS.COM";
  "Secret" = "m#6SYp@7*H4qCw`$5t~9J3zT@*";
  "APIIntegrationcode" = "HVCX5PG5HSPA4V2V6SXFCTNXB7T";
  "Content-Type" = "application/json";
}

#load all the companies from autotask so we can get the company id
$company_lookup = @()
if(Test-Path '.\Company_Lookup.csv'){
  $company_lookup = Import-Csv '.\Company_Lookup.csv'
}
#load all the products so we can get the product ID
$product_lookup = @()
if(Test-Path '.\ModelLookup.csv'){
  $product_lookup = Import-Csv '.\ModelLookup.csv'
}

#This gets all the devices from autotask
$autotaskdevices = @()
$uri = 'https://webservices15.autotask.net/ATServicesRest/v1.0/ConfigurationItems/query?search={"filter":[{"op":"eq","field":"isActive","value":"true"}]}'
$devices = @()
do{
$response = Invoke-RestMethod -Uri $uri `
-Method Get `
-ContentType 'application/json' `
-Headers $headers `
-SkipCertificateCheck `
-SessionVariable s
$devices += $response.items
$uri = $response.PageDetails.NextPageUrl
}while($null -ne $uri)

#this next line would output all the devices into a json file
#$devices | ConvertTo-Json -Depth 100 | Out-File AutotaskA.json

#then we get the ones that are unifi
$count = 0;
foreach($dev in $devices){
  $unifi = $dev.userDefinedFields | Where-Object {$_.name -eq "Unifi"}

  if($unifi.value -eq "Yes"){
      $autotaskdevices += $dev
      $count+= 1
  }
}
Write-Host $count

#now we have all the unifi devices from autotask so we have to compare them to the ones from UniFi
#this outputs the unifi devices to a csv file
$autotaskdevices | Export-Csv -Path '.\AutoTask_Devices.csv' -NoTypeInformation

#now we have to import the unifi devices from unifi
$unifi_devices = @()
if(Test-Path '.\UniFi_Devices.csv'){
  Write-Host "Importing from UniFi Devices"
  $unifi_devices = Import-Csv '.\UniFi_Devices.csv'
}
#the install date on autotask will be set to today so we get today's date
$today = Get-Date -Format "yyyy-MM-dd"
foreach($unifi_dev in $unifi_devices){
  #getting the information from the unifi device to put into autotask
  $mac = $unifi_dev.MACAddress
  $model = $unifi_dev.UniFiModel
  $name = $unifi_dev.DeviceName
  $site = $unifi_dev.SiteName
  #checking for a matching autotask device
  $auto_dev = $autotaskdevices | Where-Object {$_.serialNumber -eq $mac}
  #getting the product ID and company ID from our lookup tables
  $productID = $product_lookup | Where-Object {$_.UniFiModel -eq $model}
  $productID = $productID.ATPID
  $companyID = $company_lookup | Where-Object {$_.SiteName -eq $unifi_dev.Site_ID} | Select-Object CompanyID
  $companyID = $companyID.CompanyID
  Write-Host $companyID
  #check whether it is present in autotask and unifi
  if($null -ne $auto_dev){
      #the unifi device is present in autotask
      #check to see if the unifi device has been deleted
      if($unifi_dev.deleteDate -ne ""){
          #the device has been deleted from unifi so we delete it from autotask (we only create a ticket)
          Write-Host "Deactivating $name($model) with $mac present in both Autotask and UniFi"
          #tickets need a due date so we make it tomorrow
          $duedate = Get-Date
          $duedate.AddDays(1)
          $duedate = $duedate | Get-Date
          #set title for the ticket
          $title = "Hardware Decomission | Contract Update Add UniFi Device MAC: $mac `nModel: $model `nSite: $site"
          #create the body for the ticket POST request
          $body = @{
              "id"="0";
              "companyID"=$companyID;
              "dueDateTime"=$duedate;
              "priority"="2";
              "status"="1";
              "title"= $title
              "ticketCategory"= 150
              "queueID" = 29683488
              "configurationItemId"=$auto_dev.id
          }
          #convert it to json
          $body = ConvertTo-Json $body
          #this is the uri for sending POST requests to create new tickets (notice how it is different from the one we used for configuration items)
          $uri = 'https://webservices15.autotask.net/ATServicesRest/v1.0/Tickets'
          #send the ticket POST request
          Invoke-RestMethod -Uri $uri `
          -Body $body `
          -Method Post `
          -ContentType 'application/json' `
          -Headers $headers `
          -SkipCertificateCheck `
          -SessionVariable s

      }else{
          #the device is in both unifi and autotask so we do nothing
          #this is just a log statement acknowledging that we processed the device
          Write-Host "$name($model) with $mac present in both Autotask and UniFi"
      }
  }elseif("" -eq $unifi_dev.deleteDate){
      #the unifi device does not exist in autotask so we have to add it
      #logging which device we are adding
      Write-Host "Adding $name($model) with $mac to Autotask Company $CompanyID"
      #this will be the body of the post request sent to create a new configurationitem
      #id is set to zero because it will be initialized automatically

      $body = @{
          "id"="0";
          "companyID"=$companyID;
          "isActive"="True";
          "productID"=$productID
          "referenceTitle" = $unifi_dev.DeviceName;
          "serialNumber"=$mac;
          "installDate"=$today;
          "userDefinedFields"= @(@{
              "name"="Unifi";
              "value"="Yes";
          })
      }
      #the body needs to be in json to be sent with the request
      $body = ConvertTo-Json $body
      #this is the specific url of the api that we are sending the POST request to
      $uri = 'https://webservices15.autotask.net/ATServicesRest/v1.0/ConfigurationItems'
      #this is how you send a POST request
      $response = Invoke-RestMethod -Uri $uri `
      -Body $body `
      -Method Post `
      -ContentType 'application/json' `
      -Headers $headers `
      -SkipCertificateCheck `
      -SessionVariable s

      $uri = 'https://webservices15.autotask.net/ATServicesRest/v1.0/ConfigurationItems/query?search={"filter":[{"op":"eq","field":"serialNumber","value":"'+$mac+'"}]}'
      $devs = @()
      $response = Invoke-RestMethod -Uri $uri `
      -Method Get `
      -ContentType 'application/json' `
      -Headers $headers `
      -SkipCertificateCheck `
      -SessionVariable s
      $devs += $response.items
      $count = $devs | Measure-Object
      $count = $count.count
      $count| Write-Host
      if($count -gt 1){
          $max = 0;
          foreach($id in $devs){
              if($id.id -gt $max){
                  $max = $id.id
              }
          }
      }else{
          $max = $id.id
      }
      $max
      #tickets need a due date so we make it tomorrow
      $duedate = Get-Date
      $duedate.AddDays(1)
      $duedate = $duedate | Get-Date
      #set title for the ticket
      $title = "Hardware Deployment | Contract Update Add UniFi Device MAC: $mac `nModel: $model `nSite: $site"
      #create the body for the ticket POST request
      $body = @{
          "id"="0";
          "companyID"=$companyID;
          "dueDateTime"=$duedate;
          "priority"="2";
          "status"="1";
          "title"= $title
          "ticketCategory"= 150
          "queueID" = 29683488
          "configurationItemID" = $max
      }
      #convert it to json
      $body = ConvertTo-Json $body
      #this is the uri for sending POST requests to create new tickets (notice how it is different from the one we used for configuration items)
      $uri = 'https://webservices15.autotask.net/ATServicesRest/v1.0/Tickets'
      #send the ticket POST request
      $newtick = Invoke-RestMethod -Uri $uri `
      -Body $body `
      -Method Post `
      -ContentType 'application/json' `
      -Headers $headers `
      -SkipCertificateCheck `
      -SessionVariable s
  }

}








