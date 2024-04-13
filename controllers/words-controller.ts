import express from 'express'
import { createWordsTable } from '../sql/words/create-words-table'
import { addWord } from '../sql/words/add-word'
import { getWords } from '../sql/words/get-words'
import { deleteWord } from '../sql/words/delete-word'
import { countWords } from '../sql/words/count-words'

// import { OpenAI } from 'openai'
import { patchWord } from '../sql/words/patch-word'

const DEFAULT_LIMIT = 20

class WordsController {
	// gpt: OpenAI

	constructor() {
		// this.gpt = new OpenAI({
		// 	apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
		// });
	}

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

	async generateWords(req: express.Request, res: express.Response) {
		// try {
			// const gpt = new OpenAI({
			// 	apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
			// });
		// 	const gpt = null

		// 	const chatCompletion = await gpt?.chat.completions.create({
		// 		messages: [{ role: "user", content: `придумай для меня 10 слов на английском, исключи такие слова как [cat, dog, house, apple, car, book, tree, sun], ответ дай в формате json без дополнительного текста, вот так { words: { word: слово на английском, translate: его перевод на русский } }` }],
		// 		model: "gpt-3.5-turbo",
		// 	});

		// 	const resp = chatCompletion.choices[0].message.content

		// 	let words = []

		// 	try {
		// 		words = resp ? JSON.parse(resp)?.words || [] : []
		// 	} catch {

		// 	}

		// 	return res.json({
		// 		words,
		// 	})
		// } catch {
		// 	res.send(500)
		// }
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

		res.send(err ? 500 : 200)
	}

	async patchWord(req: express.Request, res: express.Response) {

		const { id, word, translate } = req.body

		if(!id || !word || !translate) {
			res.send(500)
		}

		const updatedDate = (new Date()).toISOString()

		const err = await patchWord(id, {
			word,
			translate
		}, updatedDate)

		res.send(err ? 500 : 200)
	}
}

export default new WordsController()
