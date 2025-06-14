import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './privacy.css';

function Conditions() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('policies/conditions.md')
      .then(responce => responce.text())
      .then(text => setMarkdown(text))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

export default Conditions;
