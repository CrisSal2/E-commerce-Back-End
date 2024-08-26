const express = require('express');
const routes = require('./routes');
// import sequelize connection
const { Sequelize, DataTypes } = require('sequelize');
import Sequelize from 'sequelize'

/* import userModel from './user'
import messageModel from './message' */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DBA_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres'
})

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync( { force: false }).then ( () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
