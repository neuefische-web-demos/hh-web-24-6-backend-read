import dbConnect from "@/db/connect.js";
import Joke from "@/db/models/Joke.js";

export default async function handler(request, response) {
  await dbConnect();

  try {
    const jokes = await Joke.find();

    response.status(200).json(jokes);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server error" });
    return;
  }
}
