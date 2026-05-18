import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { ShoppingBag, Category, ShoppingCart, People } from '@mui/icons-material';
import api from '../services/api';

const StatCard = ({ title, count, icon, color }) => (
  <Paper elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 2, border: '1px solid #e0e0e0' }}>
    <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: `${color}15`, color: color, mr: 2 }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {count}
      </Typography>
    </Box>
  </Paper>
);

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Since we don't have a single "stats" endpoint, we fetch multiple
        const [prod, cat, ord] = await Promise.allSettled([
          api.get('/products'),
          api.get('/categories'),
          api.get('/orders')
        ]);

        const products = prod.status === 'fulfilled' ? prod.value.data.length : 0;
        const categories = cat.status === 'fulfilled' ? cat.value.data.length : 0;
        const orders = ord.status === 'fulfilled' ? ord.value.data.length : 0;

        setStats({ products, categories, orders });
      } catch (err) {
        console.error(err);
        setStats({ products: 0, categories: 0, orders: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Box>
     
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Dashboard Overview</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Products" count={stats.products} icon={<ShoppingBag />} color="#2196f3" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Categories" count={stats.categories} icon={<Category />} color="#4caf50" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Orders" count={stats.orders} icon={<ShoppingCart />} color="#ff9800" />
        </Grid>
      </Grid>
    </Box>
  );
}
