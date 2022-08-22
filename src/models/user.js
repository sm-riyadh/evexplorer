import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  subscribed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  ]
})

export default mongoose.model('user', userSchema)
