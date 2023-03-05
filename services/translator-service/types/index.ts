export type YandexTranslatorData = {
	head?: any
	def: Array<Word>
}

export type Word = {
	text: string
	pos?: string
	gen?: string
	fr?: number
	ts?: string
	tr?: Array<Word>
	syn?: Array<Word>
	mean?: Array<Word>
}

export type Synonyms = {
	ru: string[][]
	en: string[][]
}

export type TranslateResponse = {
	translate: string | null
	synonyms: Synonyms
}
