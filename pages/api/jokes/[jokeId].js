import dbConnect from "@/db/connect.js";
import Joke from "@/db/models/Joke.js";

export default async function handler(request, response) {
  const { jokeId } = request.query;
  await dbConnect();

  try {
    if (request.method === "GET") {
      const joke = await Joke.findById(jokeId);

      if (!joke) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(joke);
      return;
    }

    if (request.method === "PUT") {
      const updatedJoke = request.body;

      console.log(updatedJoke);
      console.log(jokeId);

      await Joke.findByIdAndUpdate(jokeId, updatedJoke);

      response.status(200).json({ message: "success" });
      return;
    }

    if (request.method === "DELETE") {
      await Joke.findByIdAndDelete(jokeId);

      response.status(200).json({ message: "Success" });
      return;
    }
  } catch (error) {
    console.log(error);

    response.status(500).json({ message: "internal server error" });
  }
}
