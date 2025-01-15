const routes = require('express').Router();
const lesson1Controllers = require('../controllers/lesson1');
const userRoutes = require('../api/user');

// API routes
routes.use('/api/user', userRoutes);

routes.get('/', lesson1Controllers.bolroute);
routes.get('/omot', lesson1Controllers.omotroute);
routes.get('/bob', lesson1Controllers.bobroute);

module.exports = routes; 