const route = app => {
  app.get('/', function(req, res, next) {
    res.render('index')
  })
}

export default route
