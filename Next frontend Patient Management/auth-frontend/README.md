This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Spring Boot Backend Integration Guide

Your Next.js frontend is already configured to connect to your Spring Boot backend at `http://localhost:8080`. However, for the integration to work, you must configure **CORS (Cross-Origin Resource Sharing)** in your Spring Boot application to allow requests from the frontend calling from `http://localhost:3000`.

## 1. CORS Configuration (Required)

In your Spring Boot project, you need to allow the frontend URL. Add or update your `WebMvcConfigurer` or `SecurityConfig`.

### Option A: Global CORS Configuration (Recommended)
Add this configuration class to your backend:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Option B: Security Config (If using Spring Security)
If you have a `SecurityFilterChain`, ensure CORS is enabled there too:

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults()) // Enable CORS
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/**").permitAll() // Allow auth endpoints
            .anyRequest().authenticated()
        );
    return http.build();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

## 2. API Endpoint Verification

Ensure your backend has the following controllers and endpoints matching the frontend:

- **Login**: `POST /auth/login`
- **Register**: `POST /auth/register`

**Expected Request Body:**
```json
{
    "username": "...",
    "password": "..."
}
```

**Expected Response (Success):**
```json
{
    "userId": 1,
    "jwt": "eyJhbGciOi...",
    "username": "..."
}
```

## 3. Testing the Integration

1.  **Start Backend**: Run your Spring Boot app (ensure it's on port 8080).
2.  **Start Frontend**: `npm run dev` (on port 3000).
3.  **Check Console**: Open Chrome DevTools (F12) -> Console.
4.  **Attempt Login**: Try to log in.
    - If you see `Access to fetch at ... from origin ... has been blocked by CORS policy`, then Step 1 was not done correctly.
    - If you see `POST http://localhost:8080/auth/login 403 (Forbidden)` or `401`, check your Spring Security rules.
    - If you see `404 (Not Found)`, check your Controller paths (`/auth/login`).

## 4. Troubleshooting

-   **Backend Port**: If your backend is NOT on 8080, update `auth-frontend/.env.local`:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:YOUR_PORT
    ```
-   **Email Field**: The current frontend sends `username` and `password`. If your backend requires `email`, let me know and I will update the frontend forms.
