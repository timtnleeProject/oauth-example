import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
import querystring from 'querystring';

const router = new Router()

router.get('/', ctx => {
  ctx.body = fs.readFileSync(path.join(__dirname, '../views/index.html'), 'utf-8')
})

router.get('/auth', ctx => {
  const clientID = '830012674729-ekrv7219cf6j9s9lqj3puv51empjej00.apps.googleusercontent.com'
  const querystr = querystring.stringify({
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    access_type: 'offline',
    include_granted_scopes: true,
    state: 'state_parameter_passthrough_value',
    redirect_uri: 'http://localhost:8080/user/auth/callback',
    client_id: clientID
  })

  const url = `https://accounts.google.com/o/oauth2/auth?${querystr}`
  ctx.redirect(url)
})

router.get('/auth/callback', ctx => {
  console.log(ctx.request.query);
  ctx.body = '123'
})

export default router
