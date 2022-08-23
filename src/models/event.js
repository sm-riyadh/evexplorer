import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date_start: {
    type: Date,
    required: true
  },
  date_end: {
    type: Date
  },
  location: {
    type: String,
  },
  access: {
    type: String,
  },
  image: {
    type: String
  },
  facebook: {
    type: String,
  },
  subscribed: {
    type: Number,
    default: 0
  },
  organizer: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  created_by: {
    type: String,
  },
  catagory: {
    type: String,
    default: "Others",
  },
  paid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  ],
  notics: [{
    date: {
      type: Date,
      required: true
    },
    message: {
      type: String,
      required: true
    },
  }],
  discussions: [{
    date: {
      type: Date,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    created_by: {
      type: String,
      required: true
    },
  }],
})

export default mongoose.model('event', eventSchema)
