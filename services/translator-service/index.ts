import axios, { AxiosRequestConfig } from 'axios'
import dotenv from 'dotenv'

import { transformData } from './transform-data'

dotenv.config()

class TranslatorService {
	async translate(query: { lang?: 'ru' | 'en'; text?: string }) {
		console.log(query)
		const options = {
			method: 'GET',
			url: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${
				process.env.yandex
			}&lang=${query.lang === 'ru' ? 'ru-en' : 'en-ru'}&text=${
				query.text
			}`,
			headers: { 'Content-Type': 'application/json' },
		}
		const res = await axios
			.request(options)
			.then(function (response) {
				const translate = response.data
				console.log(translate)
				return transformData(translate)
			})
			.catch(function (error) {
				console.log(error)
				throw new Error(error)
			})

		return res
	}
}

export default new TranslatorService()
