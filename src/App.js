import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';

//Layout
import DashBoardLayout from 'layouts/DashboardLayout';

//Page
import LoginPage from 'pages/LoginPage';
import ProductsPage from 'pages/product/ProductsPage';
import ProductPage from 'pages/product/ProductPage';
import CategoriesPage from 'pages/category/CatagoriesPage';
import CategoryPage from 'pages/category/CategoryPage';
import TransactionsPage from 'pages/TransactionsPage';
import DashboardPage from 'pages/dashboard/DashboardPage';
import BranchsPage from 'pages/branch/BranchsPage';
import StaffsPage from 'pages/staff/StaffsPage';
import ConfigsPage from 'pages/config/ConfigsPage';
import OrdersPage from 'pages/order/OrdersPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Route path="/app/:path?" exact>
          <DashBoardLayout>
            <Switch>
              <ProtectedRoute path="/app/dashboard" component={DashboardPage} />
              <ProtectedRoute path="/app/branchs" component={BranchsPage} />
              <ProtectedRoute path="/app/staffs" component={StaffsPage} />
              <ProtectedRoute path="/app/branchs" component={OrdersPage} />
              <ProtectedRoute path="/app/products" component={ProductsPage} />
              <ProtectedRoute path="/app/product" component={ProductPage} />
              <ProtectedRoute
                path="/app/categories"
                component={CategoriesPage}
              />
              <ProtectedRoute path="/app/category" component={CategoryPage} />
              <ProtectedRoute
                path="/app/transactions"
                component={TransactionsPage}
              />
              <ProtectedRoute path="/app/configs" component={ConfigsPage} />
            </Switch>
          </DashBoardLayout>
        </Route>

        <Redirect to="/app/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
