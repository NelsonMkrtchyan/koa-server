import Koa from 'koa';
import Router from 'koa-router';
import initRouter from "./routes";
import {Sequelize} from "sequelize";
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import {config} from "dotenv";

import admin from "firebase-admin";
import {firebaseDatabaseURL, serviceAccount} from "@/config";
import {Client} from "@elastic/elasticsearch";

// elasticsearch version 7.4 in aws
const client = new Client({
  node: 'https://search-venews-prod-2jl5ihazayyhqhqg367ciwffha.ap-southeast-2.es.amazonaws.com',
});

config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDatabaseURL,
});

//Instantiate the Koa object
const app = new Koa();
//Instantiate the router
const router = new Router();
// set port
const port = process.env.PORT || 3000;

app.use(bodyParser());

app.use(
  cors({
    exposeHeaders: 'X-Auth-Token',
  })
);

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
  client.info().then((r) => {
    console.log('r ---------->', r, 'elasticsearch is available');
  });
}).then();

//Default empty route
router.get('/', async (ctx) => {
  ctx.body = '/';
});


app.listen(port);