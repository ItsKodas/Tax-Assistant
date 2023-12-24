//? Dependencies

import Config from '@lib/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import * as Routes from 'api/index'


import * as Sessions from '@lib/sessions'
import * as Data from '@lib/data/index'



//! Initialize

Data.CheckFS()


const app = express()

app.use(cors())
app.use(cookieParser())

app.listen(Config.port, () => console.log(`Listening on port ${Config.port}`))



//! Middleware

app.use('/api/*', (req, res, next) => {
    if (!req.query.token) return res.status(401).json({ error: 'No token provided!' })
    if (Sessions.Active.find((session: string) => session == req.query.token)) return next()
    else return res.status(401).json({ error: 'Invalid token!' })
})



//! Routes

app.route('/')
    .get(Routes.ping.default)

app.route('/login')
    .get(Routes.login.get)
    .post(Routes.login.post)

app.route('/api/folders')
    .get(Routes.folders.get)
    .post(Routes.folders.post)

app.route('/api/tax-list')
    .get(Routes.taxlist.get)
    .post(Routes.taxlist.post)