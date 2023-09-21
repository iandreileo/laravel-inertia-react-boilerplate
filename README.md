## Run Local

1. Install PHP on your machine;
2. Install XAMMP on your machine and open MYSQL;
3. Create a db in mysql;
4. Create .env local and copy content from .env.example in .env;
5. Add DB to .env; (from xammp phpmyadmin)
6. Run composer install in folder;
7. Configure your app roles in RolesSeeder;
8. Run php artisan migrate
9. Run php artisan db:seed
10. Open a terminal in vs code an run php artisan serve;
11. Open another terminal in vs code an run npm run dev;
12. Rename in composer.json, ssr.jsx, app.jsx, app.php the project name;

### Roles

- Open database/seeders/RolesSeeder.php and set the roles & permissions;

### Menu

- Modify the menu in config/menu/admin.php and user.php;
- Verify if the menu is configured in HandleInertiaRequests (and then give it as parameter where you need)

### Add global parameters (like the menu)

- Add it to HandleInertiaRequests and destructure it in pages { given_param }

### Disable functions for CPANEL

php -d "disable_functions=" /path/to/composer install

### Documentation

Add webhook in Stripe;
