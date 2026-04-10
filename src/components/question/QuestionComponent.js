import React, { useState, useEffect } from 'react';
// TODO: Import any API functions you need from '../../api/client'
// Example: import { get, post } from '../../api/client';
import { get } from '../../api/client';

function QuestionComponent() {
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
    }, []);

  
  return (
    <div>
      <p>QuestionComponent placeholder — implement your assigned question set here.</p>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionComponent;