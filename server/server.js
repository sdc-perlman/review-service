const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });
const express = require('express');
const { notFound, errors } = require('./controllers/');
const reviewInfoRoutes = require('./controllers/reviewDataConroller/reviewDataController');
const reviewRoutes = require('./controllers/reviewController/reviewController');

const app = express();

app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/reviews/info', reviewInfoRoutes);
app.use('/api/reviews/all', reviewRoutes);
app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));
app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'client', 'dist')));
app.get('*', notFound);
app.use(errors);

module.exports = app;
