import { Schema } from "mongoose";
import mongoose from "mongoose";

const jokeSchema = new Schema({
  joke: String,
});

const Joke = mongoose.models.Joke || mongoose.model("Joke", jokeSchema);

export default Joke;
