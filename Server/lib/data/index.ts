//? Dependencies

import Config from '@lib/config'

import fs from 'fs'
import Crypto from 'crypto'



//? Functions

export function CheckFS() {
    if (!fs.existsSync(Config.dataPath)) fs.mkdirSync(Config.dataPath)
}


export function ListFolders() {
    return new Promise((resolve, reject) => {

        let Data: {
            name: string,
            creationDate: Date,
            description: string,
        }[] = []

        const Folders = fs.readdirSync(Config.dataPath)

        Folders.forEach((folder: string) => {
            const Index = JSON.parse(fs.readFileSync(`${Config.dataPath}/${folder}/index.json`, 'utf-8'))
            Data.push({
                name: folder,
                creationDate: Index.creationDate,
                description: Index.description,
            })
        })

        return resolve(Data)

    })
}


export function CreateFolder(name: string) {
    return new Promise((resolve, reject) => {

        if (fs.existsSync(`${Config.dataPath}/${name}`)) return reject('Folder already exists!')
        else fs.mkdirSync(`${Config.dataPath}/${name}`)


        fs.mkdirSync(`${Config.dataPath}/${name}/images`)


        fs.writeFileSync(`${Config.dataPath}/${name}/index.json`, JSON.stringify({
            creationDate: new Date(),
            description: "",
        }, null, '\t'))

        fs.writeFileSync(`${Config.dataPath}/${name}/receipts.json`, JSON.stringify({
            data: [],
        }, null, '\t'))

        fs.writeFileSync(`${Config.dataPath}/${name}/invoices.json`, JSON.stringify({
            data: [],
        }, null, '\t'))


        return resolve('Folder created!')

    })
}

export function DeleteFolder(name: string) {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(`${Config.dataPath}/${name}`)) return reject('This folder does not exist!')
        else fs.rmdirSync(`${Config.dataPath}/${name}`, { recursive: true, maxRetries: 3, retryDelay: 3000 })

        return resolve('Folder deleted!')

    })
}

export function UpdateFolder(name: string, data: any) {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(`${Config.dataPath}/${name}`)) return reject('This folder does not exist!')

        let Data = JSON.parse(fs.readFileSync(`${Config.dataPath}/${name}/index.json`, 'utf-8'))
        Data.description = data.description

        fs.writeFileSync(`${Config.dataPath}/${name}/index.json`, JSON.stringify(Data, null, '\t'))

        return resolve('Folder updated!')

    })
}



export function FetchTaxes(folder: string) {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(`${Config.dataPath}/${folder}`)) return reject('This folder does not exist!')
        
        const Data = {
            index: JSON.parse(fs.readFileSync(`${Config.dataPath}/${folder}/index.json`, 'utf-8')),
            receipts: JSON.parse(fs.readFileSync(`${Config.dataPath}/${folder}/receipts.json`, 'utf-8')),
            invoices: JSON.parse(fs.readFileSync(`${Config.dataPath}/${folder}/invoices.json`, 'utf-8'))
        }

        return resolve(Data)

    })
}

export function InsertTax(folder: string, data: {uuid: string, date: Date, type: string, description: string, vendor: string, value: number, gst: number}) {
    return new Promise((resolve, reject) => {

        let Receipts = JSON.parse(fs.readFileSync(`${Config.dataPath}/${folder}/receipts.json`, 'utf-8'))

        data['uuid'] = Crypto.randomUUID()

        Receipts.data.push(data)


        Receipts.data = Receipts.data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

        fs.writeFileSync(`${Config.dataPath}/${folder}/receipts.json`, JSON.stringify(Receipts, null, '\t'))

        resolve('Successfully inserted receipt!')
    })
}

export function DeleteTax(folder: string, uuid: string) {
    return new Promise((resolve, reject) => {

        let Receipts = JSON.parse(fs.readFileSync(`${Config.dataPath}/${folder}/receipts.json`, 'utf-8'))

        Receipts.data = Receipts.data.filter((receipt: any) => receipt.uuid != uuid)


        fs.writeFileSync(`${Config.dataPath}/${folder}/receipts.json`, JSON.stringify(Receipts, null, '\t'))

        resolve('Successfully deleted receipt!')
    })
}