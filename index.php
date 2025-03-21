<?php
require_once 'config/config.php';

// Check if maintenance mode is enabled
$maintenance_mode = getSetting('maintenance_mode');
if ($maintenance_mode == '1') {
    header('Location: maintenance.php');
    exit;
}

// Fetch site settings
$site_title = getSetting('site_title');
$site_description = getSetting('site_description');
$contact_email = getSetting('contact_email');

function getSetting($name) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT value FROM settings WHERE name = ?");
    $stmt->execute([$name]);
    return $stmt->fetchColumn();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($site_title); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($site_description); ?>">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1><?php echo htmlspecialchars($site_title); ?></h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="categories.html">Categories</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="hero-section">
            <h2>Welcome to <?php echo htmlspecialchars($site_title); ?></h2>
            <p><?php echo htmlspecialchars($site_description); ?></p>
            <a href="categories.html" class="btn">Explore Categories</a>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 <?php echo htmlspecialchars($site_title); ?>. All Rights Reserved.</p>
    </footer>
</body>
</html>