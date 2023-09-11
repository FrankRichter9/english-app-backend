import jwt from 'jsonwebtoken'

import { Token } from '../../models/token-model'
import { Types } from 'mongoose'
import { findUserById } from '../../sql/users/find-user-by-id'
import { createTokensTable } from '../../sql/tokens/create-tokens-table'
import { addTokens } from '../../sql/tokens/add-tokens'
import { deleteTokens } from '../../sql/tokens/delete-tokens'
import { findTokens } from '../../sql/tokens/find-tokens'
import { findTokensByUserId } from '../../sql/tokens/find-tokens-by-user-id'

class Service {
    generateToken(payload: Record<string, any>) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '-', { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '-2', { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        // const { data: userInTokens } = await findTokensByUserId(userId)

        // if(userInTokens) {
        //     return
        // }

        const { error } = await addTokens(userId, refreshToken)

        if(error) {
            throw new Error('Ошибка создания токена')
        }
    }

    async removeToken(refreshToken: string) {
        const { error } = await deleteTokens(refreshToken)

        if(error) {
            throw new Error('Ошибка при удалении токена')
        }
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
        const { data, error } = await findTokens(refreshToken)

        if(error) {
            throw new Error('Ошибка при поиске токена')
        }

        return data
    }
}

export const TokenService = new Service()