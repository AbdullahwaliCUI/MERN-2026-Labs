# 🛒 Mini Online Store API - Express.js Lab

Welcome to the **Mini Online Store API** lab! This project is designed to help you understand how to build professional, scalable backend applications using **Express.js** and the **MVC (Model-View-Controller)** pattern.

---

## 🍽️ The Restaurant Analogy
To understand how this code works, imagine a restaurant:

1.  **App.js (The Manager):** The boss who opens the restaurant, sets the rules, and tells everyone where to go.
2.  **Middleware (The Waiter & Bouncer):** 
    *   `logger.js` (The Waiter) writes down every order that comes in.
    *   `auth.js` (The Bouncer) checks your ID/Token at the door before letting you into the VIP section.
3.  **Routes (The Menu):** Tells the customer what items are available (e.g., `/products`, `/users`).
4.  **Controllers (The Chef):** The person in the kitchen who actually cooks the food (handles the logic) and puts it on a plate (sends the response).

---

## 📁 Project Structure
Following the **Scalable Application Architecture**:

```text
mini-online-store/
├── app.js               # Main entry point (Server Setup)
├── controllers/         # Business Logic (The Chefs)
│   ├── productController.js
│   └── userController.js
├── middleware/          # Security & Logging (Waiters/Bouncers)
│   ├── auth.js
│   └── logger.js
├── routes/              # Modular Routes (The Menus)
│   ├── products.js
│   └── users.js
├── package.json         # Project configuration & Dependencies
└── node_modules/        # Installed libraries (Express)
```

---

## 🚀 How to Setup & Run

### 1. Install Dependencies
Open your terminal in the `mini-online-store` folder and run:
```bash
npm install
```

### 2. Start the Server
Run the following command:
```bash
node app.js
```
You should see: `🚀 Server is running on http://localhost:3000`

---

## 🛠️ API Endpoints & Testing

### 1. Home Page
*   **URL:** `GET http://localhost:3000/`
*   **Purpose:** Check if the server is alive.

### 2. Products (Public Access)
*   **URL:** `GET http://localhost:3000/products`
*   **Concept:** Demonstrates how to return a list of items from a controller.

### 3. Users - Get Profile (Protected Access)
*   **Try this FIRST:** `GET http://localhost:3000/users/123`
    *   *Result:* `401 Unauthorized`. (The Bouncer stopped you!)
*   **Try this SECOND:** `GET http://localhost:3000/users/123?token=admin123`
    *   *Result:* Success! (The Bouncer saw your VIP token).
*   **Concept:** Demonstrates **Route Parameters** (`:id`) and **Middleware Protection**.

### 4. Users - Create User (Data Submission)
*   **Method:** `POST`
*   **URL:** `http://localhost:3000/users?token=admin123`
*   **Body (JSON):**
    ```json
    {
      "name": "Hamza",
      "email": "hamza@example.com"
    }
    ```
*   **Concept:** Demonstrates receiving data using `req.body`.

---

## 💡 Key Learning Points for Students

1.  **`express.Router()`:** We use this to keep `app.js` clean. Instead of 100 routes in one file, we group them into `routes/products.js` and `routes/users.js`.
2.  **Modular Middleware:** `logger` is applied globally (`app.use(logger)`), but `auth` is only applied to user routes (`router.use(auth)`). 
3.  **Error Handling:** The middleware at the very bottom of `app.js` catches any URLs that don't exist and sends a friendly `404 Not Found` message.

---

Happy Coding! 👨‍🎓👩‍🎓
