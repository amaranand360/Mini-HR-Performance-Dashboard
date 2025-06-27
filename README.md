# HR Dashboard Management System

A comprehensive HR Performance Dashboard built with Next.js, featuring employee management, analytics, and performance tracking capabilities.

## 🚀 Features

### 📊 Dashboard Overview
- **Employee Metrics**: Total employees, average ratings, high performers, and bookmarked employees
- **Real-time Statistics**: Dynamic metrics that update based on employee data
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👥 Employee Management
- **Employee Profiles**: Detailed employee information with contact details, department, and performance data
- **Employee Cards**: Clean, card-based layout with employee photos, ratings, and key information
- **Promotion System**: One-click employee promotion with automatic salary increases (10-15%)
- **Bookmark System**: Save and organize favorite employees for quick access

### 🔍 Search & Filtering
- **Advanced Search**: Search employees by name, department, or other criteria
- **Department Filtering**: Filter employees by specific departments
- **Rating Filtering**: Filter by performance ratings (1-5 stars)
- **Real-time Results**: Instant search results as you type

### 📈 Analytics Dashboard
- **Department Performance**: Bar charts showing average ratings by department
- **Rating Distribution**: Pie chart visualization of employee rating distribution
- **Salary Analysis**: Average salary breakdown by department
- **Performance Trends**: Line charts tracking performance over time
- **Interactive Charts**: Hover tooltips and responsive chart components

### 🔐 Authentication System
- **Secure Login**: User authentication with form validation
- **Protected Routes**: Authentication guards for secure access
- **User Profiles**: Personalized user experience

### 🎨 Modern UI/UX
- **Shadcn/UI Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide Icons**: Consistent iconography throughout the application
- **Smooth Animations**: Hover effects and transitions for better user experience

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Language**: JavaScript/JSX
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **State Management**: React Context API with useReducer

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hr-dashboard-management
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Getting Started

### First Time Setup
1. **Login**: Use the login page to authenticate (demo credentials work)
2. **Explore Dashboard**: View employee metrics and overview
3. **Browse Employees**: Navigate through employee cards and profiles
4. **Use Analytics**: Check the analytics page for detailed insights
5. **Bookmark Employees**: Save important employees for quick access

### Demo Data
The application includes mock employee data for demonstration purposes, featuring:
- 20+ sample employees across 5 departments
- Realistic salary ranges and performance ratings
- Complete employee profiles with contact information
- Department-wise performance analytics

## 📱 Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)
*Main dashboard with employee metrics and search functionality*

### Employee Profile
![Employee Profile](screenshots/employee-profile.png)
*Detailed employee profile with promotion and bookmark features*

### Analytics Dashboard
![Analytics](screenshots/analytics.png)
*Comprehensive analytics with charts and performance insights*

### Mobile Responsive
![Mobile View](screenshots/mobile.png)
*Fully responsive design optimized for mobile devices*

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

```

## 🎯 Key Features Implemented

### ✅ Core Functionality
- [x] Employee dashboard with metrics
- [x] Employee profile pages
- [x] Search and filtering system
- [x] Bookmark functionality
- [x] Employee promotion system
- [x] Analytics dashboard with charts
- [x] Authentication system
- [x] Responsive design

### ✅ Advanced Features
- [x] Interactive data visualizations
- [x] Real-time search and filtering
- [x] Persistent state management
- [x] Form validation and error handling
- [x] Loading states and error boundaries
- [x] Accessibility features
- [x] Mobile-first responsive design
