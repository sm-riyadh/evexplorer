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

  const { title, date_start, date_end, location, access, image, description, facebook, organizer } = req.body

  Event({ title, date_start, date_end, location, access, image, description, facebook, organizer, created_by: req.session.profile.username }).save()

  return res.redirect('/')
})

// Subscribe

router.get('/subscribe', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { subscribed } = await User.findById(req.session.userid)

  const events = await Event.find({ _id: { $in: subscribed } })

  return res.render('pages/subscribe', { events, dateFormat })
})
router.get('/subscribe-now', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Event.findByIdAndUpdate(req.query.event, { $inc: { subscribed: 1 } })
  await User.findByIdAndUpdate(req.session.userid, { $push: { subscribed: req.query.event } })

  return res.redirect('/subscribe')
})
router.get('/unsubscribe-now', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Event.findByIdAndUpdate(req.query.event, { $inc: { subscribed: -1 } })
  await User.findByIdAndUpdate(req.session.userid, { $pull: { subscribed: req.query.event } })

  return res.redirect('/subscribe')
})
// Event

router.get('/event/:id', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const event = await Event.findById(req.params.id)

  return res.render('pages/event', { event, dateFormat, profile: req.session.profile })
})
router.post('/event/:id/post', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')
  const { type, message } = req.body

  if (type === 'notices') {
    await Event.findByIdAndUpdate(req.params.id, {
      $push: {
        notics: {
          date: new Date(),
          message,
        }
      }
    })
  } else if (type === 'discussions') {
    await Event.findByIdAndUpdate(req.params.id, {
      $push: {
        discussions: {
          date: new Date(),
          message,
          created_by: req.session.profile.username,
        }
      }
    })
  }

  return res.redirect('/event/' + req.params.id + '?tab=' + type)
})
router.get('/home', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { subscribed } = await User.findById(req.session.userid)

  const events = await Event.find({ _id: { $nin: subscribed } })

  return res.render('pages/home', { events, dateFormat })
})


router.get('/', async (req, res, next) => res.redirect('/home'))

export default router
