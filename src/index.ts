import Koa from 'koa';
import Router from 'koa-router';
import initRouter from "./routes";
import {Sequelize} from "sequelize";

import {config} from "dotenv";

config();

//Instantiate the Koa object
const app = new Koa();
//Instantiate the router
const router = new Router();
// set port
const port = process.env.PORT || 3000;

export const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/venews'
);
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.', process.env.DATABASE_URL);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


initRouter(app, router, async () => {
  await testConnection();

}).then();

//Default empty route
router.get('/', async (ctx) => {
  ctx.body = '/';
});


app.listen(port);