<?php
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get all todos for a user
    $userId = $_GET['user_id'] ?? null;
    
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'user_id diperlukan']);
        exit();
    }
    
    $stmt = $pdo->prepare("SELECT * FROM todo WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $todos = $stmt->fetchAll();
    
    // Convert completed boolean
    foreach ($todos as &$todo) {
        $todo['completed'] = (bool)$todo['completed'];
        $todo['done'] = $todo['completed']; // For frontend compatibility
    }
    
    echo json_encode($todos);
    
} elseif ($method === 'POST') {
    // Create new todo
    $data = json_decode(file_get_contents('php://input'), true);
    
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $startDate = $data['start_date'] ?? '';
    $endDate = $data['end_date'] ?? '';
    $userId = $data['user_id'] ?? null;
    
    if (empty($title) || empty($startDate) || empty($endDate) || !$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'Data tidak lengkap']);
        exit();
    }
    
    $stmt = $pdo->prepare("INSERT INTO todo (title, description, start_date, end_date, user_id) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$title, $description, $startDate, $endDate, $userId])) {
        $todoId = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM todo WHERE id = ?");
        $stmt->execute([$todoId]);
        $todo = $stmt->fetch();
        $todo['completed'] = (bool)$todo['completed'];
        $todo['done'] = $todo['completed'];
        echo json_encode($todo);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal membuat todo']);
    }
    
} elseif ($method === 'PUT') {
    // Update todo
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = $data['id'] ?? null;
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $startDate = $data['start_date'] ?? '';
    $endDate = $data['end_date'] ?? '';
    $completed = $data['completed'] ?? false;
    
    if (!$id || empty($title) || empty($startDate) || empty($endDate)) {
        http_response_code(400);
        echo json_encode(['error' => 'Data tidak lengkap']);
        exit();
    }
    
    $stmt = $pdo->prepare("UPDATE todo SET title = ?, description = ?, start_date = ?, end_date = ?, completed = ? WHERE id = ?");
    if ($stmt->execute([$title, $description, $startDate, $endDate, $completed ? 1 : 0, $id])) {
        $stmt = $pdo->prepare("SELECT * FROM todo WHERE id = ?");
        $stmt->execute([$id]);
        $todo = $stmt->fetch();
        $todo['completed'] = (bool)$todo['completed'];
        $todo['done'] = $todo['completed'];
        echo json_encode($todo);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal mengupdate todo']);
    }
    
} elseif ($method === 'DELETE') {
    // Delete todo
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID diperlukan']);
        exit();
    }
    
    $stmt = $pdo->prepare("DELETE FROM todo WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => true, 'message' => 'Todo berhasil dihapus']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal menghapus todo']);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method tidak diizinkan']);
}
?>



