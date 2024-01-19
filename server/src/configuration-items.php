<?php
include_once("config/load.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_get_response();
  $search = json_decode('{"filter":[{"op":"eq","field":"isActive","value":"true"}]}');
  echo (new AutotaskApiClient())->get_configuration_items($search);
} catch (Exception $e) {
  handle_api_exception($e);
}
