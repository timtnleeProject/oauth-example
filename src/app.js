import Koa from 'koa'
import router from './routes'

const app = new Koa()

app.use(router.routes())
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
