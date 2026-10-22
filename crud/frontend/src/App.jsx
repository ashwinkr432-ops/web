import { useState, useEffect } from 'react';

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const api = 'http://localhost:3000/books';

  function load() {
    fetch(api).then(r => r.json()).then(setBooks);
  }

  useEffect(() => { load(); }, []);

  function add(e) {
    e.preventDefault();
    fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author })
    }).then(load);
  }

  function update(id) {
    const author=prompt("enter name");
    const title=prompt("enter title");
    
    fetch(api + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title,author })
    }).then(load);
  }

  function remove(id) {
    fetch(api + '/' + id, { method: 'DELETE' }).then(load);
  }

  return (
    <div>
      <h1>Library</h1>
      <form onSubmit={add}>
        <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Author" onChange={e => setAuthor(e.target.value)} />
        <button>Add</button>
      </form>

      {books.map(b => (
        <p key={b._id}>
          {b.title} - {b.author}
          <button onClick={() => update(b._id)}>Update</button>
          <button onClick={() => remove(b._id)}>Delete</button>
        </p>
      ))}
    </div>
  );
}
