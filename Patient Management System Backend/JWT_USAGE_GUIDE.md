# 🔐 JWT Authentication Usage Guide

## ✅ What's Been Configured

1. ✅ **JWT Authentication Filter** - Validates tokens on every request
2. ✅ **Security Configuration** - All `/api` endpoints now require JWT authentication
3. ✅ **User Registration Endpoint** - Create new users
4. ✅ **User Login Endpoint** - Get JWT tokens

---

## 🚀 How to Use JWT Authentication

### **Step 1: Register a New User**

First, create an account by registering:

```bash
POST http://localhost:8080/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "userId": 1,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "testuser"
}
```

**✅ Save the JWT token!** You'll need it for API requests.

---

### **Step 2: Login (if you already have an account)**

If you already registered, login to get a new token:

```bash
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "userId": 1,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "testuser"
}
```

---

### **Step 3: Use JWT Token in API Requests**

Now use the JWT token to access protected endpoints. Add it to the `Authorization` header:

```bash
GET http://localhost:8080/api/patients
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** 
- Use the word `Bearer` followed by a space, then your token
- Replace the token with your actual JWT token from login/register

---

## 📋 Complete Example Workflow

### **Example 1: Using cURL**

```bash
# 1. Register
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"secret123"}'

# Response: Copy the "jwt" token

# 2. Use the token to access API
curl -X GET http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

### **Example 2: Using Postman**

1. **Register User:**
   - Method: `POST`
   - URL: `http://localhost:8080/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "username": "john",
       "password": "secret123"
     }
     ```
   - Send request → Copy the `jwt` from response

2. **Access Protected Endpoint:**
   - Method: `GET`
   - URL: `http://localhost:8080/api/patients`
   - Headers:
     - `Authorization: Bearer YOUR_JWT_TOKEN_HERE`
   - Send request → Should get 200 OK with data

---

### **Example 3: Using JavaScript/Fetch**

```javascript
// 1. Register
const registerResponse = await fetch('http://localhost:8080/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'john',
    password: 'secret123'
  })
});

const { jwt } = await registerResponse.json();
console.log('JWT Token:', jwt);

// 2. Use token to access API
const apiResponse = await fetch('http://localhost:8080/api/patients', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
});

const patients = await apiResponse.json();
console.log('Patients:', patients);
```

---

## 🔑 Available Endpoints

### **Public Endpoints (No Authentication Required):**

- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login and get JWT token

### **Protected Endpoints (JWT Token Required):**

- `GET /api/patients` - Get all patients
- `GET /api/patient/{id}` - Get patient by ID
- `POST /api/patient` - Create patient
- `PUT /api/patient/{id}` - Update patient
- `DELETE /api/patient/{id}` - Delete patient
- All other `/api/**` endpoints

---

## ⚠️ Common Issues & Solutions

### **Issue 1: 401 Unauthorized**

**Problem:** You're getting 401 error when accessing `/api` endpoints.

**Solutions:**
- ✅ Make sure you added the `Authorization` header
- ✅ Check that the token starts with `Bearer ` (with a space)
- ✅ Verify the token hasn't expired (tokens expire after 5 hours)
- ✅ Login again to get a new token

---

### **Issue 2: 403 Forbidden**

**Problem:** You're getting 403 error.

**Solution:**
- This usually means the JWT token is invalid or expired
- Try logging in again to get a fresh token

---

### **Issue 3: Token Expired**

**Problem:** Token works for a while, then stops working.

**Solution:**
- JWT tokens expire after **5 hours**
- Just login again to get a new token:
  ```bash
  POST /auth/login
  ```

---

### **Issue 4: Username Already Exists**

**Problem:** Getting error when registering.

**Solution:**
- The username is already taken
- Try a different username
- Or login with existing credentials instead of registering

---

## 🔒 Security Notes

1. **Never share your JWT token** - Anyone with your token can access your account
2. **Store tokens securely** - Don't put them in code or commit them to Git
3. **Use HTTPS in production** - Always use encrypted connections
4. **Tokens expire after 5 hours** - This is configured in `JwtUtil.java`

---

## 📝 Summary

**Quick Start:**
1. Register: `POST /auth/register` → Get JWT token
2. Use token: Add `Authorization: Bearer TOKEN` header to API requests
3. If token expires: Login again at `POST /auth/login`

**That's it!** Your API is now properly secured with JWT authentication. 🎉

