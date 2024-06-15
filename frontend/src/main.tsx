import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider/index.tsx';
import HomePage from './pages/HomePage/index.tsx';
import SigninPage from './pages/SigninPage/index.tsx';
import SignupPage from './pages/SignupPage/index.tsx';
import NotFoundPage from './pages/NotFoundPage/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'signin',
            element: <SigninPage />,
          },
          {
            path: 'signup',
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
