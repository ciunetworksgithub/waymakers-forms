<?php
// Expects the following to be defined in settings.php. Their values can be
// retreived from MyGlue as Username, Password and Tracking Identifier:
// - AUTOTASK_API_ENDPOINT: The URL to Autotask REST API server
// - AUTOTASK_API_INTEGRATION_CODE: Tracking Identifier
// - AUTOTASK_API_SECRET: Password
// - AUTOTASK_API_USERNAME: Username
include_once('config/load.php');

class AutotaskApiClient
{
  private static $endpoint = AUTOTASK_API_ENDPOINT;
  private static $integration_code = AUTOTASK_API_INTEGRATION_CODE;
  private static $secret = AUTOTASK_API_SECRET;
  private static $username = AUTOTASK_API_USERNAME;

  private $ch;

  public function __construct()
  {
    $this->ch = curl_init();
    curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
  }

  public function __destruct()
  {
    curl_close($this->ch);
  }

  public function create_attachment($ticket_id, $attrs)
  {
    $url = '/Tickets/' . $ticket_id . '/Attachments';
    return $this->post($url, $attrs);
  }

  public function create_ticket($attrs)
  {
    return $this->post('/Tickets', $attrs);
  }

  public function get_configuration_items()
  {
    $items = [];
    $url = '/ConfigurationItems/query?search={"filter":[{"op":"eq","field":"isActive","value":"true"}]}';
    do {
      $response = json_decode($this->request($url));
      $items = array_merge($items, $response->items);
      $url = $response->pageDetails->nextPageUrl;
      if ($url) {
        $url = str_replace(self::$endpoint, "", $url);
      }
    } while ($url);
    return $items;
  }

  public function get_contacts_by_company_id($company_id)
  {
    $filter = '{"filter":[{"op":"eq","field":"companyID","value":"' . $company_id . '"},{"op":"eq","field":"isActive","value":"1"}]}';
    $url = '/Contacts/query?search=' . $filter;
    return json_encode(json_decode($this->request($url))->items);
  }

  public function  get_contacts_by_email($email)
  {
    $filter = '{"filter":[{"op":"eq","field":"emailAddress","value":"' . $email . '"},{"op":"eq","field":"isActive","value":"1"}]}';
    $url = '/Contacts/query?search=' . $filter;
    return json_encode(json_decode($this->request($url))->items);
  }

  public function get_departments()
  {
    $url = '/Departments/query?search={"filter":[]}';
    return json_decode($this->request($url))->items;
  }

  public function get_ticket($id)
  {
    $url = '/Tickets/' . $id;
    return $this->request($url);
  }

  public function get_ticket_fields()
  {
    $url = '/Tickets/entityinformation/fields';
    return $this->request($url);
  }

  public function get_user_defined_fields()
  {
    $url = '/UserDefinedFieldDefinitions/query?search={"filter":[]}';
    return $this->request($url);
  }

  public function post($url, $json_data)
  {
    curl_setopt($this->ch, CURLOPT_POST, 1);
    return $this->request($url, $json_data);
  }

  private function request($url, $data = null)
  {
    curl_setopt($this->ch, CURLOPT_URL, self::$endpoint . $url);
    if ($data) {
      curl_setopt($this->ch, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($this->ch, CURLOPT_HTTPHEADER, [
      'Content-Type: application/json',
      'ApiIntegrationCode: ' . self::$integration_code,
      'Secret: ' . self::$secret,
      'UserName: ' . self::$username,
    ]);

    $response = curl_exec($this->ch);
    $status_code = curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
    if ($status_code >= 300) {
      if (!$response) {
        $response = curl_error($this->ch);
      }
      throw new Exception($response, $status_code);
    }

    return $response;
  }
}
