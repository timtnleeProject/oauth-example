import Router from 'koa-router'
import path from 'path'
import fs from 'fs'

const router = new Router()

router.get('/', ctx => {
  ctx.body = fs.readFileSync(path.join(__dirname, '../views/index.html'), 'utf-8')
})

export default router
