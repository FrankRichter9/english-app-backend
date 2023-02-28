import TranslatorService from '../services/translator-service.js'

class TranslatorController {
    async translate(req, res) {
        try {
            // console.log(req)
            const translate = await TranslatorService.translate(req.query)
            res.json(translate)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new TranslatorController();