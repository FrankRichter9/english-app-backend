import express from 'express'
import translatorRouter from './routers/translator-router.js'

const PORT = 5000

const app = express()

app.use(express.json())
app.use('/api', translatorRouter)

async function startApp() {
    try {
        app.listen(PORT, () => console.log('Server started on port ' + PORT + '...'))
    } catch (e) {
        console.log(e)
    }
}

startApp()