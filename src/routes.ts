import Router from 'koa-router';
import {glob} from 'glob';
import Koa from "koa";


export default async function initRouter(app: Koa, router: Router, cb: () => void) {
  try{
    const routes = await glob(['modules/**/*.routes.js', 'modules/**/*.routes.ts'], { cwd: __dirname });
    for (const route of routes) {
      const moduleRouter = (await import(`./${route}`)).default as Router;
      const routeName = route.match(/([a-z]*)\.routes/)![1];
      router.use(`/${routeName}`, moduleRouter.routes());
    }
    console.log('router.routes()', routes);
    app.use(router.routes());
    cb();
  } catch(err){
    console.error(err);
  }

}