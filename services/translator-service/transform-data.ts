import { YandexTranslatorData, TranslateResponse, Synonyms } from './types'

const DEFAULT_SYNONYMS = {
	ru: [],
	en: [],
}

export function transformData(data: YandexTranslatorData): TranslateResponse {
	const translates = data?.def
	const translate = translates?.[0]?.tr?.[0]?.text || null

	const synonyms = translates?.reduce<Synonyms>(
		(acc, item) => {
			const ruArr = acc.ru
			const enArr = acc.en

			const tr = item.tr
			if (tr?.length) {
				return {
					ru: [
						...ruArr,
						tr.reduce<Array<string>>((acc, word, index) => {
							if (index === 0) {
								return acc
							}
							return [...acc, word.text]
						}, []),
					],
					en: [
						...enArr,
						tr.reduce<Array<string>>((acc, word) => {
							const mean = word.mean
							if (mean?.length) {
								const arr = mean[0].text
								return [...acc, arr]
							}
							return acc
						}, []),
					],
				}
			}
			return acc
		},
		{ ...DEFAULT_SYNONYMS }
	)

	const valudSynonyms = {
		ru: synonyms.ru.filter((arr) => arr.length),
		en: synonyms.en.filter((arr) => arr.length),
	}

	return {
		translate,
		synonyms: valudSynonyms,
	}
}
