const delimiter = { delimiter: '?', openDelimiter: '{{', closeDelimiter: '}}' }

export default app => {
  app.get('/login', function (req, res, next) {
    res.render('login')
  })
  app.get('/search', function (req, res, next) {
    res.render('search')
  })
  app.get('/event', function (req, res, next) {
    res.render('event')
  })
  app.get('/', function (req, res, next) {
    console.log('first')
    res.render('index')
    // res.render('index', { delimiter })
  })
}
