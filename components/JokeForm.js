export default function JokeForm({ onSubmit, defaultValue = "" }) {
  async function handleSubmit(event) {
    event.preventDefault();

    // 1.
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Joke: </span>
        <input type="text" name="joke" defaultValue={defaultValue} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
