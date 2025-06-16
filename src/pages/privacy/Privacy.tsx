import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './privacy.css';

function Privacy() {
  const [markdown, setMarkdaown] = useState('');

  useEffect(() => {
    fetch('policies/policy.md')
      .then(responce => responce.text())
      .then(text => setMarkdaown(text))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

export default Privacy;
