import express from 'express'
const app = express()
const port = 3000

//api
// /ariel == route
app.use(express.static('public'))

app.get('/ariel', (_, res) => {

  res.send('Hello World!')
})

app.listen(port, () => { //wait for api calls on port 3000
  console.log(`Example app listening on port ${port}`)
})

