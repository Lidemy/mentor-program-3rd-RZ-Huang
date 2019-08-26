<?php
  require_once('./conn.php');
  header('Content-Type: text/plain; charset=utf-8');

  // escape & intval 
  function getHtmlspecialchars($str) {
    if (!is_numeric($str)) {
      return htmlspecialchars($str, ENT_QUOTES , 'utf-8');
    }
    return intval(htmlspecialchars($str, ENT_QUOTES , 'utf-8'));
  }

  // GET All item
  function getAllItem() {
    global $conn;
    $sql = "SELECT * FROM todo_list";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $allItemsArr = array();
      while ($eachItemRow = $result->fetch_assoc()) {
        array_push($allItemsArr,$eachItemRow);
      }
      echo json_encode($allItemsArr);
    }
  }

  // GET one item
  function getItem() {
    global $conn;
    $id = getHtmlspecialchars($_GET['id']);
    $sql = "SELECT * FROM todo_list WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      while ($eachItemRow = $result->fetch_assoc()) {
        echo json_encode($eachItemRow);
      }
    }
  }

  // POST item
  function addItem() {
    global $conn;
    $itemName = getHtmlspecialchars($_POST['itemName']);
    $state = 1;
    
    if ($itemName !== ''){
      $sql = "INSERT INTO todo_list(item_name, state) VALUE(?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("ss", $itemName, $state);
      $stmt->execute();
    }
  }

  // DELETE item
  function deleteItem() {
    global $conn;
    parse_str(file_get_contents('php://input'), $requestVar);
    $id = getHtmlspecialchars($requestVar['id']);

    $sql = "DELETE FROM todo_list WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
  }
  
  // PATCH state
  function editState() {
    global $conn;
    parse_str(file_get_contents('php://input'), $requestVar);
    $id = getHtmlspecialchars($requestVar['id']);

    // get state of item 
    $sqlGetState = "SELECT state FROM todo_list WHERE id = ?";
    $stmtGetState = $conn->prepare($sqlGetState);
    $stmtGetState->bind_param("i", $id);
    $stmtGetState->execute();
    $resultGetState = $stmtGetState->get_result();
    if ($resultGetState->num_rows > 0) {
      $rowGetState = $resultGetState->fetch_assoc()['state'];
    }

    // switch state of item
    if ($rowGetState === 1) {
      $sqlUpdate = "UPDATE todo_list SET state = 2 WHERE id = ?";
    } else if ($rowGetState === 2) {
      $sqlUpdate = "UPDATE todo_list SET state = 1 WHERE id = ?";
    }
    $stmtUpate = $conn->prepare($sqlUpdate);
    $stmtUpate->bind_param("i", $id);
    $stmtUpate->execute();

  }

  // PATCH item
  function editItem() {
    global $conn;
    parse_str(file_get_contents('php://input'), $requestVar);
    $id = getHtmlspecialchars($requestVar['id']);
    $itemName = getHtmlspecialchars($requestVar['itemName']);

    $sql = "UPDATE todo_list SET item_name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $itemName, $id);
    $stmt->execute();
  }
  
  // router of method 
  function router() {
    global $conn;
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
      case 'GET':
        if (isset($_GET['id'])) {
          getItem();
        } else {
          getAllItem();
        }
        break;
      case 'POST':
        addItem();
        break;
      case 'DELETE':
        deleteItem();
        break;
      case 'PATCH':
        parse_str(file_get_contents('php://input'), $requestVar);
        if (isset($requestVar['itemName'])) {
          editItem();
        } else {
          editState();
        }
        break;
      default:
        echo "Error method,please type a right method again.";
    }
  }
  
  router();

?>