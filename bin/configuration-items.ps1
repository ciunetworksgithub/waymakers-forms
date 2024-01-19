$headers = @{
  "UserName"= "e7sd77klwrn6w42@CIUNETWORKS.COM";
  "Secret" = "m#6SYp@7*H4qCw`$5t~9J3zT@*";
  "APIIntegrationcode" = "HVCX5PG5HSPA4V2V6SXFCTNXB7T";
  "Content-Type" = "application/json";
}

$uri = 'https://webservices15.autotask.net/ATServicesRest/v1.0/ConfigurationItems/query?search={"filter":[{"op":"eq","field":"isActive","value":"true"}]}'
$response = Invoke-RestMethod -Uri $uri `
  -Method Get `
  -ContentType 'application/json' `
  -Headers $headers `
  -SkipCertificateCheck `
  -SessionVariable s

$response | ConvertTo-Json