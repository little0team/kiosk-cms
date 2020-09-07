import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProductsPage from 'pages/ProductsPage';
import CategoriesPage from 'pages/CatagoriesPage';
import TransactionsPage from 'pages/TransactionsPage';
import MainLayout from 'layouts/MainLayout';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '/', element: <Navigate to="/app/products" /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '404', element: <NotFoundPage /> },
    ],
  },
];

export default routes;
