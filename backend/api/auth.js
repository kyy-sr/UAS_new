<?php
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';
    
    if ($action === 'register') {
        // Register
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        
        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode(['error' => 'Username dan password harus diisi']);
            exit();
        }
        
        // Check if username already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'Username sudah digunakan']);
            exit();
        }
        
        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert user
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        if ($stmt->execute([$username, $hashedPassword])) {
            $userId = $pdo->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => 'Akun berhasil dibuat!',
                'user' => [
                    'id' => $userId,
                    'username' => $username
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Gagal membuat akun']);
        }
        
    } elseif ($action === 'login') {
        // Login
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        
        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode(['error' => 'Username dan password harus diisi']);
            exit();
        }
        
        // Check user
        $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => true,
                'message' => 'Login berhasil',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Username atau password salah']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Action tidak valid']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method tidak diizinkan']);
}
?>

