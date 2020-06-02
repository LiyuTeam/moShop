import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/user', controller.user.index);
  router.get('/user/add', controller.user.addUser);
};
