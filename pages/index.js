import useSWR from "swr";
import Link from "next/link";
import JokeForm from "@/components/JokeForm";

export default function HomePage() {
  const { data, isLoading, mutate } = useSWR("/api/jokes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleAddJoke(data) {
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
    <>
      <JokeForm onSubmit={handleAddJoke} />
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
