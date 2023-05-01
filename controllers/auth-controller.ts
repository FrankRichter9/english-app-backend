import express from 'express'

import { UserService } from '../services/user-service'

class AuthController {
	async registration(req: express.Request, res: express.Response) {
		try {
			const { email, password } = req.body
			const userData = await UserService.registration(email, password)

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			return res.json(userData)
		} catch (e) {
			console.log(e)
			res.status(400).json(e)
		}
	}
	async login(req: express.Request, res: express.Response) {
		try {
			const { email, password } = req.body
			const userData = await UserService.login(email, password)

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			return res.json(userData)

		} catch (e) {
			console.log(e)
			res.status(400).json(e)
		}
	}

	async logout(req: express.Request, res: express.Response) {
		try {
			const { refreshToken } = req.cookies

			const token = await UserService.logout(refreshToken)
			res.clearCookie('refreshToken')

			return res.json(token)

		} catch (e) {
			console.log(e)
			res.status(400).json(e)
		}
	}

	async activate(req: express.Request, res: express.Response) {
		try {
			const activationLink = req.params.link
			await UserService.activate(activationLink)

			return res.redirect(process.env.CLIENT_URL || '#')

		} catch (e) {
			console.log(e)
			res.status(400).json(e)
		}
	}

	async refresh(req: express.Request, res: express.Response) {
		try {
			const { refreshToken } = req.cookies

			const userData = await UserService.refresh(refreshToken)

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			return res.json(userData)

		} catch (e) {
			console.log(e)
			res.status(400).json(e)
		}
	}
	async getUsers(req: express.Request, res: express.Response) {
		try {
			const users = await UserService.getAllUsers()

			res.json(users)
		} catch (e) {
			console.log(e)
			res.status(400).json(e)
		}
	}
}

export default new AuthController()