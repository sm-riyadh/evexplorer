import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date_start: {
    type: Date
  },
  date_end: {
    type: Date
  },
  location: {
    type: String
  },
  time_start: {
    type: Date
  },
  time_end: {
    type: Date
  },
  privillege: {
    type: String,
  },
  notics: [],
  discussions: [],
})
// {
//   date: {
//     type: Date,
//   },
//   time: {
//     type: Date,
//   },
//   title: {
//     type: String,
//   },
//   message: {
//     type: String,
//   }
// }
const event = mongoose.model('event', eventSchema)

export default event
