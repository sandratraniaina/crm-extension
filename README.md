# CRM Extension

## Overview

This is a dynamic web application built with Express.js and EJS, designed as an extension to the [CRM App](https://github.com/sandratraniaina/crm) (a Java-based application). The CRM Extension provides an intuitive web interface that interacts with the existing CRM app’s API endpoints, offering enhanced user experiences for managing customer data, expenses, budgets, and more. Unlike a standalone web service, this app renders dynamic pages using EJS templates and integrates seamlessly with the CRM app’s backend.

## Features

- **Dashboard Overview:** Displays key CRM data (e.g., lead expenses, ticket expenses, client budgets) with total boxes and random-colored charts for visualization.
- **Customer Data Import:** Allows CSV file uploads for importing data into the CRM app via a dedicated page and sidebar link.
- **Expense Threshold Management:** Provides a page to view and manage expense thresholds, with mock data support and error handling.
- **Lead and Ticket Management:** Offers pages to list, update, and delete leads and tickets, with forms for expense updates.
- **Client Budget Tracking:** Includes a page to view and update client budgets, with delete functionality.
- **Authentication:** Implements login functionality with session-based authentication, securing access to the app.
- **UI Enhancements:** Features a consistent sidebar and header across all pages, displaying the logged-in username.
- **Error Handling:** Shows high-level error messages for data validation and fixes for expense thresholds and data structures.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/) (v8.x or higher)
- A running instance of the CRM app with API endpoints accessible at `http://localhost:8080` (or your configured host)
- Git for cloning the repository

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sandratraniaina/crm-extension.git
   cd crm-extension
   ```

2. **Install Dependencies**Install the required Node.js packages, including Express, EJS, Multer, and Nodemon:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**Create a `.env` file in the root directory with the following:

   ```env
   API_HOST=http://localhost:8080
   SESSION_SECRET_KEY=this-is-a-secret-key
   ```

   - `API_HOST`: The URL of the CRM app’s API (adjust if different).
   - `SESSION_SECRET_KEY`: A secure key for session management (replace with a unique, secret value).
4. **Run the Application**
   Start the app with Nodemon for automatic reloading during development:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000` (default port).

## Usage

- **Access the Web App:** Open your browser and navigate to `http://localhost:3000`.
- **Login:** Use the login page to authenticate (mock logic implemented; integrate with CRM app’s auth if needed).
- **Navigate Features:** Use the sidebar to access the dashboard, CSV import, expense thresholds, leads, tickets, and client budgets.
  - Example: Upload a CSV file via the "CSV Import" link to process data into the CRM app.
  - Example: View the dashboard for a summary of expenses and budgets with colorful charts.
- **Interact with CRM API:** The app fetches and updates data via the CRM app’s API at `API_HOST`. Ensure the CRM app is running.

## Project Structure

```txt
├── controllers/      # Logic for dashboard, auth, CSV, expenses, etc.
├── middleware/       # Custom middleware (e.g., authMiddleware)
├── node_modules/     # Installed npm dependencies
├── public/           # Static assets (e.g., CSS, JS for random color generation)
├── routes/           # Route definitions for all features
├── services/         # API call handling (e.g., financialSummaryService, ticketService)
├── utils/            # Utility functions (e.g., generateRandomColor)
├── views/            # EJS templates for pages (e.g., login.ejs, dashboard.ejs)
├── .env              # Environment variables (not tracked)
├── .gitignore        # Files/folders to ignore in Git
├── commit.txt        # Commit history (optional, may remove)
├── package-lock.json # Dependency lock file
├── package.json      # Dependencies and scripts
└── server.js         # Main application entry point
```

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your message"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE) *(or replace with your preferred license)*.

## Contact

For questions or feedback, reach out to [`Sandratra NIAINA`](mailto:sandratrarafa@gmail.com) or open an issue on this repository.

---
