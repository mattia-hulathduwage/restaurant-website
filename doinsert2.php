<?php
session_start(); // Ensure session is started
include 'connection.php'; // Include your database connection details

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT first_name, email, telephone, address FROM member WHERE email=? AND password=?");
    $stmt->bind_param("ss", $email, $password);

    // Execute query
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Valid credentials, fetch user details
        $row = $result->fetch_assoc();
        $_SESSION['first_name'] = $row['first_name'];
        $_SESSION['email'] = $row['email']; // Store email in session
        $_SESSION['telephone'] = $row['telephone']; // Store telephone in session
        $_SESSION['address'] = $row['address']; // Store address in session
        
        // Debugging output
        error_log("Session first_name set: " . $_SESSION['first_name']);
        error_log("Session email set: " . $_SESSION['email']);
        error_log("Session telephone set: " . $_SESSION['telephone']);
        error_log("Session address set: " . $_SESSION['address']);
        
        // Redirect to personal_info.html or any other page as needed
        header("Location: member.html");
        exit;
    } else {
        // Invalid credentials
        echo "Invalid email or password.";
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
}
?>
