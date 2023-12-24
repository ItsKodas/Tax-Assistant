//? Dependencies

import Config from '@lib/config'

import Crypto from 'crypto'



//? Variables

export let Active: string[] = []

export function New() {
    const Token = Crypto.randomBytes(16).toString('hex')
    Active.push(Token)

    return Token
}

export function Destroy (Token: string) {
    Active = Active.filter((t) => t != Token)
}