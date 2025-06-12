import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: { type: String, required: true },
  imDBId: { type: String, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  birthDate: { type: String, required: true },
  films: [
    {
      title: { type: String, required: true },
      imDBId: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String, required: true },
      ratings: [
        {
          username: { type: String, required: true },
          rating: { type: Number, required: true },
          review: { type: String, required: true },
        },
      ],
    },
  ],
});

const Actor = mongoose.model("Actor", actorSchema);

export default Actor;
