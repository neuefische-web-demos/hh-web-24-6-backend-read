import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import JokeForm from "@/components/JokeForm";

export default function Joke() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/jokes/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleEditJoke(data) {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteJoke() {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <JokeForm onSubmit={handleEditJoke} defaultValue={data.joke} />
      <button type="button" onClick={handleDeleteJoke}>
        Delete
      </button>
      <small>ID: {id}</small>
      <h1>{data.joke} </h1>
      <Link href="/">Back to all</Link>
    </>
  );
}

// Plan for Deleting a Joke
// 1. Create Delete Button for user interaction.
// 2. Send DELETE request to the backend.
// 3. Create Delete Method endpoint for handling Delete requests
// 4. Use Joke.findByIdAndDelete to delete element from Database
// 5. Send Success Response to Frontend
// 6. Redirect User to overview list.

// Plan for Editing a Joke
// 1. Create an Edit Form (and retrieve updated data on submit)
// 2. Send UPDATE request to the backend.
// 3. Create Upate method endpoint for handling Update requests
// 4. Use Joke.findbyIdAndUpdate(id, data).
// 5. Send Success response to frontend.
// 6. Call mutate function to revalidate data of the joke.
