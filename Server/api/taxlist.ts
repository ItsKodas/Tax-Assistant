//? Dependencies

import Config from '@lib/config'
import * as Data from '@lib/data'
import { Request, Response, NextFunction } from 'express'



//! Get Routes

export function get(req: Request, res: Response) {

    const Folder = req.query.folder

    if (!Folder) return res.status(400).json({ error: 'No folder provided!' })

    Data.FetchTaxes(Folder as string)
        .then((data: any) => res.status(200).json({ data }))
        .catch((error: Error) => res.status(500).json({ error }))

}



//! Post Routes

export function post(req: Request, res: Response) {
    if (!req.query.folder) return res.status(400).json({ error: 'No folder provided!' })
    if (!req.query.data) return res.status(400).json({ error: 'No data provided!' })
    const folder = req.query.folder
    const data = req.query.data

    if (req.query.mode == 'update') {
        Data.UpdateFolder(folder as string, { description: data })
            .then(() => res.status(200).json({ success: 'Folder updated!' }))
            .catch((error: Error) => res.status(500).json({ error }))
    }

    if (req.query.mode == 'delete') {
        Data.DeleteFolder(data as string)
            .then(() => res.status(200).json({ success: 'Folder Deleted!' }))
            .catch((error: Error) => res.status(500).json({ error }))
    }

    if (req.query.mode == 'insert') {
        const receipt = JSON.parse(data as string)
        Data.InsertTax(folder as string, receipt)
            .then(() => res.status(200).json({ success: 'Receipt Inserted!' }))
            .catch((error: Error) => res.status(500).json({ error }))
    }

    if (req.query.mode == 'redact') {
        Data.DeleteTax(folder as string, data as string)
            .then(() => res.status(200).json({ success: 'Receipt Redacted!' }))
            .catch((error: Error) => res.status(500).json({ error }))
    }
}