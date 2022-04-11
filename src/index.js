import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

app.listen(8000, () => {
  console.log('API running')
})
