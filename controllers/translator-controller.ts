import express from 'express'
import TranslatorService from '../services/translator-service'

class TranslatorController {
	async translate(req: express.Request, res: express.Response) {
		try {
			const translate = await TranslatorService.translate(req.query)
			res.json(translate)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new TranslatorController()
