import express from 'express'

import { TokenService } from "../services/token-service"

export default async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        const { refreshToken } = req.cookies

        console.log('req.cookies', req.cookies)

        if(!authorizationHeader) {
            throw new Error("Ошибка авторизации")
        }

        const accessToken = (authorizationHeader as string).split(' ')[1]
        const tokenFromDb = await TokenService.findToken(refreshToken)

        if(!accessToken || !tokenFromDb) {
            throw new Error("Ошибка авторизации")
        }

        const userData = TokenService.validateAccessToken(accessToken)

        if(!userData) {
            throw new Error("Ошибка авторизации")
        }

        //@ts-expect-error
        req.user = userData

        next()
    } catch(e) {
        res.status(401).json(e)
        // return next(new Error("Ошибка авторизации"))
    }
}