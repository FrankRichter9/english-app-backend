import express from 'express'

import { UserService } from '../services/user-service'

class UsersController {
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

export default new UsersController()
