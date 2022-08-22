import { Router } from 'express'
import mongoose from 'mongoose'

import { Event, User } from '../models/index.js'
import dateFormat from 'dateformat'

const router = Router()


// Event creater

router.get('/event-creater', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  return res.render('pages/eventCreater')
})
router.post('/event-creater', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { title, date_start, date_end, location, access, image, description, facebook } = req.body

  Event({ title, date_start, date_end, location, access, image, description, facebook }).save()

  return res.redirect('/')
})

// Subscribe

router.get('/subscribe', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const event = await Event.findOne({ id: req.params.id })

  return res.render('pages/subscribe', { event, dateFormat })
})
router.get('/subscribe-now', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')
  await User.findByIdAndUpdate(req.session.userid, { $push: { subscribed: req.query.event } })

  return res.redirect('/')
})

// Event

router.get('/event/:id', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const event = await Event.findOne({ id: req.params.id })

  return res.render('pages/event', { event, dateFormat })
})
router.get('/home', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { subscribed } = await User.findById(req.session.userid)

  const events = await Event.find({ _id: { $nin: subscribed } })

  return res.render('pages/home', { events, dateFormat })
})


router.get('/', async (req, res, next) => res.redirect('/home'))

export default router
