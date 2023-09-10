import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { User, createUserDto } from '../../models/user-model'
import { MailService } from '../mail-service'
import { TokenService } from '../token-service'
import { createUsersTable } from '../../sql/users/create-users-table'
import { findUserByEmail } from '../../sql/users/find-user-by-email'
import { addUser } from '../../sql/users/add-user'
import { getUsers } from '../../sql/users/get-users'
import { findTokens } from '../../sql/tokens/find-tokens'
import { findUserById } from '../../sql/users/find-user-by-id'

class Service {
    async registration(email: string, password: string) {
        // const createTableErr = await createUsersTable()
        const { data: candidate } = await findUserByEmail(email)

        if(candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activation_link = uuidv4()

        const { error: addUserError } = await addUser(new User({ email, password: hashPassword, activation_link, is_activated: false }))

        if(addUserError) {
            throw new Error(`Ошибка создания пользователя`)
        }

        const { data: user } = await findUserByEmail(email)

        // // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}` )

        const userDto = createUserDto(user)
        // const tokens = TokenService.generateToken(userDto)

        // await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            user: userDto
        }
    }

    async activate(activationLink: string) {
        // const user = await User.findOne({ activationLink })

        // if(!user) {
        //     throw new Error('Неккоректная ссылка активации')
        // }

        // user.isActivated = true
        // await user.save()
    }

    async login(email: string, password: string) {
        const { data: user } = await findUserByEmail(email)

        const errorText = 'Неверный логин или пароль'
        
        if(!user) {
            throw new Error(errorText)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if(!isPassEquals) {
            throw new Error(errorText)
        }

        const userDto = createUserDto(user)
        const tokens = TokenService.generateToken(userDto)

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        await TokenService.removeToken(refreshToken);

        return true
    }

    async refresh(refreshToken: string) {
        const errorText = 'Пользователь не авторизован'
        if(!refreshToken) {
            throw new Error(errorText)
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = findTokens(refreshToken)

        if(!userData || !tokenFromDb) {
            throw new Error(errorText)
        }

        //@ts-expect-error
        const { error, data: user } = await findUserById(userData.id)

        if(error) {
            throw new Error(errorText)
        }

        const userDto = {
            email: user.email,
            id: user.id,
            is_activated: user.is_activated
        }
        const tokens = TokenService.generateToken(userDto)

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await getUsers()

        return users
    }

    async getMeUser(refreshToken: string) {
        const userData = TokenService.validateRefreshToken(refreshToken)

        // @ts-expect-error
        const req = userData?.id && await findUserById(userData.id)

        if(!req.data || req.error) {
            throw new Error('Пользователь не найден')
        }

        return createUserDto(req.data)
    }
}

export const UserService = new Service()