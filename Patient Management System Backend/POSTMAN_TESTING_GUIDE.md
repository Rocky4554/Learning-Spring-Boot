# 📮 Postman Testing Guide

## ✅ **Login Test in Postman**

### **Step-by-Step Instructions:**

#### **1. Create New Request**
- Open Postman
- Click **"New"** → **"HTTP Request"**
- Name it: `Login`

#### **2. Configure Request**

**Method:** Select `POST` from dropdown

**URL:** 
```
http://localhost:8080/auth/login
```

#### **3. Set Headers**

Go to **"Headers"** tab and add:

| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

#### **4. Set Request Body**

1. Go to **"Body"** tab
2. Select **"raw"** radio button
3. Select **"JSON"** from the dropdown (on the right)
4. Paste this JSON:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

**⚠️ Replace with your actual username and password from registration!**

#### **5. Send Request**

Click the **"Send"** button.

---

## 📋 **Expected Response**

### **Success Response (200 OK):**

```json
{
  "userId": 1,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTYzODIxNTYwMCwiZXhwIjoxNjM4MjMyNDAwfQ.signature_here",
  "username": "testuser"
}
```

**✅ Copy the `jwt` token!** You'll need it for protected API requests.

---

## 🔐 **Testing Protected Endpoints**

After getting the JWT token from login, test a protected endpoint:

### **Get All Patients**

**Request Setup:**
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/patients`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 
  - *(Replace with your actual JWT token)*

**Important:** 
- Type `Bearer` followed by a space, then paste your token
- The token is the value from the `jwt` field in the login response

---

## 📸 **Visual Guide**

### **Login Request:**
```
Method: POST
URL: http://localhost:8080/auth/login
Headers:
  Content-Type: application/json
Body (raw, JSON):
  {
    "username": "your_username",
    "password": "your_password"
  }
```

### **Protected API Request:**
```
Method: GET
URL: http://localhost:8080/api/patients
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## ⚠️ **Common Issues**

### **Issue 1: 401 Unauthorized**
- ❌ Wrong username or password
- ✅ Check your credentials match what you registered with

### **Issue 2: 403 Forbidden**
- ❌ Missing or incorrect token format
- ✅ Make sure Authorization header is: `Bearer TOKEN` (with space)

### **Issue 3: 404 Not Found**
- ❌ Wrong URL
- ✅ Check server is running on port 8080
- ✅ Verify endpoint path: `/auth/login`

### **Issue 4: Connection Refused**
- ❌ Server not running
- ✅ Start your Spring Boot application first

---

## 🎯 **Quick Checklist**

Before sending login request:
- ✅ Server is running (`http://localhost:8080`)
- ✅ Method is `POST`
- ✅ URL is correct: `http://localhost:8080/auth/login`
- ✅ Header `Content-Type: application/json` is set
- ✅ Body is JSON format (raw)
- ✅ Username and password are correct

After login:
- ✅ Copy the `jwt` token from response
- ✅ Use it in `Authorization: Bearer TOKEN` header
- ✅ Test protected endpoints like `/api/patients`

---

## 📝 **Example Collection**

You can create a Postman Collection with:

1. **Register** - `POST /auth/register`
2. **Login** - `POST /auth/login`
3. **Get Patients** - `GET /api/patients` (requires token)

This makes testing easier!

