<?php
include_once "config/cache/cache.php";

class ConfigurationItemsCache
{
  private static $key = 'configuration-items';

  public static function get()
  {
    return (new Cache(self::$key))->get();
  }

  public static function set($data)
  {
    return (new Cache(self::$key))->set($data);
  }
}
