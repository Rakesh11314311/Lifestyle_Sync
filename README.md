# Lifestyle Sync - Personal Lifestyle Management Application

A comprehensive lifestyle management application built with React, TypeScript, and Node.js that helps users track and manage their finances, health, and entertainment activities.

## 🚀 Features

### 💰 Finance Management
- Track monthly income and expenses
- Visualize spending patterns with charts
- Historical data analysis

### 🏥 Health Tracking
- Monitor nutrition and health metrics
- Detailed list of intake of macro and micro nutrients

### 🎬 Entertainment
- Movie tracking and recommendations
- Entertainment activity management

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful charts and visualizations
- Intuitive navigation with sidebar

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Radix UI** - UI components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or cloud instance)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Lifestyle_Sync
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd 1_server
npm install
cd ..
```

### 4. Set Up MongoDB

Make sure MongoDB is running on your system:

**Local MongoDB:**
```bash
# Start MongoDB service
mongod
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory (optional for basic setup):

```env
VITE_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/Lifestyle
```

## 🏃‍♂️ Running the Application

### Start the Backend Server

```bash
cd 1_server
node index.js
```

The server will start on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal, from the root directory:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`
---

**Happy coding! 🎉**
