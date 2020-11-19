<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  require_once "../../callback.php";
  require_once  "../../src/connect.php";
  require_once "../../vendor/autoload.php";

  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  $userId = $_GET['id'];
  $start = $_GET['start'];
  $end = $_GET['end'];
  //Test data 

  //Variables passed through form
  $query = "SELECT token FROM salesCenter WHERE tokenID = 0";

  $tokenReturn = mysqli_query($conn, $query);
  // Decrypt and unserialize the token object from your database
  $tokenRow = mysqli_fetch_assoc($tokenReturn);

  $token = unserialize($tokenRow['token']);

  $encode = json_encode($token, true);
  $decode = json_decode($encode);

  $accessToken = get_object_vars($decode)['accessToken'];
  //$tokenUnserial = unserialize($decode);
  if (isset($token)) {
    $infusionsoft->setToken(unserialize($tokenRow['token']));
  }
  // If we are returning from Infusionsoft we need to exchange the code for an access token.
  if (isset($_GET['code']) and !$infusionsoft->getToken()) {
      $infusionsoft->requestAccessToken($_GET['code']);
  }

  //Get Tasks completed
  $requestDials = 'https://api.infusionsoft.com/crm/rest/v1/tasks?user_id='. $userId .'&since='. $start .'&until='. $end .'&order=due_date&completed=true&access_token='. $accessToken;
      
  $sessionDials = curl_init($requestDials); 

  curl_setopt($sessionDials, CURLOPT_HEADER, false); 
  curl_setopt($sessionDials, CURLOPT_RETURNTRANSFER, true); 
  $responseDials = curl_exec($sessionDials); 
  curl_close($sessionDials); 

  //Get New CIS Formal + GAC
  function getCWP($infusionsoft, $userId, $start){
    $table = 'ContactAction';
    $limit = 1000;
    $page = 0;
    $queryData = array('UserID' => $userId, 'ActionDate' => '%', 'IsAppointment' => 1, 'CompletionDate'=>'~null~');

    $selectedFields = array('Id', 'UserID', 'ContactId', 'ActionDescription', 'ActionDate', 'IsAppointment', 'Priority', 'CompletionDate', 'CreationDate' => $start);
    $orderBy = 'ActionDate';
    $ascending = TRUE;
    
    $apptRequest0 = $infusionsoft->data()->query($table, $limit, 0, $queryData, $selectedFields, $orderBy, $ascending);

    $apptRequest1 = $infusionsoft->data()->query($table, $limit, 1, $queryData, $selectedFields, $orderBy, $ascending);

    return array_merge($apptRequest0, $apptRequest1);
  }

  //If token is available
  if ($infusionsoft->getToken()) {
    try {
      $callsObj = new stdClass();

      $callsObj->dials = $responseDials;
      $callsObj->cwp = getCWP($infusionsoft, $userId, $start);
      //Get list of user's members
      echo json_encode($callsObj, true);

    //If token is not available, refresh 
    } catch(\Infusionsoft\TokenExpiredException $e) {

      $infusionsoft->refreshAccessToken();

      //$newToken = $infusionsoft->refreshAccessToken();
      
      //Get list of user's members
      $callsObj = new stdClass();

      $callsObj->dials = $responseDials;
      $callsObj->cwp = getCWP($infusionsoft, $userId, $start);
      //Get list of user's members
      echo json_encode($callsObj, true);

    }
  }

  ?>