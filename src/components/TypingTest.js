import React, { useState, useEffect, useRef, useCallback } from 'react';
import wordData from '../Vocab/EnglishMostFrequentWords.json';
import sentencesData from '../Vocab/EnglishSentences.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TypingTest.css';

function TypingTest() {
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
  const [nextSentence, setNextSentences] = useState('');
  const [stats, setStats] = useState([]);
  const [userId, setUserId] = useState(null);


  const timerRef = useRef(null);
  const wpmintervalRef = useRef(null);
  const textAreaRef = useRef(null);
  const correctCountRef = useRef(correctCount);
  const durationRef = useRef(duration);
  const inCorrectCountRef = useRef(inCorrectCount);
  const netWordPerMinuteRef = useRef(netWordPerMinute);
  const grossWordPerMinuteRef = useRef(grossWordPerMinute);
  const kpmRef = useRef(kpm);


  const navigate = useNavigate();


  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {

      const user = JSON.parse(userString);

      const userId = user.userId;

      setUserId(userId);
    }
  }, []);


  const resetTest = useCallback(() => {
    if (type !== '') {
      setText(getRandomTextData(limit, type));
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
      localStorage.removeItem('stats')
    } else {
      setInputValue('');
    }
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [limit, type, timerDuration]);


 
  const collectStats = useCallback(() => {
    const stats = {
      wpm: grossWordPerMinuteRef.current,
      kpm: kpmRef.current,
      accuracy: netWordPerMinuteRef.current,
      time: durationRef.current,
      correct: correctCountRef.current,
      inCorrect: inCorrectCountRef.current
    };
    return stats;
  }, []);

  const saveStatsToServer = useCallback(async (stats) => {
    if (!userId) {
      console.error('userId is undefined');
      return;
    }

    try {
      console.log('Sending stats:', stats, 'userId:', userId);

      const response = await axios.post('http://localhost:5000/api/stats/update/', { userId, stats }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Stats saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }, [userId]);



  const progress = useCallback(() => {
    const newStats = collectStats();
    setStats(newStats);

    let statsArray = localStorage.getItem('stats');

    if (statsArray) {
      statsArray = JSON.parse(statsArray);
    } else {
      statsArray = [];
    }

    statsArray.push(newStats);
    localStorage.setItem('stats', JSON.stringify(statsArray));

    saveStatsToServer(newStats);
    console.log(newStats);
    navigate('/Progress');
  }, [navigate, collectStats, saveStatsToServer]);


  const checkInput = useCallback((value) => {

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
        return <span key={index}>{char}</span>;
      }
    });

    setHighlightedText(newHighlightedText);
    setCorrectCount(newCorrectCount);
    setInCorrectCount(newInCorrectCount);

    if (value === text) {

      const newSentence = getRandomTextData(limit, type);

      if (newSentence === text) {
        const updatedSentence = getRandomTextData(limit, type);
        setNextSentences(updatedSentence);
        setText(updatedSentence);
      } else {
        setNextSentences(newSentence);
        setText(newSentence);
      }
      setInputValue('');
    }

  }, [limit, type, text]);


  const checkwpm = useCallback((value) => {
    let totalword;
    if (value && value.length > 0) {
      totalword = value.length / 5;
    } else {
      totalword = inputValue.length / 5;
    }
    let timeElapsed = Math.max(duration, 1) / 60.0;
    let grosswpm = Math.round(totalword / timeElapsed);
    let totalkpm = Math.round(totalKeyStroke / timeElapsed);
    let netwpm = Math.round(correctCount / totalKeyStroke) * 100;
    setgrossWordPerMinute(grosswpm);
    setnetWordPerMinute(netwpm);
    setkpm(totalkpm);
  }, [duration, inputValue, correctCount, totalKeyStroke]);


  const testComplete = useCallback(() => {
    clearInterval(timerRef.current);
    progress();
    resetTest();
  }, [progress, resetTest]);


  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          testComplete();
          return 0;
        }
        return prevTimer - 1;
      });
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);
    checkwpm();
  }, [checkwpm, testComplete]);


  const startwpminterval = useCallback(() => {
    clearInterval(wpmintervalRef.current);
    wpmintervalRef.current = setInterval(() => { checkwpm(); }, 1000);
  }, [checkwpm]);


  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    setTotalKeyStroke((prev) => (prev) + 1);
    checkwpm(value);
    if (mode !== 2) {

      if (!startTime) {
        setStartTime(Date.now());
        startTimer();
        startwpminterval();
      }

      checkInput(value);
    }
  }, [checkInput, mode, startTime, startTimer, startwpminterval, checkwpm]);


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


  const getRandomTextData = (limit, type) => {
    const value = Object.values(type).map(item => item.val);
    const shuffeled = value.sort(() => 0.5 - Math.random());
    const result = shuffeled.slice(0, limit).join(' ');
    return result;
  }


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

  useEffect(() => {
    setIsVisible(mode !== 2);
    const randomText = getRandomTextData(limit, type);
    setText(randomText);

    const newSentence = getRandomTextData(limit, type);
    setNextSentences(newSentence);

    setTimer(timerDuration);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(wpmintervalRef.current);
    };
  }, [limit, type, setText, mode, timerDuration]);

  useEffect(() => {
    if (duration > 0 || timer === 0) {
      const newStats = collectStats();

      setStats((prevStats) => {
        const updatedStats = [...prevStats, newStats];
        localStorage.setItem('stats', JSON.stringify(updatedStats));
        return updatedStats;
      });
    }
  }, [duration, collectStats, timer]);


  useEffect(() => {
    if (startTime) {
      startwpminterval();
    }
    return () => {
      clearInterval(wpmintervalRef.current);
    };
  }, [startTime, inputValue, startwpminterval]);


  useEffect(() => {
    grossWordPerMinuteRef.current = grossWordPerMinute;
    kpmRef.current = kpm;
    netWordPerMinuteRef.current = netWordPerMinute;
    inCorrectCountRef.current = inCorrectCount;
    correctCountRef.current = correctCount;
    durationRef.current = duration;
  }, [correctCount, duration, grossWordPerMinute, kpm, netWordPerMinute, inCorrectCount]);


  return (
    <div className="typing-test-container">

      <div className='randomText' >
        <p>{inputValue ? highlightedText : text}</p>
      </div>

      {(type === sentencesData) && (
        <p className="next-sentence" style={{ opacity: 0.5 }}>
          {'=>' + nextSentence}
        </p>
      )
      }

      <textarea
        ref={textAreaRef}
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
        aria-label="Typing input area"
      />

      <div className='stats'>
        {isVisible && (
          <>
            <p>Duration: {timer} seconds</p>
            <p>WPM: {grossWordPerMinute}</p>
          </>
        )}
      </div>

      <div className='modebtn'>
        <button id='resetbtn' onClick={resetTest}>Reset</button>
        <button className={type === wordData ? 'active' : 'inactive'} onClick={wordMode}>Word Mode</button>
        <button className={type === sentencesData ? 'active' : 'inactive'} onClick={sentencesMode}>Sentences Mode</button>
        <button className={type === '' ? 'active' : 'inactive'} onClick={freeMode}>Free Mode</button>
      </div>

      <div className="timer-buttons" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <button onClick={() => setTimerDuration(30)} className={timerDuration === 30 ? 'active' : ''}>30</button>
        <button onClick={() => setTimerDuration(60)} className={timerDuration === 60 ? 'active' : ''}>60</button>
        <button onClick={() => setTimerDuration(90)} className={timerDuration === 90 ? 'active' : ''}>90</button>
        <button onClick={() => setTimerDuration(120)} className={timerDuration === 120 ? 'active' : ''}>120</button>
      </div>

    </div>
  );
}

export default TypingTest;
