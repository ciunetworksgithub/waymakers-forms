<?php

function get_post_data()
{
  // Read JSON data from the POST body
  $input_json = file_get_contents('php://input');
  $post_data = json_decode($input_json, true);

  // Check if JSON decoding was successful
  if ($post_data === null) {
    send_error_response('Error decoding input JSON data');
  }

  // Return encoded json to forward unfettered to Autotask
  return $input_json;
}

function handle_api_exception($e)
{
  $error = $e->getMessage();
  $code = $e->getCode();
  if ($e->getCode() === 401) {
    $error = "Unauthorized";
  } else if ($e->getCode() === 404) {
    $error = "Not found";
  }
  send_error_response($error, $code);
}

function send_error_response($error_message, $status_code = 500)
{
  http_response_code($status_code);
  echo json_encode([
    'status'  => 'error',
    'message' => $error_message,
  ]);
  exit;
}

function setup_api_get_response()
{
  header('Content-Type: application/json');

  if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit;
    }
    send_error_response('Invalid request method');
  }
}

function setup_api_post_response()
{
  header('Content-Type: application/json');

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit;
    }
    send_error_response('Invalid request method');
  }
}
