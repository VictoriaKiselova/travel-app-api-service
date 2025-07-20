import { mongoose, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenLifeTime: {
      type: Date,
      required: true,
    },
    refreshTokenLifeTime: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timeseries: true },
);

const Session = mongoose.model('session', sessionSchema);
export default Session;
