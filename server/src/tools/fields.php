#!/usr/local/bin/php
<?php
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_get_response();
  echo (new AutotaskApiClient())->get_ticket_fields();
} catch (Exception $e) {
  handle_api_exception($e);
}

