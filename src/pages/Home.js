import React, { useState, useEffect } from 'react';

const STUDENT_ID = '24WH5A0503';
const LAB_ID = 'FSDLAB2';

function Home() {
  const [keyword, setKeyword] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("Please enter a keyword");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/tasks?search=${keyword}`);
      const data = await res.json();
      setTasks(data);
      setLoading(false);

      
      window.history.pushState({}, '', `?search=${keyword}`);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('search');
    if (q) {
      setKeyword(q);
      setLoading(true);
      fetch(`/api/tasks?search=${q}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching tasks:', err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <h1>Stack Track Lab</h1>
      <p>Student ID: {STUDENT_ID}</p>
      <p>Lab ID: {LAB_ID}</p>

      <h2>Search Tasks</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 12px' }}>
        Search
      </button>

      {loading ? (
        <p>Searching...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.description} ({task.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;