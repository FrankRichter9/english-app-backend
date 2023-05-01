import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { User } from '../../models/user-model'
import { MailService } from '../mail-service'
import { TokenService } from '../token-service'

class Service {
    async registration(email: string, password: string) {
        const candidate = await User.findOne({ email })

        if(candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()
        const user = await User.create({ email, password: hashPassword, activationLink })

        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}` )

        const userDto = {
            email: user.email,
            id: user._id,
            isActivated: user.isActivated
        }
        const tokens = TokenService.generateToken(userDto)

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ activationLink })

        if(!user) {
            throw new Error('Неккоректная ссылка активации')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email })
        
        if(!user) {
            throw new Error('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if(!isPassEquals) {
            throw new Error('Неверный пароль')
        }

        const userDto = {
            email: user.email,
            id: user._id,
            isActivated: user.isActivated
        }
        const tokens = TokenService.generateToken(userDto)

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);

        return token
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw new Error('Пользователь не авторизован')
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = TokenService.findToken(refreshToken)

        if(!userData || !tokenFromDb) {
            throw new Error('Пользователь не авторизован')
        }

        //@ts-expect-error
        const user = await User.findById(userData.id as string)
        const userDto = {
            //@ts-expect-error
            email: user.email,
            //@ts-expect-error
            id: user._id,
            //@ts-expect-error
            isActivated: user.isActivated
        }
        const tokens = TokenService.generateToken(userDto)

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await User.find()

        return users
    }
}

export const UserService = new Service()