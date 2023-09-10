import express from 'express'
import TranslatorController from '../controllers/translator-controller'
import WordsController from '../controllers/words-controller'
import authMiddlewares from '../middlewares/auth-middlewares'
import usersController from '../controllers/users-controller'

const translatorRouter = express.Router()

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Book:
 *              type: object
 *              required:
 *                  - title
 *                  - author
 *              properties:
 *                  id:
 *                      type: string
 *                      description: id dfsdf
 *                  title:
 *                      type: string
 *                      description: The book title
 *                  author:
 *                      type: string
 *                      description: The book author
 *              example:
 *                  id: 234fd
 *                  title: Surin Alex book
 *                  author: Surin Alex
 *
 */

/**
 *  @swagger
 *  tags:
 *      name: Books
 *      description: Test tag
 */

/**
 *  @swagger
 *  /api/translate:
 *      get:
 *          symmary: Get word translate and synonyms
 *          tags: [Books]
 *          responses:
 *              200:
 *                  descpiption: Translate and synonyms word
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Book'
 */

translatorRouter.get('/translate', TranslatorController.translate)
translatorRouter.get('/words', WordsController.getAllWords)
translatorRouter.post('/word', WordsController.setWord)
translatorRouter.delete('/word', WordsController.deleteWord)
translatorRouter.get('/users', authMiddlewares, usersController.getUsers)

export default translatorRouter
