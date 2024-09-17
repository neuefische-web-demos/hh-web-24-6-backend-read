import dbConnect from "@/db/connect.js";
import { jokes } from "../../../lib/data.js";
import Joke from "@/db/models/Joke.js";

export default async function handler(request, response) {
  const { jokeId } = request.query;
  await dbConnect();

  try {
    const joke = await Joke.findById(jokeId);

    if (!joke) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(joke);
  } catch (error) {
    console.log(error);

    response.status(500).json({ message: "internal server error" });
  }
}
