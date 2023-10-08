import express from 'express'
import translatorRouter from './routes/translator-router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import mongoose, { Schema } from 'mongoose'
import authRouter from './routes/auth-router'
import { SqlService } from './sql/connect-bd'
import { createWordsTable } from './sql/words/create-words-table'

dotenv.config()

const options = {
	definition: {
		openapi: '3.0.0',
		info: { 
			title: 'English-app-backend',
			version: '1.0.0',
			description: 'Simple api',
		},
		servers: [
			{
				url: 'http://localhost:5000',
			},
		],
	},
	apis: ['./routes/*.ts'],
}

const specs = swaggerJsDoc(options)

const PORT = process.env.PORT || 5000
 
const app = express()

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json()) 
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use('/api', translatorRouter)
app.use('/auth', authRouter)

async function startApp() {
	try {
		await SqlService.connect()
		// await SqlService.createTabels()

		app.listen(PORT, () => {
				console.log(`Server started on port ${PORT}...`)
			}
		)
	} catch (e) {
		console.log(e)
	}
}

startApp()
