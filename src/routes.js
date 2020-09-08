import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProductsPage from 'pages/product/ProductsPage';
import CategoriesPage from 'pages/category/CatagoriesPage';
import TransactionsPage from 'pages/TransactionsPage';
import MainLayout from 'layouts/MainLayout';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import CategoryPage from 'pages/category/CategoryPage';
import ProductPage from 'pages/product/ProductPage';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'category', element: <CategoryPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'product', element: <ProductPage /> },
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
    ],
  },
];

export default routes;
