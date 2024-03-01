<?php
include_once("config/load.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_post_response();
  echo (new AutotaskApiClient())->create_attachment($_GET['ticket_id'], get_post_data());
} catch (Exception $e) {
  handle_api_exception($e);
}
