import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
import querystring from 'querystring'
import axios from 'axios'

const router = new Router()

const store = {
  access_token: ''
}

const secret = {
  client_id: '830012674729-ekrv7219cf6j9s9lqj3puv51empjej00.apps.googleusercontent.com',
  project_id: 'auth-practice-237406',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  client_secret: 'VqAol-OYAuH6nKkPkfnwdbv6'
}

router.get('/', ctx => {
  ctx.body = fs.readFileSync(path.join(__dirname, '../views/index.html'), 'utf-8')
})

router.get('/auth', ctx => {
  const querystr = querystring.stringify({
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    access_type: 'offline',
    include_granted_scopes: true,
    state: 'state_parameter_passthrough_value',
    redirect_uri: 'http://localhost:8080/user/auth/callback',
    client_id: secret.client_id
  })

  const url = `${secret.auth_uri}?${querystr}`
  ctx.redirect(url)
})

router.get('/auth/callback', ctx => {
  const {
    // state,
    code,
    // scope,
    // authuser,
    // prompt
  } = ctx.request.query
  console.log('Auth Response ======================')
  console.log(ctx.request.query)
  return axios.post(secret.token_uri, {
    code,
    client_id: secret.client_id,
    client_secret: secret.client_secret,
    redirect_uri: 'http://localhost:8080/user/auth/callback',
    grant_type: 'authorization_code'
  })
    .then(res => {
      console.log('Token Response ======================')
      console.log(res.data)
      store.access_token = res.data.access_token
      ctx.redirect('/user/drive')
    })
    .catch(e => {
      console.log(e.response.data)
      ctx.body = e.response.data.error
    })
})

router.get('/drive', ctx => {
  return axios.get(`https://www.googleapis.com/drive/v2/files?access_token=${store.access_token}`)
    .then(res => {
      ctx.body = res.data
    })
    .catch(e => {
      ctx.body = fs.readFileSync(path.join(__dirname, '../views/fail.html'), 'utf-8')
    })
})

export default router
