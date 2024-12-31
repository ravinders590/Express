const express = require('express')
const app = express()
const port = 3002

//start Ejs
app.set('view engine','ejs');

//public path
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
})
app.get('*', (req, res) => {
  throw Error("The page you were looking for could not be found!!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('404', { error: err })
}
);
