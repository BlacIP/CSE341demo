const routes = require('express').Router();

const lesson1Controllers = require('../controllers/lesson1');

routes.get('/', lesson1Controllers.bolroute);
routes.get('/omot', lesson1Controllers.omotroute);
routes.get('/bob', lesson1Controllers.bobroute);

module.exports = routes; 