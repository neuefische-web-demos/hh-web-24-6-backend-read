import dbConnect from "@/db/connect.js";
import Joke from "@/db/models/Joke.js";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const jokes = await Joke.find();

      response.status(200).json(jokes);
      return;
    }

    if (request.method === "POST") {
      const data = request.body;
      console.log(data);

      // 3.
      await Joke.create(data);

      response.json({ message: "Success!" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server error" });
    return;
  }
}
