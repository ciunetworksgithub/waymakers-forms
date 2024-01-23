<?php
include_once("config/cache/configuration-items-cache.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_get_response();
  $data = ConfigurationItemsCache::get();
  if (!$data) {
    $data = json_encode((new AutotaskApiClient())->get_configuration_items());
    ConfigurationItemsCache::set($data);
  }
  echo $data;
} catch (Exception $e) {
  handle_api_exception($e);
}
