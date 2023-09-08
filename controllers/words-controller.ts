import express from 'express'
import { createWordsTable } from '../sql/create-words-table'
import { addWord } from '../sql/add-word'
import { getWords } from '../sql/get-words'
import { deleteWord } from '../sql/delete-word'

class WordsController {
	async getAllWords(req: express.Request, res: express.Response) {
		const words = await getWords()

		return res.json(words)
	}

	async setWord(req: express.Request, res: express.Response) {
		// createWordsTable()
		addWord(req.body)
		res.send(200)
	}

	async deleteWord(req: express.Request, res: express.Response) {
		// createWordsTable()
		const err = await deleteWord(req.body.id)

		if (!err) {
			res.send(200)
			return
		}
		res.send(400)
	}
}

export default new WordsController()
