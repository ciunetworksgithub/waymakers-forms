<?php
include_once("config/cache/configuration-items-cache.php");
include_once("lib/autotask-api-client.php");

class ConfigurationItems
{
  public static function get()
  {
    $data = ConfigurationItemsCache::get();
    if (!$data) {
      $search = json_decode('{"filter":[{"op":"eq","field":"isActive","value":"true"}]}');
      $data = (new AutotaskApiClient())->get_configuration_items($search);
      ConfigurationItemsCache::set(json_encode($data));
    }
    return $data;
  }
}
