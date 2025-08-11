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

Create a `.env` file in the root directory with the following variables:

```env
# External API Keys
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_NUTRITIONIX_APP_ID=your_nutritionix_app_id_here
VITE_NUTRITIONIX_APP_KEY=your_nutritionix_app_key_here
```

#### Required API Keys

To use all features of the application, you'll need to obtain the following API keys:

1. **TMDB API Key** - For movie data and recommendations
   - Visit [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Replace `your_tmdb_api_key_here` with your actual API key

2. **Nutritionix API Credentials** - For nutrition and health data
   - Visit [Nutritionix API](https://www.nutritionix.com/business/api)
   - Sign up for an account to get your App ID and App Key
   - Replace `your_nutritionix_app_id_here` and `your_nutritionix_app_key_here` with your actual credentials

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
