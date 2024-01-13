<?php
include_once("config/load.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_response();
  $response = (new AutotaskApiClient())->create_ticket(get_post_data());
  echo $response;
} catch (Exception $e) {
  handle_api_exception($e);
}
