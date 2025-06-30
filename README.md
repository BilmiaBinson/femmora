# Femmora - AI-Powered Women Empowerment Portal

**Femmora** is a web application designed to empower underprivileged women and female students by providing AI-driven guidance, resources, and support. It acts as a real-time portal to help users navigate educational paths, understand their rights, learn digital skills, and improve their overall well-being.

## ✨ Features

- **🧠 Smart Pathway**: Generates personalized, step-by-step educational and career roadmaps using the Gemini AI, complete with resources, do's, don'ts, and a follow-up chat mentor.
- **👩‍🦰 Women Awareness**: Provides age-specific awareness points on topics like health, safety, and personal development, along with an empathetic AI "Caring Partner" to talk to.
- **📱 Learn to Use Apps**: Helps users achieve their goals (e.g., "learn cooking," "find a job") by recommending relevant apps and websites, explaining how to use them, and providing a chat assistant for help.
- **⚖️ Women Law Awareness**: A static, multilingual guide to important Indian laws concerning women's rights, such as the POCSO Act and the Domestic Violence Act.
- **🧩 Brain Quizzes**: An interactive quiz game with questions on various topics to make learning fun and engaging.
- **🆘 Emergency Contacts**: A quick-access list of important national helpline numbers.
- **🌐 Multilingual Support**: The interface is fully translated into English, Hindi, and Tamil.
- **🛠️ Help & Support**: A detailed section with a "How to Use" guide and an FAQ to help users navigate the app.
- **🔐 Authentication**: A simple, simulated login and registration system to demonstrate a personalized user experience.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Font Awesome
- **AI Integration**: Google Gemini API (`@google/genai`)

### 🏗️ No-Build-Step Architecture

This project is intentionally set up to run **without a traditional build step** (like Webpack, Vite, or Create React App). Here’s how it works:

- **`index.html`**: The main entry point.
- **Import Maps**: A `<script type="importmap">` block in `index.html` tells the browser how to resolve bare module specifiers (e.g., `import React from 'react'`). It maps these names to full URLs from a CDN (`esm.sh`).
- **ES Modules in Browser**: The browser natively understands and loads the ES modules, including `.tsx` files, directly. This simplifies the development setup, making it very easy to get started.

## 📋 Prerequisites

Before you begin, ensure you have the following:

1.  **A Modern Web Browser**: Chrome, Firefox, Edge, or Safari.
2.  **A Google Gemini API Key**:
    - You must have a valid API key from [Google AI Studio](https://aistudio.google.com/).
    - The application is configured to access this key via an environment variable `process.env.API_KEY`. **Your local development environment must be set up to provide this variable for the AI features to work.** The hosting environment where this app is deployed will handle this securely.
3.  **A Simple Local Web Server**: Since the app uses ES modules, you cannot open `index.html` directly from the file system (`file://...`). You need to serve it over HTTP.
    - **Recommended**: The **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** extension for Visual Studio Code.
    - **Alternative**: If you have Python installed, you can use its built-in server.

## ⚙️ Getting Started

Follow these steps to get a local copy up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/femmora-project.git
cd femmora-project
```

### 2. Run the Application

#### Option A: Using VS Code Live Server (Recommended)

1.  Open the project folder in Visual Studio Code.
2.  If you don't have it, install the **Live Server** extension.
3.  Right-click on the `index.html` file in the VS Code explorer and select **"Open with Live Server"**.
4.  Your browser will automatically open to the correct address (e.g., `http://127.0.0.1:5500`).

#### Option B: Using Python's HTTP Server

1.  Open your terminal or command prompt in the project's root directory.
2.  Run the following command:

    ```bash
    # For Python 3
    python -m http.server

    # For Python 2 (if you have it)
    python -m SimpleHTTPServer
    ```

3.  The server will start, usually on port 8000. Open your web browser and navigate to: `http://localhost:8000`

### 3. Use the Application

- **Registration**: You can create a new simulated user.
- **Login**: For a quick start, use the demo credentials:
  - **Email**: `user@example.com`
  - **Password**: `password`

## 📂 Project Structure

The project is organized into several key directories:

```
/
├── components/         # Reusable React components (Button, Card, Layouts, etc.)
│   ├── common/         # Generic, widely used components
│   ├── layout/         # Structural components (Header, Sidebar, MainLayout)
│   └── ...             # Feature-specific components
├── contexts/           # React Context providers (Auth, Language)
├── data/               # Static data for the app (e.g., laws, mock questions)
├── screens/            # Top-level components for each page/route
│   ├── auth/           # Login and Registration screens
│   ├── dashboard/      # Home screen
│   └── ...             # All other feature screens
├── types.ts            # All TypeScript type definitions and interfaces
├── constants.ts        # App-wide constants (routes, translations, etc.)
├── App.tsx             # Root component with routing setup
├── index.tsx           # Main application entry point
└── index.html          # The single HTML page with the import map
└── README.md           # You are here!
```
