import express from 'express'
import { createWordsTable } from '../sql/create-words-table'
import { addWord } from '../sql/add-word'
import { getWords } from '../sql/get-words'

class WordsController {
	async getAllWords(req: express.Request, res: express.Response) {
		const words = await getWords()

		return res.json(words)
	}

	async setWord(req: express.Request, res: express.Response) {
		console.log('req', req.body)
		// createWordsTable()
		addWord(req.body)
	}
}

export default new WordsController()
