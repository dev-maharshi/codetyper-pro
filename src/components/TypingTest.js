import React, { useState, useEffect } from 'react';

function TypingTest() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState([]);

  useEffect(() => {
    if (inputValue.length === 0) {
      resetTest();
    }
  }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Start timer on first input
    if (!startTime) {
      setStartTime(Date.now());
      startTimer();
    }

    // Check input character by character
    checkInput(value);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);
    setTimer(interval);
  };

  const checkInput = (value) => {
    let newCorrectCount = 0;

    const newHighlightedText = text.split('').map((char, index) => {
      if (index < value.length) {
        const correct = value[index] === char;
        if (correct) {
          newCorrectCount++;
          return <span style={{ color: 'green' }} key={index}>{char}</span>;
        } else {
          return <span style={{ color: 'red' }} key={index}>{char}</span>;
        }
      } else {
        return <span key={index}>{char}</span>; // Return the character as is if not typed yet
      }
    });

    setHighlightedText(newHighlightedText);
    setCorrectCount(newCorrectCount);

    // Check if the input matches the text
    if (value === text) {
      clearInterval(timer);
      alert(`Typing test completed in ${duration} seconds! You typed ${newCorrectCount} characters correctly.`);
      resetTest();
    }
  };

  const resetTest = () => {
    setInputValue('');
    setStartTime(null);
    setDuration(0);
    setCorrectCount(0);
    setHighlightedText([]);
    if (timer) {
      clearInterval(timer);
    }
  };

  return (
    <div>
      <h2>Typing Test</h2>
      <p>{inputValue ? highlightedText : text}</p> {/* Render the highlighted text */}
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
      />
      <p>Duration: {duration} seconds</p>
      <p>Correct Characters: {correctCount}</p>
    </div>
  );
}

export default TypingTest;
