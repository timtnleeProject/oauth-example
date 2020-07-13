import Router from 'koa-router';

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'user'
})

export default router
