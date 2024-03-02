<?php
include_once("lib/util.php");

if (is_dev()) {
  include_once('settings.php');
} else {
  include_once('../../settings.php');
}
