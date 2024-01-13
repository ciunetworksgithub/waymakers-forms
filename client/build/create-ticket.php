<?php

define('API_ENDPOINT', 'https://webservices.autotask.net/atservicesrest/v1.0/');
define('API_INTEGRATION_CODE', 'YOUR_API_INTEGRATION_CODE');

function handle_error($error_message, $status_code = 500)
{
  http_response_code($status_code);
  echo json_encode([
    'status'  => 'error',
    'message' => $error_message,
  ]);
  exit;
}

function autodesk_api_request($json_data)
{
  // Initialize cURL session
  $ch = curl_init();

  // Set cURL options
  curl_setopt($ch, CURLOPT_URL, API_ENDPOINT);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'ApiIntegrationCode: ' . API_INTEGRATION_CODE,
  ]);

  // Execute cURL session and get the response
  $response = curl_exec($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

  if ($status_code !== 200) {
    $error = $status_code === 404 ? "Not found" : curl_error($ch);
    handle_error($error, $status_code);
  }

  // Close cURL session
  curl_close($ch);

  return $response;
}

function validate_request_method() {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit;
    }
    handle_error('Invalid request method');
  }
}

function get_post_data() {
  // Read JSON data from the POST body
  $input_json = file_get_contents('php://input');
  $post_data = json_decode($input_json, true);

  // Check if JSON decoding was successful
  if ($post_data === null) {
    handle_error('Error decoding input JSON data');
  }

  // Return encoded json to forward unfettered to Autotask
  return $input_json;
}

header('Content-Type: application/json');

validate_request_method();

echo autodesk_api_request(get_post_data());
