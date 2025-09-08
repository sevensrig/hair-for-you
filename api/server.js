import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './app/routes/appointments.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

const PORT = process.env.PORT || 800

app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`)
})
