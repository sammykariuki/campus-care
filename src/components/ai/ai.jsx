'use client';

import { useState, useRef, useEffect } from 'react';
import classes from './ai.module.css';
import ReactMarkdown from 'react-markdown';

export default function AiPageComponent() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const maxLength = 1000;

  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 300) + 'px'; // cap at 300px
    }
  }, [question]);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // disappears after 2s
  };

  const displayText = expanded || response.length <= maxLength
    ? response
    : response.slice(0, maxLength) + '...';

  const handleSearch = async () => {
    if (!navigator.onLine) {
      setResponse('No internet connection');
      return;
    }

    if (!question.trim()) {
      setResponse('Please enter a question.');
      return;
    }

    if (question.length > 8069) {
        setResponse('Your question is too long. Please shorten it.');
        return;
    }

    try {
      setLoading(true);
      setResponse('');

      const res = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      if (res.ok && data.answer) {
        setResponse(data.answer);
      } else {
        setResponse('Something went wrong. Try again later.');
      }
    } catch (err) {
      console.error(err);
      setResponse('Error reaching AI service.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.inputWrapper}>
        <textarea
          placeholder="Ask AI something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={classes.searchInput}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
        <button
          className={classes.inlineSearchButton}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={classes.loader}></span>
            </>
          ) : (
            '🔍'
          )}
        </button>
      </div>

      <div className={classes.responseBox}>
        {/* {response && <ReactMarkdown>{response}</ReactMarkdown>} */}
        {response && (
            <>
                <ReactMarkdown>{displayText}</ReactMarkdown>
                {response.length > maxLength && (
                  <button onClick={() => setExpanded(!expanded)} className={classes.toggleButton}>
                    {expanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
            </>
        )}
        <button
            onClick={() => {
              navigator.clipboard.writeText(response);
              handleCopy();
            }}
            className={classes.copyButton}
        >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}