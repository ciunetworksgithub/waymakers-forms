<?php
include_once("config/cache/contacts-cache.php");
include_once("config/load.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_get_response();
  // Limit company id length to 10 to prevent any buffer overflow attempts
  $company_id = substr($_GET['company_id'], 0, 10);
  $contacts = ContactsCache::get($company_id);
  if (!$contacts) {
    $contacts = (new AutotaskApiClient())->get_contacts($company_id);
    ContactsCache::set($company_id, $contacts);
  }
  echo ($contacts);
} catch (Exception $e) {
  handle_api_exception($e);
}
