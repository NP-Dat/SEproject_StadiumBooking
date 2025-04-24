const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('../config/serviceReg');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Auth Service Routes
const authProxy = createProxyMiddleware({
  target: services.auth.url,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '/api/auth'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Forward the original headers
    if (req.token) {
      proxyReq.setHeader('Authorization', req.token);
    }
  }
});

// Public routes
router.post('/auth/login', authProxy);
router.post('/auth/register', authProxy);

// Protected routes
router.get('/auth/profile', verifyToken, authProxy);

// Event Owner Service Routes
const ownerProxy = createProxyMiddleware({
  target: services.owner.url,
  changeOrigin: true,
  pathRewrite: {
    '^/owner': '/api/owner'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Forward the original headers
    if (req.token) {
      proxyReq.setHeader('Authorization', req.token);
    }
  }
});

// Public routes
router.post('/owner/login', authProxy);
router.post('/owner/register', authProxy);

// Protected routes
router.get('/owner/profile', verifyToken, authProxy);

// User Service Routes
const userProxy = createProxyMiddleware({
  target: services.users.url,
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/api/users'
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.token) {
      proxyReq.setHeader('Authorization', req.token);
    }
  }
});

// Protected user routes
router.get('/users/profile', verifyToken, userProxy);
router.put('/users/profile', verifyToken, userProxy);
router.delete('/users/profile', verifyToken, userProxy);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Gateway is running' });
});

module.exports = router;