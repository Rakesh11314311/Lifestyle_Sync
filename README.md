# 2_Lifestyle - Personal Lifestyle Management Application

A comprehensive lifestyle management application built with React, TypeScript, and Node.js that helps users track and manage their finances, health, and entertainment activities.

## 🚀 Features

### 💰 Finance Management
- Track monthly income and expenses
- Categorize financial data
- Visualize spending patterns with charts
- Historical data analysis

### 🏥 Health Tracking
- Monitor nutrition and health metrics
- Track fitness activities
- Health data visualization

### 🎬 Entertainment
- Movie tracking and recommendations
- Entertainment activity management

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful charts and visualizations
- Intuitive navigation with sidebar
- Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Chart.js** - Data visualization
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
cd 2_Lifestyle
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

**Or use MongoDB Atlas (cloud):**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get your connection string
- Update the connection string in `1_server/index.js`

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

## 📁 Project Structure

```
2_Lifestyle/
├── 1_server/                 # Backend server
│   ├── index.js             # Express server
│   ├── models/              # MongoDB models
│   └── package.json
├── src/
│   ├── components/          # Feature components
│   │   ├── finance/        # Finance management
│   │   ├── health/         # Health tracking
│   │   ├── entertainment/   # Entertainment features
│   │   └── home/           # Main app components
│   ├── shared_components/   # Reusable components
│   ├── states/             # Redux state management
│   └── hooks/              # Custom React hooks
├── public/                  # Static assets
└── package.json            # Frontend dependencies
```

## 🎯 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `node index.js` - Start the server

## 🔧 Configuration

### API Endpoints

The backend provides the following endpoints:

- `POST /finance/new` - Create new finance record
- `POST /finance/get` - Get finance data by year/month
- `POST /finance/latest` - Get latest finance record

### Database Schema

The application uses MongoDB with the following collections:
- `finances` - Financial data storage

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by modifying:
- `src/global_components/global.css`
- Tailwind configuration in `tailwind.config.js`

### Components
Reusable components are located in `src/shared_components/` and can be customized for your needs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check if the connection string is correct
- Verify MongoDB is accessible on port 27017

**Port Already in Use:**
- Change the port in `1_server/index.js` (line 67)
- Or kill the process using the port

**CORS Issues:**
- The backend is configured to allow requests from `http://localhost:5173`
- Update the CORS configuration in `1_server/index.js` if needed

**Build Errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript configuration in `tsconfig.json`

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Happy coding! 🎉**
