<?php
include_once("config/cache/departments-cache.php");
include_once("lib/autotask-api-client.php");
include_once("lib/util.php");

try {
  setup_api_get_response();
  $data = DepartmentsCache::get();
  if (!$data) {
    $data = json_encode((new AutotaskApiClient())->get_departments());
    DepartmentsCache::set($data);
  }
  echo $data;
} catch (Exception $e) {
  handle_api_exception($e);
}
