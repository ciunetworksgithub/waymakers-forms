<?php

class Cache
{
  private $key;
  private $file_path;
  private $ttl = 86_400; // one day

  public function __construct($key, $ttl = null)
  {
    $this->key = $key;
    if (!file_exists('cache')) mkdir('cache', 0744);
    $this->file_path = './cache/' . $key . '.json';

    if ($ttl) {
      $this->ttl = $ttl;
    }
  }

  public function clear_all()
  {
    if (!file_exists('./cache')) {
      error_log("cannot clear cache, cache dir doesn't exist");
      return;
    }
    return shell_exec("rm -f ./cache/" . $this->key . '*');
  }

  public function get()
  {
    if (!file_exists($this->file_path)) {
      error_log("cache miss - file doesn't exist: " . $this->file_path);
      return;
    }

    if ($this->is_expired()) {
      error_log("cache miss - expired: " . $this->file_path);
      return;
    }

    error_log("cache hit: " . $this->file_path);
    return file_get_contents($this->file_path);
  }

  public function set($data)
  {
    file_put_contents($this->file_path, $data);
  }

  private function is_expired()
  {
    $age = time() - filemtime($this->file_path);
    return $age > $this->ttl;
  }
}
