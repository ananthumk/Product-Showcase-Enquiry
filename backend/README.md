# Product Showcase & Enquiry Backend

A Node.js/Express backend API for managing products and customer enquiries.

## Features

- **Product Management**: Browse, search, and filter products with pagination
- **User Authentication**: Register and login with JWT tokens
- **Enquiry System**: Submit product enquiries with customer details
- **Database**: SQLite for data persistence
- **Error Handling**: Comprehensive error responses
- **CORS**: Enabled for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Body Parser**: Express built-in middleware

## Project Structure

```
backend/
├── controllers/
│   ├── auth.js           # User authentication (login/register)
│   ├── product.js        # Product listing and search
│   └── enquires.js       # Enquiry submission
├── db/
│   └── db.js             # Database connection and setup
├── middlewares/
│   └── auth.middleware.js # JWT authentication middleware
├── routes/
│   ├── auth.js           # Auth endpoints
│   ├── products.js       # Product endpoints
│   └── enquiries.js      # Enquiry endpoints
├── schema.sql            # Database schema
├── seed.sql              # Sample data
├── seed.js               # Seed script
├── index.js              # Main server file
└── package.json
```

## Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize database (optional):**
   ```bash
   npm run seed
   ```

## Running the Server

```bash
npm start
```

Server runs on `http://localhost:4000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "jwt_token", message: "User registered" }
```

#### Login User
```
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "jwt_token", message: "Login successful" }
```

### Products

#### Get All Products (with pagination and filters)
```
GET /api/products?page=1&search=laptop&category=Electronics

Response:
{
  "data": [ { id, name, price, category, image_url, ... } ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Get Product by ID
```
GET /api/products/:id

Response: { data: { id, name, price, category, long_desc, image_url, ... } }
```

### Enquiries

#### Submit Enquiry
```
POST /api/enquiries
Content-Type: application/json

{
  "productId": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "message": "Is this product available in stock?"
}

Response: { message: "Enquire Send", data: { enquiry_record } }
```

#### Get All Enquiries
```
GET /api/enquiries

Response: { data: [ { id, productId, name, email, phone, message, created_at } ] }
```

## Database Schema

### products
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `category` (TEXT)
- `price` (REAL)
- `short_desc` (TEXT)
- `long_desc` (TEXT)
- `image_url` (TEXT)
- `created_at` (DATETIME)

### users
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `email` (TEXT, UNIQUE)
- `password` (TEXT, hashed)
- `created_at` (DATETIME)

### enquiries
- `id` (INTEGER, PRIMARY KEY)
- `productId` (INTEGER, FOREIGN KEY)
- `name` (TEXT)
- `email` (TEXT)
- `phone` (TEXT)
- `message` (TEXT)
- `created_at` (DATETIME)

## Environment Variables

Create a `.env` file (optional):
```
PORT=4000
NODE_ENV=development
```

## Error Handling

All endpoints return consistent error responses:
```json
{
  "message": "Error description",
  "success": false
}
```

HTTP Status Codes:
- `200/201`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

## Security Notes

- Passwords are hashed using bcrypt (implement in auth.js)
- JWT tokens for authentication
- CORS enabled for frontend access
- Input validation recommended for production

## Future Enhancements

- Add product reviews
- Implement admin dashboard
- Email notifications for enquiries
- Advanced search with filters
- Order management system

## License

MIT

## Support

For issues or questions, please check the GitHub repository or contact the development team.
