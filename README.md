# BabySteps Milestone Tracker

A beautiful, responsive web application for tracking pregnancy milestones and sharing community tips. Built as a feature module for the BabySteps platform.

![BabySteps Milestone Tracker](https://images.pexels.com/photos/1556663/pexels-photo-1556663.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&crop=entropy&fit=crop)

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone or download the project**

   ```bash
   # If using git
   git clone <repository-url>
   cd babysteps-milestone-tracker

   # Or extract the downloaded files and navigate to the folder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

That's it! The application will automatically start both the frontend and backend servers concurrently.

## 🛠 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## 🏗 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API endpoints
- **CORS** - Cross-origin resource sharing middleware

### Development Tools

- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing with Autoprefixer

## 📁 Project Structure

```
babysteps-platform/
├──client 
|   |
|   src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── Header.tsx           # App header with branding
│   │   ├── MilestoneForm.tsx    # Form to add new milestones
│   │   ├── MilestoneTimeline.tsx # Timeline view of milestones
│   │   ├── TipsModal.tsx        # Modal for community tips
│   │   ├── WeekSelector.tsx     # Pregnancy week selector
│   │   └── PersonalizedRecommendations.tsx # Week-based recommendations
│   ├── services/                # API service layer
│   │   └── api.ts              # API client functions
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts            # Shared interfaces
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── server/                     # Backend source code
│   └── index.js               # Express server with API routes
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## 🎨 Design Decisions

### User Experience

- **Gradient Design Language**: Purple-to-pink gradients create a warm, nurturing feel appropriate for pregnancy tracking
- **Timeline Visualization**: Milestones are displayed in a chronological timeline with visual indicators
- **Modal Interactions**: Tips are shown in modals to maintain context while providing detailed information
- **Responsive Design**: Mobile-first approach ensures usability across all devices

### Technical Architecture

- **Component Separation**: Each UI element is a separate, reusable component
- **Type Safety**: Full TypeScript implementation prevents runtime errors
- **API Abstraction**: Centralized API service layer for easy maintenance
- **State Management**: React hooks for local state, no external state library needed for this scope

### Data Storage

- **In-Memory Storage**: For development simplicity, data is stored in server memory
- **RESTful API**: Clean API design with proper HTTP methods and status codes
- **Structured Data**: Well-defined interfaces for milestones, tips, and recommendations

## 🔧 API Endpoints

### Milestones

- `GET /api/milestones` - Retrieve all milestones
- `POST /api/milestones` - Add a new milestone

### Community Tips

- `GET /api/tips/:category` - Get tips for a specific milestone category
- `POST /api/tips` - Add a new community tip

### Recommendations

- `GET /api/milestones/recommendations/:week` - Get personalized recommendations for a pregnancy week

### Health Check

- `GET /api/health` - Server health status

## 🎯 Features

### Core Functionality

- ✅ Add and track pregnancy milestones
- ✅ Categorize milestones (Health, Medical, Emotional, Planning, Baby Milestones)
- ✅ Timeline visualization with dates and notes
- ✅ Community tips system with user contributions
- ✅ Personalized recommendations based on pregnancy week
- ✅ Responsive design for all screen sizes

### User Experience

- ✅ Intuitive form validation
- ✅ Loading states and error handling
- ✅ Accessible design with proper ARIA labels
- ✅ Smooth animations and transitions
- ✅ Local storage for pregnancy week persistence

## 🔒 Security Considerations

- **Input Validation**: All form inputs are validated on both client and server
- **CORS Configuration**: Properly configured for development environment
- **XSS Prevention**: React's built-in XSS protection through JSX
- **Type Safety**: TypeScript prevents many common vulnerabilities

## 🚀 Production Deployment

For production deployment:

1. **Build the frontend**:

   ```bash
   npm run build
   ```

2. **Serve static files**: Configure your server to serve the `dist` folder

3. **Environment Variables**: Set up proper environment variables for production API URLs

4. **Database**: Replace in-memory storage with a proper database (MongoDB, PostgreSQL, etc.)

5. **Authentication**: Implement user authentication and authorization

## 🤝 Contributing

1. Follow the existing code style and TypeScript patterns
2. Ensure all components are properly typed
3. Test responsive design on multiple screen sizes
4. Run `npm run lint` before committing

## 📝 License

This project is part of the BabySteps platform development assignment.

---

**Built with ❤️ for expecting parents and families**
