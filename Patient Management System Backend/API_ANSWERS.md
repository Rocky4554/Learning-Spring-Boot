# ✅ API Authentication - Direct Answers

## **1. What is the base URL for your API?**

```
http://localhost:8080
```

*Note: Port 8080 is the default Spring Boot port (server.port is commented out in application.properties)*

---

## **2. What are the exact endpoint paths for login and signup?**

### **Signup (Register):**
```
POST /auth/register
```
Full URL: `http://localhost:8080/auth/register`

### **Login:**
```
POST /auth/login
```
Full URL: `http://localhost:8080/auth/login`

---

## **3. What fields does your backend expect in the request body?**

Both endpoints expect the **same fields**:

```json
{
  "username": "string",
  "password": "string"
}
```

**Details:**
- ✅ `username` (String) - **Required**
- ✅ `password` (String) - **Required**
- ❌ No email field
- ❌ No other fields needed

**Example Request Body:**
```json
{
  "username": "john_doe",
  "password": "mypassword123"
}
```

---

## **4. How does your backend return the authentication token?**

The JWT token is returned **in the response body** as JSON, specifically in the `jwt` field.

**NOT in headers** - it's in the response body JSON object.

**Response Format:**
```json
{
  "userId": 1,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe"
}
```

**Token Location:** The `jwt` field contains the authentication token.

**How to Extract:**
- Parse the JSON response
- Get the value of the `jwt` field
- Use that token in subsequent requests

---

## **5. What user information is returned after successful authentication?**

After successful authentication (both signup and login), the backend returns:

```json
{
  "userId": 1,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe"
}
```

### **Field Details:**

| Field | Type | Description |
|-------|------|-------------|
| `userId` | Integer | Unique user ID from database |
| `jwt` | String | JWT authentication token (use this for API calls) |
| `username` | String | The username that was used |

### **Example Response:**
```json
{
  "userId": 5,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huIiwiZXhwIjoxNjM4MjE5MjAwLCJpYXQiOjE2MzgyMTU2MDB9.signature_here",
  "username": "john_doe"
}
```

---

## 📋 **Quick Summary Table**

| Question | Answer |
|----------|--------|
| **Base URL** | `http://localhost:8080` |
| **Signup Path** | `POST /auth/register` |
| **Login Path** | `POST /auth/login` |
| **Request Fields** | `username` (string), `password` (string) |
| **Token Location** | Response body, `jwt` field |
| **Returned Info** | `userId`, `jwt`, `username` |

---

## 🚀 **Complete Example**

### **Request (Signup/Login):**
```bash
POST http://localhost:8080/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### **Response:**
```json
{
  "userId": 1,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTYzODIxNTYwMCwiZXhwIjoxNjM4MjMyNDAwfQ.signature",
  "username": "testuser"
}
```

### **Using the Token:**
```bash
GET http://localhost:8080/api/patients
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚠️ **Important Notes**

1. **Token Format:** The JWT token is a long string starting with `eyJ...`
2. **Token Usage:** Include it in the `Authorization` header as `Bearer {token}`
3. **Token Expiry:** Tokens expire after 5 hours - login again to get a new one
4. **Same Response:** Both signup and login return the same format
5. **Password Security:** Passwords are automatically hashed by the backend (BCrypt)

