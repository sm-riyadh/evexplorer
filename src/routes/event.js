import { Router } from 'express'
import mongoose from 'mongoose'

import { Event, User } from '../models/index.js'
import dateFormat from 'dateformat'

const router = Router()


// Event creater

router.get('/event-creater', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  return res.render('pages/eventCreater', { profile: req.session.profile })
})
router.post('/event-creater', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { title, date_start, date_end, location, access, image, description, catagory, facebook, organizer } = req.body

  Event({ title, date_start, date_end, location, access, image, description, catagory, facebook, organizer, created_by: req.session.profile.username }).save()

  return res.redirect('/event-own')
})
router.get('/event-own', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const events = await Event.find({ created_by: { $eq: req.session.profile.username } })

  return res.render('pages/eventOwn', { events, dateFormat, profile: req.session.profile })
})
router.get('/event-delete', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Event.findByIdAndDelete(req.query.event)

  return res.redirect('/event-own')
})
// Subscribe

router.get('/subscribe', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { subscribed } = await User.findById(req.session.userid)

  const events = await Event.find({ _id: { $in: subscribed } })

  return res.render('pages/subscribe', { events, dateFormat, profile: req.session.profile })
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

  const { search, catagory, date, location } = req.query

  let params = {
    title: { $regex: new RegExp(search, 'i') },
    location: { $regex: new RegExp(location, 'i') },
    catagory: catagory === 'All' ? undefined : catagory,
    date_start: date ? date : undefined
  }
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) {
      delete params[key];
    }
  })

  const { subscribed } = await User.findById(req.session.userid)
  const events = await Event.find({ _id: { $nin: subscribed }, created_by: { $ne: req.session.profile.username }, ...params })

  return res.render('pages/home', {
    events, dateFormat, profile: req.session.profile, params: { search, catagory, date, location }
  })
})


router.get('/', async (req, res, next) => res.redirect('/home'))

export default router
