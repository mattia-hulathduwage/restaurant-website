<?php
include 'connection.php';

$email = "";
$first_name = "";
$last_name = "";
$telephone = ""; 
$password = "";


$email = $_POST['email'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$telephone = $_POST['telephone'];
$password = $_POST['password'];


$sql = "INSERT INTO member (email, first_name, last_name, telephone, password) VALUES('$email', '$first_name', '$last_name', '$telephone', '$password')";

if(mysqli_query($conn, $sql)){
    echo "Data saved successfully!";
}
else{
    echo "Error: " .$sql. "<br>" .mysqli_error($conn);
}
mysqli_close($conn);

?>