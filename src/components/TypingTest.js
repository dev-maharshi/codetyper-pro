import React, { useState, useEffect, useRef, useCallback } from 'react';
import wordData from '../Vocab/EnglishMostFrequentWords.json';
import sentencesData from '../Vocab/EnglishSentences.json';
import { useNavigate } from 'react-router-dom';

function TypingTest() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [timerDuration, setTimerDuration] = useState(30);
  const [timer, setTimer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [inCorrectCount, setInCorrectCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState([]);
  const [limit, setLimit] = useState(30);
  const [type, setType] = useState(wordData);
  const [mode, setMode] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [grossWordPerMinute, setgrossWordPerMinute] = useState(0);
  const [netWordPerMinute, setnetWordPerMinute] = useState(0);
  const [totalKeyStroke, setTotalKeyStroke] = useState(0);
  const [kpm, setkpm] = useState(0);
  const timerRef = useRef(null);
  const wpmintervalRef = useRef(null);


  const resetTest = useCallback(() => {
    setText(getRandomWord(limit, type))
    setInputValue('');
    setStartTime(null);
    setDuration(0);
    setTimer(timerDuration);
    setCorrectCount(0);
    setInCorrectCount(0);
    setgrossWordPerMinute(0);
    setHighlightedText([]);
    setTotalKeyStroke(0);
    setkpm(0);
    clearInterval(timerRef.current);
    clearInterval(wpmintervalRef.current);
  }, [limit, type, timerDuration]);


  const setModeAndType = useCallback((newMode, newType, newLimit) => {
    setMode(newMode);
    setType(newType);
    setLimit(newLimit);
    resetTest();

    localStorage.setItem('typingmode', newMode);
  }, [resetTest]);


  const wordMode = () => setModeAndType(0, wordData, 30);
  const sentencesMode = () => setModeAndType(1, sentencesData, 1);
  const freeMode = () => setModeAndType(2, '', 0);


  useEffect(() => {
    const typemode = localStorage.getItem('typingmode');
    if (typemode !== null) {
      const modevalue = parseInt(typemode, 10);
      if (modevalue === 0) {
        setModeAndType(0, wordData, 30);
      } else if (modevalue === 1) {
        setModeAndType(1, sentencesData, 1);
      } else if (modevalue === 2) {
        setModeAndType(2, '', 0);
      }
    } else {
      setModeAndType(0, wordData, 30);
    };
  }, [setModeAndType]);


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

    return () => {
      clearInterval(timerRef.current);
      clearInterval(wpmintervalRef.current);
    };
  }, [limit, type, mode, timerDuration]);


  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setTotalKeyStroke(totalKeyStroke +1);
    console.log(inputValue);
    if (mode !== 2) {

      if (!startTime) {
        setStartTime(Date.now());
        startTimer();
        startwpminterval();
      }

      checkInput(value);
    }
  };


  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerRef.current);
          alert(`time up`);
          resetTest();
          return 0;
        }
        return prevTimer - 1;
      });
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);

  };

  const checkwpm = useCallback(() => {
    let totalword = inputValue.length / 5;
    let correctword = correctCount / 5;
    console.log(inputValue);
    let timeElapsed = Math.max(duration, 1) / 60.0;
    let grosswpm = Math.round(totalword / timeElapsed);
    let netwpm = Math.round(correctword / timeElapsed);
    let totalkpm = Math.round(totalKeyStroke /timeElapsed);
    setgrossWordPerMinute(grosswpm);
    setnetWordPerMinute(netwpm);
    setkpm(totalkpm);
  }, [duration, inputValue, correctCount,totalKeyStroke]);


  const startwpminterval = useCallback((value) => {
    clearInterval(wpmintervalRef.current);
    wpmintervalRef.current = setInterval(() => { checkwpm(); }, 1000);
  }, [checkwpm]);

  const checkInput = (value) => {
    let newCorrectCount = 0;
    let newInCorrectCount = 0;
    const newHighlightedText = text.split('').map((char, index) => {
      if (index < value.length) {
        const correct = value[index] === char;

        if (correct) {
          newCorrectCount++;
          return <span style={{ color: 'green' }} key={index}>{char}</span>;
        } else {
          newInCorrectCount++;
          return <span style={{ color: 'red' }} key={index}>{char}</span>;
        }
      } else {
        return <span key={index}>{char}</span>; // Return the character as is if not typed yet
      }
    });

    setHighlightedText(newHighlightedText);
    setCorrectCount(newCorrectCount);
    setInCorrectCount(newInCorrectCount);

    if (value === text) {
      alert(`Typing test completed in ${duration} seconds! You typed ${correctCount} characters correctly.`);
      progress();
      resetTest();
    }

  };


  useEffect(() => {
    if (startTime) {
      startwpminterval();
    }
    return () => {
      clearInterval(wpmintervalRef.current);
    };
  }, [startTime, inputValue, startwpminterval]);

  const progress = () => {
    navigate('/Progress');
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
      {isVisible && (
        <>
          <p>Duration: {timer} seconds</p>
          <p>WPM: {grossWordPerMinute}</p>
          <p>Accuracy: {netWordPerMinute}</p>
          <p>Correct Characters: {correctCount}</p>
          <p>Incorrect Characters: {inCorrectCount}</p>
          <p>kpm: {kpm}</p>
        </>
      )}
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
