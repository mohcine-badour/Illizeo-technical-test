# Backend API - Illizeo Technical Test

A Laravel-based REST API backend with multi-tenant support, authentication, and company-based data isolation.

## Features

- **Multi-tenant Architecture**: Company-based data isolation using domain-based routing
- **Authentication**: Laravel Sanctum token-based authentication
- **User Management**: User registration, login, and profile management
- **Company Management**: Create and manage companies with domain-based access
- **Notes System**: CRUD operations for notes with company-scoped access
- **User Listing**: List users of the active company with their associated notes

## Requirements

- PHP >= 8.1
- Composer
- MySQL/PostgreSQL/SQLite
- Node.js & NPM (for frontend assets, if needed)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install NPM dependencies** (optional, for frontend assets)
   ```bash
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your `.env` file**
   ```env
   APP_NAME="Illizeo Backend"
   APP_ENV=local
   APP_KEY=base64:...
   APP_DEBUG=true
   APP_URL=http://localhost

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed database** (optional)
   ```bash
   php artisan db:seed
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php      # Authentication endpoints
│   │   │   ├── CompanyController.php   # Company management
│   │   │   ├── NoteController.php      # Notes CRUD operations
│   │   │   └── UserController.php      # User listing
│   │   └── Middleware/
│   │       └── SetActiveCompany.php    # Multi-tenant middleware
│   └── Models/
│       ├── User.php                    # User model
│       ├── Company.php                 # Company model
│       └── Note.php                    # Note model
├── database/
│   ├── migrations/                     # Database migrations
│   └── seeders/                        # Database seeders
└── routes/
    └── api.php                         # API routes
```

## Database Schema

### Companies Table
- `id` - Primary key
- `name` - Company name
- `domain` - Company domain (e.g., `company.localhost`)
- `created_at`, `updated_at` - Timestamps

### Users Table
- `id` - Primary key
- `name` - User name
- `email` - Unique email address
- `password` - Hashed password
- `company_id` - Foreign key to companies table
- `created_at`, `updated_at` - Timestamps

### Notes Table
- `id` - Primary key
- `content` - Note content
- `user_id` - Foreign key to users table
- `created_at`, `updated_at` - Timestamps

## API Endpoints

### Public Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "company_id": 1
}
```
OR
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "company_name": "New Company"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "company_id": 1
}
```

#### List Companies
```http
GET /api/companies
```

#### Create Company
```http
POST /api/companies
Content-Type: application/json

{
  "name": "Company Name"
}
```

### Protected Endpoints (Require Authentication)

All protected endpoints require the `Authorization: Bearer {token}` header.

#### Get Current User
```http
GET /api/user
Authorization: Bearer {token}
```

#### Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

#### List Users (Active Company)
```http
GET /api/users
Authorization: Bearer {token}
```

Returns all users belonging to the active company (based on domain) with their notes.

#### Notes CRUD

**List Notes**
```http
GET /api/notes
Authorization: Bearer {token}
```

**Create Note**
```http
POST /api/notes
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "This is a note"
}
```

**Get Note**
```http
GET /api/notes/{id}
Authorization: Bearer {token}
```

**Update Note**
```http
PUT /api/notes/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Updated note content"
}
```

**Delete Note**
```http
DELETE /api/notes/{id}
Authorization: Bearer {token}
```

## Multi-Tenancy

The application uses domain-based multi-tenancy. The `SetActiveCompany` middleware automatically detects the company based on the request domain:

1. The middleware extracts the host from the request
2. It finds the company matching that domain
3. It sets the active company in the application container using `app()->instance('company.active', $company)`
4. Controllers can access the active company using `app()->make('company.active')`

### Example Usage

When accessing the API via `company1.localhost`, the system automatically:
- Identifies Company 1 as the active company
- Filters all data queries to only return data belonging to Company 1
- Ensures users can only access data from their company

## Authentication

The API uses Laravel Sanctum for token-based authentication:

1. Register or login to receive an access token
2. Include the token in subsequent requests: `Authorization: Bearer {token}`
3. Tokens are stored in the `personal_access_tokens` table

## Data Isolation

- Users can only see notes from users in their company
- Users can only list users from their company
- All data operations are automatically scoped to the user's company

## Testing

Run the test suite:
```bash
php artisan test
```

## Development

### Code Style
The project uses Laravel Pint for code formatting:
```bash
./vendor/bin/pint
```

### Artisan Commands
```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```
