import Router from "koa-router";
import {User} from "@models/user";

const testRouter = new Router();
testRouter
  .get('/', async (ctx) => {
    const createdUser = await User.create({
      firstName: 'Nelson',
      lastName: 'Mkrt',
      email: 'Email',
      password: 'password',
      nickName: 'ASD',
      age: 1,
      post: 1,
      gender: 'male'
    });
    // const createPost = await Post.create({title:'xcvcbxcx', desc: "qweerw", userId: 1})
    ctx.body = {
      createdUser
    };
  });
export default testRouter;