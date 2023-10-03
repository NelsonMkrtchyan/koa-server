import Router from "koa-router";

const testRouter = new Router();
testRouter
  .get('/', async (ctx) => {
    ctx.body = {};
  });
export default testRouter;