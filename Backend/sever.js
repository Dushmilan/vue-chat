const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routes/index.routes')

app.use(cors())
app.use(express.json())

app.use('/api', router)


app.listen(PORT, () => {
  console.log(`Development | ${PORT}`)
})
