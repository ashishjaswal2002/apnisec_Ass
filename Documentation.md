

## 🛠️ Environment Variables (.env**)

Create a `.env` file in the root directory and add the following:

```env
# Database Connection (Supabase Connection Pooler recommended)
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"

# Authentication
JWT_SECRET="your-super-strong-secret-key-at-least-32-chars"

# Email Service (Resend)
RESEND_API_KEY="re_123456789"
```

.env file


DATABASE_URL="postgresql://postgres:xUqgyz-rukqyk-7vepwe@db.oiiuolsloyzhjtwlojyd.supabase.co:5432/postgres"
RESEND_API_KEY="re_MmKpa9G8_9oAyJNyrVZWKynHM5qMjsgsa"

---

## 🚀 Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/apnisec-app.git
    cd apnisec-app
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Database**
    *   Ensure your `.env` has a valid `DATABASE_URL`.
    *   Push schema to database:
    ```bash
    npx prisma db push
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📡 API Endpoints

### **Authentication**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user 
| `POST` | `/api/auth/login` | Login user (Set Cookie)
| `POST` | `/api/auth/logout` | Logout user (Clear Cookie) 
| `GET` | `/api/auth/me` | Get current logged-in user

### **Users**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Get user profile details
| `PUT` | `/api/users/profile` | Update user profile name 

### **Issues**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/issues` | List all issues (supports `?type=FILTER`) 
| `POST` | `/api/issues` | Create a new issue 
| `GET` | `/api/issues/[id]` | Get single issue details
| `PUT` | `/api/issues/[id]` | Update issue status/details 
| `DELETE` | `/api/issues/[id]` | Delete an issue

---

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router (Pages & API Routes)
├── components/           # React Components (Navbar, Footer, etc.)
├── lib/
│   ├── core/             # Base classes (Container, ApiResponse, AppError)
│   ├── database/         # Singleton Database Connection
│   ├── handlers/         # Request Handlers (Controllers)
│   ├── repositories/     # Database Access Layer
│   ├── services/         # Business Logic Layer
│   ├── templates/        # HTML Email Templates
│   ├── utils/            # Utilities (Validator)
│   └── validation/       # Validation Schemas (Auth, Issue)
└── middleware.ts         # Global Auth & Rate Limiting Middleware
```

## 🧪 Testing

We have included handy scripts to test backend functionality directly:

1.  **Test Email System**
    ```bash
    npx tsx scripts/test-email.ts your-email@example.com
    ```

2.  **Test Auth Flow (API)**
    ```bash
    npx tsx scripts/test-auth-flow.ts
    ```

3.  **Check Database Connection**
    ```bash
    npx tsx scripts/test-db.ts
    ```
