<?php
include_once("config/cache/contacts-cache.php");
include_once("config/load.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_get_response();

  if (array_key_exists('refresh', $_GET)) {
    ContactsCache::clear_all();
    echo "Contacts refreshed successfully";
    return;
  }

  // Limit company id length to 10 to prevent any buffer overflow attempts
  $company_id = substr($_GET['company_id'], 0, 10);
  if ($company_id) {
    $contacts = ContactsCache::get($company_id);
    if (!$contacts) {
      $contacts = (new AutotaskApiClient())->get_contacts_by_company_id($company_id);
      ContactsCache::set($company_id, $contacts);
    }
  }

  // Limit company id length to 10 to prevent any buffer overflow attempts
  $email = substr($_GET['email'], 0, 50);
  if ($email) {
    $contacts = ContactsCache::get($email);
    if (!$contacts) {
      $contacts = (new AutotaskApiClient())->get_contacts_by_email($email);
      ContactsCache::set($email, $contacts);
    }
  }

  echo ($contacts);
} catch (Exception $e) {
  handle_api_exception($e);
}
