<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && !empty($_GET)) {
        
        $host = 'localhost';
        $db = 'projectbaseautosell';
        $user = 'root';
        $pass = '';
        
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Получаем данные
        $mark = $_GET['mark'] ?? '';
        $model = $_GET['model'] ?? '';
        $release = $_GET['release'] ?? null;
        $price = $_GET['price'] ?? null;
        $mileage = $_GET['mileage'] ?? null;
        $ecapacity = $_GET['ecapacity'] ?? null;
        $transmission = $_GET['transmission'] ?? null;
        $condition = $_GET['condition'] ?? '';
        $numberowners = $_GET['numberowners'] ?? null;
        $description = $_GET['description'] ?? '';
        $sity = $_GET['sity'] ?? '';
        $numberphone = $_GET['numberphone'] ?? '';
        $owner = $_GET['owner'] ?? '';
        
        // Проверка обязательных полей
        if (empty($mark) || empty($model) || empty($release) || empty($price) || empty($condition) || empty($sity) || empty($numberphone) || empty($owner)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Заполните все обязательные поля']);
            exit();
        }
        
        // Вставляем в таблицу carpost с обратными кавычками для зарезервированных слов
        $sql = "INSERT INTO carpost (mark, model, `release`, price, mileage, ecapacity, transmission, `condition`, numberowners, description, sity, numberphone, owner) 
                VALUES (:mark, :model, :release, :price, :mileage, :ecapacity, :transmission, :condition, :numberowners, :description, :sity, :numberphone, :owner)";
        
        $stmt = $pdo->prepare($sql);
        
        $stmt->bindParam(':mark', $mark);
        $stmt->bindParam(':model', $model);
        $stmt->bindParam(':release', $release);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':mileage', $mileage);
        $stmt->bindParam(':ecapacity', $ecapacity);
        $stmt->bindParam(':transmission', $transmission);
        $stmt->bindParam(':condition', $condition);
        $stmt->bindParam(':numberowners', $numberowners);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':sity', $sity);
        $stmt->bindParam(':numberphone', $numberphone);
        $stmt->bindParam(':owner', $owner);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Объявление добавлено']);
        
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Неверный запрос']);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}
?>