// frontend/src/components/QASection.jsx
import { useState } from 'react';
import api from '../utils/api.js';

function QASection() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    if (!question.trim()) return alert("Ask something!");

    try {
      const res = await api.post('/ask', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error("Error asking question:", err);
    }
  };

  return (
    <div>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask your question..."
        rows={3}
      />
      <button onClick={askQuestion}>Ask</button>
      {answer && <p><strong>Answer:</strong> {answer}</p>}
    </div>
  );
}

export default QASection;
