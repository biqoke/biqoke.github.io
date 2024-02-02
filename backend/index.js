const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
app.use(express.json())
app.use(fileUpload())
const PORT = 3000

const authorRoutes = require('./app/routers/authorsRouter')
const bookRoutes = require('./app/routers/booksRouter')
const genreRoutes = require('./app/routers/genresRouter')

app.use('/books', bookRoutes)
app.use('/authors', authorRoutes)
app.use('/genres', genreRoutes)

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}`)
})
