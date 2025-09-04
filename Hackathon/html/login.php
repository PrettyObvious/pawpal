<?php
session_start();

$host = "sql308.infinityfree.com";
$dbname = "if0_39825232_pawpal";
$username = "if0_39825232";
$password = "Pawpal12345";

// Connect to the database
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// First, check the user table
$sqlUser = "SELECT ID, name FROM user WHERE email = ? AND password = ?";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->bind_param("ss", $email, $password);
$stmtUser->execute();
$stmtUser->store_result();

if ($stmtUser->num_rows > 0) {
    $stmtUser->bind_result($user_id, $name);
    $stmtUser->fetch();

    $_SESSION['EMAIL'] = $email;
    $_SESSION['USER_ID'] = $user_id;
    $_SESSION['USER_TYPE'] = 'user';

    $stmtUser->close();
    $conn->close();

    header("Location: index.html"); // Redirect for regular users
    exit();
}
$stmtUser->close(); // Close user statement before trying shelter

// Now, check the shelter table
$sqlShelter = "SELECT ID, name FROM shelter WHERE email = ? AND password = ?";
$stmtShelter = $conn->prepare($sqlShelter);
$stmtShelter->bind_param("ss", $email, $password);
$stmtShelter->execute();
$stmtShelter->store_result();

if ($stmtShelter->num_rows > 0) {
    $stmtShelter->bind_result($shelter_id, $shelter_name);
    $stmtShelter->fetch();

    $_SESSION['EMAIL'] = $email;
    $_SESSION['USER_ID'] = $shelter_id;
    $_SESSION['USER_TYPE'] = 'shelter';

    $stmtShelter->close();
    $conn->close();

    header("Location: shelter_dashboard.html"); // Redirect for shelters
    exit();
}

$stmtShelter->close();
$conn->close();

// If no match found in either table
echo "Invalid email or password.";
?>
