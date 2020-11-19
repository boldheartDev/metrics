<?php
//if(!isset($_SESSION)) { 
    //session_start(); 
//} 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once "../../callback.php";
require_once  "../../src/connect.php";
require_once "../../vendor/autoload.php";

$message = isset($_SESSION['message']) ? $_SESSION['message'] : '';
$_SESSION['message'] = "";
unset($_SESSION['message']);

//$token = $_SESSION['token'];

//Variables passed through form
$query = "SELECT token FROM salesCenter WHERE tokenID = 0";

$tokenReturn = mysqli_query($conn, $query);
// Decrypt and unserialize the token object from your database
$tokenRow = mysqli_fetch_assoc($tokenReturn);

$token = $tokenRow['token'];
//print_r($token);
$tokenUnserial = unserialize($tokenRow['token']);
//print_r($tokenUnserial);

$encode = json_encode($tokenUnserial, true);
$decode = json_decode($encode);

$accessToken = get_object_vars($decode)['accessToken'];

if (isset($token)) {
    $infusionsoft->setToken($tokenUnserial);
}
// If we are returning from Infusionsoft we need to exchange the code for an access token.
if (isset($_GET['code']) and !$infusionsoft->getToken()) {
    $infusionsoft->requestAccessToken($_GET['code']);
}
//Get user's members

$userId = $_GET['id'];
$start = $_GET['start'];
$end = $_GET['end'];

$newEnd = strtotime($end);
$newEndDate = date('Y-m-d', $newEnd );
$newE = new DateTime($newEndDate);
$resEnd = $newE->format("Y-m-d H:i:s");

function getCWP($infusionsoft, $userId, $start){
  $newStart = strtotime($start);
  $newStartDate = date('Y-m-d', $newStart );

  $table = 'ContactAction';
  $limit = 1000;
  $page = 0;
  $queryData  = array('UserID' => $userId, 'IsAppointment' => 1, 'CreationDate' => '~>=~ '. $newStartDate .' 00:00:00');
  $selectedFields = array('Id', 'UserID', 'ContactId', 'ActionDescription', 'ActionDate', 'IsAppointment', 'Priority', 'CompletionDate', 'CreationDate');
  $orderBy = 'CreationDate';
  $ascending = TRUE;
  
  $apptRequest = $infusionsoft->data()->query($table, $limit, 0, $queryData, $selectedFields, $orderBy, $ascending);

  return $apptRequest;
}

function getDials($userId, $start, $end, $accessToken){
  //Get Tasks completed
  $requestDials = 'https://api.infusionsoft.com/crm/rest/v1/tasks?user_id='. $userId .'&since='. $start .'&until='. $end .'&order=due_date&completed=true&access_token='. $accessToken;
      
  $sessionDials = curl_init($requestDials); 

  curl_setopt($sessionDials, CURLOPT_HEADER, false); 
  curl_setopt($sessionDials, CURLOPT_RETURNTRANSFER, true); 
  $responseDials = curl_exec($sessionDials); 
  curl_close($sessionDials); 

  return json_decode($responseDials);
}

//If token is available
if ($infusionsoft->getToken()) {
  try {
    $dials = getDials($userId, $start, $end, $accessToken);
    $cwp = getCWP($infusionsoft, $userId, $start);

    $cwpArr = array();

    foreach($cwp as $item){
      $itemDate = $item['CreationDate']->format("Y-m-d H:i:s");
      if($itemDate <= $resEnd){
        $cwpArr[] = $item;
      }
    }

    $callsObj = new stdClass();
    $callsObj->dials = $dials->tasks;
    $callsObj->cwp = $cwpArr;

    echo json_encode($callsObj, true);

  //If token is not available, refresh 
  } catch(\Infusionsoft\TokenExpiredException $e) {

    $infusionsoft->refreshAccessToken();

    $dials = getDials($userId, $start, $end, $accessToken);
    $cwp = getCWP($infusionsoft, $userId, $start);

    $cwpArr = array();

    foreach($cwp as $item){
      echo $item['CreationDate']->format("Y-m-d H:i:s");
      $itemDate = $item['CreationDate']->format("Y-m-d H:i:s");
      if($itemDate <= $resEnd){
        $cwpArr[] = $item;
      }
    }

    $callsObj = new stdClass();
    $callsObj->dials = $dials->tasks;
    $callsObj->cwp = $cwpArr;

    echo json_encode($callsObj, true);


  }
    
//All done with call, now store new token for future call
    $_SESSION['token'] = serialize($infusionsoft->getToken());
    //$token_array = $_SESSION['token'];
    //print_r($_SESSION['token']);
    $tokenSerial = $_SESSION['token'];
    //print_r($tokenSerial);

    //Store $tokenSerial somewhere and/or begin making API calls
    
    $tokenSerial = $conn->real_escape_string($tokenSerial);

    if(isset($tokenSerial)){
        $query = "UPDATE salesCenter SET token = '$tokenSerial', dateposted = now() WHERE tokenID = 0" or die(mysql_error());

        if($conn->query($query) === TRUE) {
            //echo "Token stored successfully, again";
        }else{
            echo "Error: <br>" . $conn->error;
        }

        $conn->close();
    }
}
?>