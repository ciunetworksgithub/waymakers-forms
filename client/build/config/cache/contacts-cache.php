<?php
include_once "config/cache/cache.php";

class ContactsCache
{
  private static $key = 'contacts';

  public static function get($companyID)
  {
    return (new Cache(self::$key . '-' . $companyID))->get();
  }

  public static function set($companyID, $data)
  {
    return (new Cache(self::$key . '-' . $companyID))->set($data);
  }
}
