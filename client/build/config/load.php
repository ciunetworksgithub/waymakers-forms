<?php
if (!$_SERVER['HTTP_HOST'] || strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
  include_once('settings.php');
} else {
  include_once('../../settings.php');
}
