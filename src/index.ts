import Koa from 'koa';
import Router from 'koa-router';
import {testFunction} from "./test";
import initRouter from "./routes";

require('dotenv').config()

const app = new Koa();
//Instantiate the Koa object
const router = new Router();

initRouter(app, () => {
}).then();


//Instantiate the router
const port = process.env.PORT || 3000;

//Default empty route
router.get('/', (ctx, next) => {
    ctx.body = '/';
});

//Named Route
router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World! Yey';
});
router.get('/test', (ctx, next) => {
    ctx.body = testFunction();
});

app.use(router.routes());           //Use the routes defined using the router

app.listen(port);