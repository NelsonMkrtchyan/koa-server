import Router from "koa-router";

const testRouter = new Router();
testRouter
    .post('/test', () => console.log('/test'))
export default testRouter;