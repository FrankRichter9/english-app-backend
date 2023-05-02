import express from 'express'

import { TokenService } from "../services/token-service"

export default async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        const { refreshToken } = req.cookies

        if(!authorizationHeader) {
            return next(new Error("Ошибка авторизации"))
        }

        const accessToken = (authorizationHeader as string).split(' ')[1]
        const tokenFromDb = await TokenService.findToken(refreshToken)

        if(!accessToken || !tokenFromDb) {
            return next(new Error("Ошибка авторизации"))
        }

        const userData = TokenService.validateAccessToken(accessToken)

        if(!userData) {
            return next(new Error("Ошибка авторизации"))
        }

        //@ts-expect-error
        req.user = userData

        next()
    } catch(e) {
        return next(new Error("Ошибка авторизации"))
    }
}