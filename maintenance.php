<?php
require_once 'config/config.php';

// Allow admin access during maintenance
if (isAdmin()) {
    header('Location: /admin/dashboard.php');
    exit;
}

// Check if site is in maintenance mode
$stmt = $pdo->query("SELECT value FROM settings WHERE name = 'maintenance_mode'");
$maintenance = $stmt->fetchColumn();

if ($maintenance != '1') {
    header('Location: /');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance - AniDox</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>AniDox</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="categories.html">Categories</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="maintenance-section">
            <h2>We'll be back soon!</h2>
            <p>Our website is currently undergoing scheduled maintenance. Thank you for your patience.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 AniDox. All Rights Reserved.</p>
    </footer>
</body>
</html>