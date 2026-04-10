import React, { useState, useEffect } from 'react';

const STUDENT_ID = '24WH5A0503';
const LAB_ID = 'FSDLAB2';

function Home() {
  const [keyword, setKeyword] = useState('');
  const [tasks, setTasks] = useState([]);

  // Handle search button click
  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("Please enter a keyword");
      return;
    }
    try {
      const res = await fetch(`/api/tasks?search=${keyword}`);
      const data = await res.json();
      setTasks(data);

      // Reflect keyword in URL query parameter
      window.history.pushState({}, '', `?search=${keyword}`);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Load tasks if search param exists in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('search');
    if (q) {
      setKeyword(q);
      fetch(`/api/tasks?search=${q}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error('Error fetching tasks:', err));
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
      />
      <button onClick={handleSearch}>Search</button>

      {tasks.length === 0 ? (
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