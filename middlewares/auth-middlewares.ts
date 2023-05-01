import express from 'express'

import { TokenService } from "../services/token-service"

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization

        if(!authorizationHeader) {
            return next(new Error("Ошибка авторизации"))
        }

        const accessToken = (authorizationHeader as string).split(' ')[1]

        if(!accessToken) {
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