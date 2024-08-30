import React, { useState, useEffect, useRef } from 'react';
import wordData from '../Vocab/EnglishMostFrequentWords.json';
import sentencesData from '../Vocab/EnglishSentences.json';
import { useNavigate } from 'react-router-dom';

function TypingTest() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [timerDuration, setTimerDuration] = useState(30);
  const [timer, setTimer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState([]);
  const [limit, setLimit] = useState(30);
  const [type, setType] = useState(wordData);
  const [mode, setMode] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);

  const setModeandType = (newMode, newType, newLimit) => {
    setMode(newMode);
    setType(newType);
    setLimit(newLimit);
    resetTest();
  }

  const wordMode = () => setModeandType(0, wordData, 30);
  const sentencesMode = () => setModeandType(1, sentencesData, 1);
  const freeMode = () => setModeandType(2, '', 0);


  const getRandomWord = (limit, type) => {
    const value = Object.values(type).map(item => item.val);
    const shuffeled = value.sort(() => 0.5 - Math.random());
    const result = shuffeled.slice(0, limit).join(' ');
    return result;
  }

  useEffect(() => {
    setIsVisible(mode !== 2);
    const randomText = getRandomWord(limit, type);
    setText(randomText);
    setTimer(timerDuration);
  }, [limit, type, mode, timerDuration]);

  // useEffect(() => {
  //   if (inputValue.length === 0) {
  //     resetTest();
  //   }
  // }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (mode !== 2) {

      
      if (!startTime) {
        setStartTime(Date.now());
        startTimer();
      }

      
      checkInput(value);
    }
  };

  const startTimer = () => {
    // if (timer > 0) {
    //   timerRef.current = setInterval(() => {
    //     setTimer((prevTimer) => prevTimer - 1);
    //     console.log('time after minus:' + timer);
    //     setDuration((prevDuration) => prevDuration + 1); // Increment total duration
    //   }, 1000);
    // } else {
    //   clearInterval(timerRef.current);
    //   alert('Time is up!'); // Show alert when countdown timer reaches zero
    //   resetTest(); // Reset the test when countdown timer reaches zero
    // }
    // return () => clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          alert('Time is up!'); 
          resetTest(); 
          return 0; 
        }
        return prevTimer - 1; 
      });
      setDuration((prevDuration) => prevDuration + 1); 
    }, 1000);

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

   
    if (value === text) {
      clearInterval(timerRef.current);
      alert(`Typing test completed in ${duration} seconds! You typed ${newCorrectCount} characters correctly.`);
      progress();
      resetTest();
    }

  };
  const progress = () => {
    navigate('/Progress');
  };
  const resetTest = () => {
    setText(getRandomWord(limit, type))
    setInputValue('');
    setStartTime(null);
    setDuration(0);
    setTimer(timerDuration);
    setCorrectCount(0);
    setHighlightedText([]);
      clearInterval(timerRef.current);
    
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
      <p style={{ visibility: isVisible ? 'visible' : 'hidden' }} >Duration: {timer} seconds</p>
      <p style={{ visibility: isVisible ? 'visible' : 'hidden' }}>Correct Characters: {correctCount}</p>
      <div className='modebtn'>
        <button id='resetbtn' onClick={resetTest} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>Reset</button>
        <button id='togglebtn' onClick={wordMode}>Word Mode</button>
        <button id='togglebtn' onClick={sentencesMode}>Sentences Mode</button>
        <button id='modebtn' onClick={freeMode}>Free Mode</button>
      </div>
      <select style={{ visibility: isVisible ? 'visible' : 'hidden' }} onChange={(e) => setTimerDuration(Number(e.target.value))} value={timerDuration}>
        <option value={30}>30 seconds</option>
        <option value={60}>1 minute</option>
        <option value={120}>2 minutes</option>
      </select>
    </div>
  );
}

export default TypingTest;
