<?php
include_once("lib/util.php");

function read_config($name)
{
  $path = (is_dev() ? "../" : "../../") . "config";
  if ($_GET['path'] === "/HR") {
    $filepath = $path . "/HR/" . $name . ".json";
    if (file_exists($filepath)) {
      $hr_config = json_decode(file_get_contents($filepath));
      $config = json_decode(file_get_contents($path . "/" . $name . ".json"));
      return json_encode(array_merge($hr_config, $config));
    }
  }
  return file_get_contents($path . "/" . $name . ".json");
}

try {
  setup_api_get_response();

  switch ($_GET['type']) {
    case "forms":
      echo read_config("forms");
      break;
    case "fields":
      echo read_config("field-defaults");
      break;
    default:
      send_error_response('Invalid config type requested');
  }
} catch (Exception $e) {
  handle_api_exception($e);
}
