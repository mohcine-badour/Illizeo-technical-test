# Frontend - Notes Management Application

A modern, responsive notes management application built with React, TypeScript, and Vite. This application provides a seamless user experience for creating, managing, and organizing notes with authentication and user profile management.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Notes Management**: Create, read, update, and delete notes
- **Protected Routes**: Secure access to authenticated pages
- **User Profile**: Manage user profile information
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Smooth Animations**: Page transitions powered by Framer Motion
- **Form Validation**: Robust form handling with Formik and Yup
- **State Management**: Efficient data fetching with React Query
- **Loading States**: Skeleton loaders for better UX

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **Formik** - Form management
- **Yup** - Schema validation
- **React Hot Toast** - Toast notifications
- **Headless UI** - Accessible UI components
- **Heroicons** - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** (package manager)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

Using npm:
```bash
npm install
```

Using pnpm:
```bash
pnpm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:8000/api
```

Replace `http://localhost:8000/api` with your backend API URL if different.

## 🚀 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

or

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

Create a production build:

```bash
npm run build
```

or

```bash
pnpm build
```

The optimized build will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

or

```bash
pnpm preview
```

## 📁 Project Structure

```
src/
├── api/              # API service functions
│   ├── auth.ts      # Authentication API calls
│   ├── axios.ts     # Axios instance configuration
│   └── notes.ts     # Notes API calls
├── assets/          # Static assets (images, icons)
├── components/      # Reusable React components
│   ├── Avatar/      # Avatar component
│   ├── Home/        # Home page components
│   ├── Notes/       # Notes-related components
│   ├── Popups/      # Modal/popup components
│   └── skeleton/    # Loading skeleton components
├── context/         # React Context providers
│   └── AuthContext.tsx
├── hooks/           # Custom React hooks
│   ├── useAuth.ts
│   └── useNotes.ts
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   ├── dashboard/   # Dashboard page
│   ├── notes/       # Notes pages
│   └── profile/     # Profile page
├── routing/         # Route configuration
│   └── ProtectedRoute.tsx
├── types/           # TypeScript type definitions
│   └── global.ts
├── utils/           # Utility functions
│   ├── formDate.ts
│   ├── formHelpers.ts
│   ├── notifications.ts
│   └── search.ts
├── App.tsx          # Main App component
├── App.css          # App styles
├── index.css        # Global styles
└── main.tsx         # Application entry point
```

## 🔐 Authentication

The application uses JWT-based authentication:

- Tokens are stored in `localStorage`
- Protected routes require authentication
- Axios interceptors automatically attach tokens to requests
- User session is managed through `AuthContext`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses **Tailwind CSS** for styling. The configuration is handled through the Vite plugin (`@tailwindcss/vite`).

## 🔄 State Management

- **React Query**: Manages server state (API data, caching, refetching)
- **React Context**: Manages authentication state
- **Local State**: Component-level state with React hooks

## 🧪 Code Quality

The project includes ESLint for code quality and consistency. Run the linter with:

```bash
npm run lint
```

## 🌐 Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Dependencies

### Production Dependencies
- `react` & `react-dom` - React library
- `react-router-dom` - Routing
- `@tanstack/react-query` - Data fetching
- `axios` - HTTP client
- `formik` & `yup` - Form handling and validation
- `framer-motion` - Animations
- `react-hot-toast` - Notifications
- `tailwindcss` - CSS framework
- `@headlessui/react` - UI components
- `@heroicons/react` - Icons

### Development Dependencies
- `vite` - Build tool
- `typescript` - TypeScript compiler
- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Linting
- `typescript-eslint` - TypeScript ESLint rules

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code passes linting
4. Submit a pull request

## 📄 License

This project is part of the Illizeo technical test.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### API Connection Issues
Ensure the backend server is running and the `VITE_API_URL` environment variable is correctly set.

### Build Errors
Clear the `node_modules` folder and reinstall dependencies:
```bash
rm -rf node_modules
npm install
```