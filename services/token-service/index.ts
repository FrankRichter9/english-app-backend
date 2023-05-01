import jwt from 'jsonwebtoken'

import { Token } from '../../models/token-model'
import { Types } from 'mongoose'

class Service {
    generateToken(payload: Record<string, any>) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '-', { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '-2', { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await Token.findOne({ user: userId })

        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({ user: userId, refreshToken })

        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Token.deleteOne({ refreshToken })

        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '-')

            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '-2')

            return userData
        } catch(e) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = await Token.findOne({ refreshToken })

        return tokenData
    }
}

export const TokenService = new Service()