# Padre Gino's Pizza Ordering App

A modern pizza ordering application built with React 19, TanStack Query, TanStack Router, and Vitest for testing.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/chety/react-intro.git
cd react-intro
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api && npm install && cd ..
```

### 3. Start the Application

**Terminal 1 - Backend API:**
```bash
cd api && npm run dev
```
The API will run on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

## 🧪 Testing

This project includes comprehensive testing with Vitest, including both unit tests and browser tests.

### Run All Tests
```bash
npm test
```

### Run Specific Test Types
```bash
# Node.js tests (unit tests)
npm run test:node

# Browser tests (Playwright)
npm run test:browser

# Tests with coverage report
npm run test:coverage

# Interactive test UI
npm run test:ui
```

### Test Structure
- **Unit Tests**: `*.test.{js,jsx}` - Fast unit tests using happy-dom
- **Browser Tests**: `*.browser.test.{js,jsx}` - Full browser tests using Playwright
- **Coverage**: Available in `coverage/` directory after running `npm run test:coverage`

## 🛠️ Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm test            # Run all tests
npm run test:node   # Run unit tests
npm run test:browser # Run browser tests
npm run test:coverage # Run tests with coverage
npm run test:ui     # Open test UI
```

### Project Structure
```
├── api/                 # Backend API (Fastify + SQLite)
│   ├── server.js       # API server
│   ├── pizza.sqlite    # Database
│   └── public/         # Static assets
├── src/                # Frontend source
│   ├── components/     # React components
│   ├── context/        # React context
│   ├── hooks/          # Custom hooks
│   ├── routes/         # TanStack Router routes
│   ├── api/            # API client functions
│   └── utils/          # Utility functions
├── coverage/           # Test coverage reports
└── vitest.*.config.js  # Test configurations
```

## 🏗️ Tech Stack

### Frontend
- **React 19** - Latest React with new features
- **TanStack Query** - Server state management
- **TanStack Router** - Type-safe routing
- **Vite** - Build tool and dev server

### Backend
- **Fastify** - Fast web framework
- **SQLite** - Lightweight database
- **Node.js** - Runtime environment

### Testing
- **Vitest** - Fast unit testing
- **Playwright** - Browser automation
- **Testing Library** - React testing utilities
- **Coverage** - Code coverage reporting

## 📝 Features

- 🍕 Pizza menu with images and details
- 🛒 Shopping cart functionality
- 📋 Order history and details
- 📞 Contact form with React 19 form actions
- 🧪 Comprehensive test coverage
- 🎨 Modern UI with responsive design
- ⚡ Fast development with Vite
- 🔄 Real-time state management with TanStack Query

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
- Ensure you're in the `api` directory
- Check if port 3000 is available
- Verify SQLite database exists

**Tests failing:**
- Run `npm run test:node` for unit tests
- Run `npm run test:browser` for browser tests
- Check Playwright installation: `npx playwright install`

**Build issues:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility