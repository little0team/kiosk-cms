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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Route path="/app/:path?" exact>
          <DashBoardLayout>
            <Switch>
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
            </Switch>
          </DashBoardLayout>
        </Route>

        <Redirect to="/app/products" />
      </Switch>
    </Router>
  );
}

export default App;
