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
import DashboardPage from 'pages/dashboard/DashboardPage';
import BranchsPage from 'pages/branch/BranchsPage';
import BranchPage from 'pages/branch/BranchPage';
import StaffsPage from 'pages/staff/StaffsPage';
import StaffPage from 'pages/staff/StaffPage';
import ConfigsPage from 'pages/config/ConfigsPage';
import OrdersPage from 'pages/order/OrdersPage';
import BannersPage from 'pages/banner/BannersPage';
import BannerPage from 'pages/banner/BannerPage';
import TransactionPage from 'pages/transaction/TransactionPage';
import ConfigPage from 'pages/config/ConfigPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Route path="/app/:path?/:other?" exact>
          <DashBoardLayout>
            <Switch>
              <ProtectedRoute path="/app/dashboard" component={DashboardPage} />
              <ProtectedRoute path="/app/branches" component={BranchsPage} />
              <ProtectedRoute path="/app/staffs" component={StaffsPage} />
              <ProtectedRoute
                path="/app/staff/:staffId"
                component={StaffPage}
              />
              <ProtectedRoute
                path="/app/branch/:branchId"
                component={BranchPage}
              />
              <ProtectedRoute path="/app/banners" component={BannersPage} />
              <ProtectedRoute path="/app/banner" component={BannerPage} />
              <ProtectedRoute path="/app/products" component={ProductsPage} />
              <ProtectedRoute
                path="/app/product/:productId"
                component={ProductPage}
              />
              <ProtectedRoute
                path="/app/categories"
                component={CategoriesPage}
              />
              <ProtectedRoute
                path="/app/category/:categoryId"
                component={CategoryPage}
              />
              <ProtectedRoute path="/app/orders" component={OrdersPage} />
              <ProtectedRoute
                path="/app/transactions"
                component={TransactionPage}
              />
              <ProtectedRoute path="/app/configs" component={ConfigsPage} />
              <ProtectedRoute path="/app/config" component={ConfigPage} />
            </Switch>
          </DashBoardLayout>
        </Route>

        <Redirect to="/app/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
