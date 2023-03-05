import express from 'express'
import translatorRouter from './routes/translator-router'
import cors from 'cors'

import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

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

const PORT = 5000

const app = express()

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors())
app.use(express.json())
app.use('/api', translatorRouter)

async function startApp() {
	try {
		app.listen(PORT, () =>
			console.log('Server started on port ' + PORT + '...')
		)
	} catch (e) {
		console.log(e)
	}
}

startApp()
