<?php
session_start(); // Ensure session is started

if (isset($_SESSION['first_name']) && isset($_SESSION['email']) && isset($_SESSION['telephone'])) {
    // Assuming 'address' is also stored in session (modify accordingly based on your database schema)
    echo json_encode([
        'status' => 'success', 
        'first_name' => $_SESSION['first_name'], 
        'email' => $_SESSION['email'],
        'telephone' => $_SESSION['telephone'],
        'address' => $_SESSION['address'] // Add 'address' to the JSON response
    ]);
} else {
    // Debugging output
    if (!isset($_SESSION['first_name'])) {
        error_log("First name not set in session");
    }
    if (!isset($_SESSION['email'])) {
        error_log("Email not set in session");
    }
    if (!isset($_SESSION['telephone'])) {
        error_log("Telephone not set in session");
    }
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
