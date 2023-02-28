import Router from 'express'
import TranslatorController from '../controllers/translator-controller.js'

const translatorRouter = new Router()

translatorRouter.get('/translate', TranslatorController.translate)

export default translatorRouter
