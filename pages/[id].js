import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Joke() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/jokes/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleDelete() {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <button type="button" onClick={handleDelete}>
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
