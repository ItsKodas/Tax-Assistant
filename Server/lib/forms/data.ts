//? Dependencies

import Config from '@lib/config'
import { Request, Response, NextFunction } from 'express'

import formidable from 'formidable'



//? Functions

export default function (req: Request) {
    return new Promise((resolve, reject) => {

        const form = formidable({})

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            return resolve(fields)
        })

    })
}