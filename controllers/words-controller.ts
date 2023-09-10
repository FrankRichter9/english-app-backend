import express from 'express'
import { createWordsTable } from '../sql/create-words-table'
import { addWord } from '../sql/add-word'
import { getWords } from '../sql/get-words'
import { deleteWord } from '../sql/delete-word'
import { countWords } from '../sql/count-words'

const DEFAULT_LIMIT = 20

class WordsController {
	async getAllWords(req: express.Request, res: express.Response) {
		const {limit: reqLimit, page: reqPage} = req.query

		const limit = reqLimit ? Number(reqLimit) : DEFAULT_LIMIT
		const page = reqPage ? Number(reqPage) : 1
		const offset = (page - 1) * limit

		const words = await getWords(limit, offset)
		const count = await countWords()

		return res.json({
			words,
			pagination: {
				page,
				count,
				countPages: Math.ceil(count / limit)
			}
		})
	}

	async setWord(req: express.Request, res: express.Response) {
		// createWordsTable()
		const err = await addWord(req.body)
		res.send(err ? 400 : 200)
	}

	async deleteWord(req: express.Request, res: express.Response) {
		// createWordsTable()
		const err = await deleteWord(req.body.id)

		res.send(err ? 400 : 200)
	}
}

export default new WordsController()
