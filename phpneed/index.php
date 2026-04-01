<?php
// Взаимодействие с front

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


if($_GET !== null){


        $host = 'localhost';
        $db = 'projectbaseautosell';
        $user = 'root';
        $pass = '';
        $charset = 'utf8';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $opt = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        // Получение объекта PDO
        $pdo = new PDO($dsn, $user, $pass, $opt);

        $nickname = $_GET['nickname'];
        $email = $_GET['email'];
        $pass = $_GET['pass'];

        $stmt = $pdo->prepare("INSERT INTO regbase (nickname, email, pass) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $nickname);
        $stmt->bindParam(2, $email);
        $stmt->bindParam(3, $pass);

        $stmt->execute();
}else{
    return false;
}

?>