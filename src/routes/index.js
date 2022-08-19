import Event from '../models/event.js'
import dateFormat from 'dateformat'

export default router => {
  router.get('/login', async (req, res, next) => {
    res.render('login')
  })
  router.get('/event/:id', async (req, res, next) => {
    const event = await Event.findOne({ id: req.params.id })

    res.render('event', { event, dateFormat })
  })
  router.get('/', async (req, res, next) => {
    const events = await Event.find({})

    res.render('index', { events, dateFormat })
  })
}
