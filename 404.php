<?php require_once 'config/config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found - AniDox</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .error-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2rem;
        }
        .error-code {
            font-size: 8rem;
            font-weight: 900;
            color: var(--primary-color);
            margin: 0;
            line-height: 1;
        }
        .error-message {
            font-size: 1.5rem;
            color: var(--text-primary);
            margin: 1rem 0 2rem;
        }
        .back-home {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-md);
            text-decoration: none;
            transition: var(--transition-normal);
        }
        .back-home:hover {
            background: var(--primary-hover);
            transform: translateY(-2px);
        }
    </style>
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
        <section class="error-section">
            <h2>404 - Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="index.html" class="btn">Go to Home</a>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 AniDox. All Rights Reserved.</p>
    </footer>
</body>
</html>