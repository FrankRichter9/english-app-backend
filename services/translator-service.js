import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': process.env.RapidAPIKey,
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  }
};

class TranslatorService {
    async translate(query) {
        console.log(query)
        const encodedParams = new URLSearchParams();
        if(!query?.text) {
            return
        }
        encodedParams.append("q", query.text);
        encodedParams.append("target", "ru");
        encodedParams.append("source", "en");

        const res = await axios.request({
            ...options,
            data: encodedParams
        }).then(function (response) {
            const translate = response.data.data.translations[0].translatedText
            console.log(translate)
            return translate
        }).catch(function (error) {
            throw new Error(error)
        });

        return res
    }
}

export default new TranslatorService();