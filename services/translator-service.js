import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

class TranslatorService {
	async translate(query) {
		const options = {
			method: 'GET',
			url: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.yandex}&lang=en-ru&text=${query.text}`,
			headers: { 'Content-Type': 'application/json' },
		}
		const res = await axios
			.request({
				...options,
			})
			.then(function (response) {
				const translate = response.data
				console.log(translate)
				return translate
			})
			.catch(function (error) {
				console.log(error)
				throw new Error(error)
			})

		return res
	}
}

export default new TranslatorService()
