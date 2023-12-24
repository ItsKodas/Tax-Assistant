//? Dependencies

import Config from '@lib/config'
import { Request, Response, NextFunction } from 'express'

import * as Sessions from '@lib/sessions'

import DataForm from '@lib/forms/data'



//! Get Routes

export function get(req: Request, res: Response) {
    
    const token = req.query.token
    if (!token) return res.status(400).json({ error: 'No token provided' })

    if (Sessions.Active.find(t => t == token)) return res.status(200).json({ valid: true })
    else return res.status(401).json({ valid: false })

}



//! Post Routes

export function post(req: Request, res: Response) {

    const password = req.query.password

    if (!password) return res.status(400).json({ error: 'No password provided' })
    if (password != Config.password) return res.status(401).json({ error: 'Incorrect password' })

    return res.status(200).json({ token: Sessions.New() })  /*res.cookie('token', Sessions.New(), { maxAge: 900000, httpOnly: true }).status(200).redirect('/')*/

}