//? Dependencies

import Config from '@lib/config'
import * as Data from '@lib/data'
import { Request, Response, NextFunction } from 'express'



//! Get Routes

export function get(req: Request, res: Response) {
    Data.ListFolders()
        .then((data: any) => res.status(200).json({ data: data }))
        .catch((err: Error) => res.status(500).json({ error: err }))
}



//! Post Routes

export function post(req: Request, res: Response) {
    if (!req.query.data) return res.status(400).json({ error: 'No data provided!' })
    const data = req.query.data

    if (req.query.mode == 'create') {
        Data.CreateFolder(data as string)
            .then(() => res.status(200).json({ success: 'Folder created!' }))
            .catch((err: Error) => res.status(500).json({ error: err }))
    }

    if (req.query.mode == 'delete') {
        Data.DeleteFolder(data as string)
            .then(() => res.status(200).json({ success: 'Folder Deleted!' }))
            .catch((err: Error) => res.status(500).json({ error: err }))
    }
}