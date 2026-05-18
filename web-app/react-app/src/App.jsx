import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import CategoryList from './pages/CategoryList';
import OrderList from './pages/OrderList';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
