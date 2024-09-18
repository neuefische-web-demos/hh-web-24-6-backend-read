import useSWR from "swr";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading } = useSWR("/api/jokes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <JokeForm />
      <ul>
        {data.map((joke) => (
          <li key={joke._id}>
            <Link href={`/${joke._id}`}>{joke.joke}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// Masterplan Add Data to DB
// 1. get data from a user (joke string)
//  -> Form + 1 text input
// 2. Send the data to the backend (fetch + POST + body)
// 3. Transform JS Data into MongoDB Data (Joke Model)
// 4. refresh jokes data in the frontend (userSWR mutate)

function JokeForm() {
  // console.log the joke from the user

  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    // 1.
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    // 2.
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // 4.
    if (response.ok) {
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Your Joke here:</span>
        <input type="text" name="joke" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
