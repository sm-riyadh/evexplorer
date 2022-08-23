import { Router } from 'express'

import { User } from '../models/index.js'
import { Event } from '../models/index.js'
import dateFormat from 'dateformat'

const router = Router()

router.get('/signout', async (req, res, next) => {
  if (!req.session.userid) return res.redirect('/signin')

  req.session.destroy()
  return res.redirect('/signin')
})
router.get('/signin', async (req, res, next) => {
  if (req.session.userid) return res.redirect('/')

  return res.render('pages/signin', { profile: req.session.profile })
})
router.post('/signin', async (req, res, next) => {
  if (req.session.userid) return res.redirect('/')

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    if (user.password === password) {
      req.session.userid = user.id
      req.session.profile = { username: user.username, name: user.name }

      res.redirect("/");
    }
  } else {
    res.render("pages/signin", { error: "Wrong Email or Password", profile: req.session.profile });
  }
})
router.get('/registration', async (req, res, next) => {
  if (req.session.userid) return res.redirect('/')

  return res.render('pages/registration', { profile: req.session.profile })
})
router.post('/registration', async (req, res, next) => {
  if (req.session.userid) return res.redirect('/')

  const { name, username, password } = req.body

  User({ name, username, password }).save()

  return res.redirect('/')
})
export default router
