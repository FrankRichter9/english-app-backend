import express from 'express'
import { createWordsTable } from '../sql/words/create-words-table'
import { addWord } from '../sql/words/add-word'
import { getWords } from '../sql/words/get-words'
import { deleteWord } from '../sql/words/delete-word'
import { countWords } from '../sql/words/count-words'

const DEFAULT_LIMIT = 20

class WordsController {
	async getAllWords(req: express.Request, res: express.Response) {
		const {limit: reqLimit, page: reqPage} = req.query

		const limit = reqLimit ? Number(reqLimit) : DEFAULT_LIMIT
		const page = reqPage ? Number(reqPage) : 1
		const offset = (page - 1) * limit

		// @ts-expect-error
		const userId = req.user.id || undefined

		const words = await getWords(limit, offset, userId)
		const count = await countWords(userId)

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
		// await createWordsTable()
		const { word, translate } = req.body

		if(!word.trim() || !translate.trim()) {
			throw new Error('поле word или translate не может быть пустым')
		}

		// @ts-expect-error
		const userId = req?.user?.id || 0
		const createdDate = (new Date()).toISOString()
		const updatedDate = (new Date()).toISOString()

		const err = await addWord({
			userId,
			word,
			translate,
			createdDate,
			updatedDate,
			rating: 0,
		})
		res.sendStatus(err ? 400 : 200)
	}

	async deleteWord(req: express.Request, res: express.Response) {
		// createWordsTable()
		const err = await deleteWord(req.body.id)

		res.send(err ? 400 : 200)
	}
}

export default new WordsController()
