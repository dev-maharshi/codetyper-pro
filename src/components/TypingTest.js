import React, { useState, useEffect } from 'react';

function TypingTest() {
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchRandomText();
  }, []);

  const fetchRandomText = async () => {
    const response = await fetch('https://api.example.com/random-text'); // Replace with actual API
    const data = await response.json();
    setText(data.text);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInputValue(value);
    if (value === text) {
      setDuration((Date.now() - startTime) / 1000);
      // Logic to handle completion of the test
    }
  };

  return (
    <div>
      <h2>Typing Test</h2>
      <p>{text}</p>
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
      />
      <p>Duration: {duration ? `${duration} seconds` : 'Not completed'}</p>
    </div>
  );
}

export default TypingTest;
