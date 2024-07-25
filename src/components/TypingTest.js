import React, { useState, useEffect } from 'react';

function TypingTest() {
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchRandomText();
  });
  const url = 'https://random-text-generator.p.rapidapi.com/api/v1/paragraph?maxSentences=15&realWord=false&minSentences=2';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '4dfa86dd9bmsh76324d7992d4a44p18227ejsn783008c6df75',
      'x-rapidapi-host': 'random-text-generator.p.rapidapi.com'
    }
  };
  const fetchRandomText = async () => {
    try {
      const response = await fetch(url,options);
      const data = await response.json();
      if (data.documents && data.documents.length > 0) {
        const randomDoc = data.documents[Math.floor(Math.random() * data.documents.length)];
        setText(randomDoc.text);
        console.log(setText(randomDoc.text));
      } else {
        setText('No documentation found.');
      }
    } catch (error) {
      console.error('Error fetching the data:', error);
      setText('Error fetching the documentation.');
    }
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
