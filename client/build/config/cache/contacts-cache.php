<?php
include_once "config/cache/cache.php";

class ContactsCache
{
  private static $key = 'contacts';
  private static $ttl = 10_800;

  public static function get($companyID)
  {
    return (new Cache(self::$key . '-' . $companyID, self::$ttl))->get();
  }

  public static function set($companyID, $data)
  {
    return (new Cache(self::$key . '-' . $companyID))->set($data);
  }
}
