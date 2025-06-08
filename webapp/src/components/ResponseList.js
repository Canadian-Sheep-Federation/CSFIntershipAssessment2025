import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ResponseList() {
  const [list, setList] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await axios.get('http://localhost:3000/responses');
      setList(res.data);
    } catch {
      setList([]);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h3>All Responses</h3>
      {list.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        list.map(r => (
          <div key={r.id} style={{ borderBottom: '1px solid #ccc', margin: '8px 0' }}>
            <strong>{r.name}</strong> — <em>{r.favoritePokemon}</em>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
