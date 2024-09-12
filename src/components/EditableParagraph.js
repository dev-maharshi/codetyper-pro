import React, { useState, useEffect, useRef } from 'react';
import wordData from '../Vocab/EnglishMostFrequentWords.json';
import './TypingTest.css';

function EditableParagraph() {
  const [text, setText] = useState(''); // The target text to type
  const [inputValue, setInputValue] = useState(''); // User's input
  const contentEditableRef = useRef(null); // Ref for the content editable div

  // Function to generate random text
  const getRandomText = (limit, type) => {
    const value = Object.values(type).map(item => item.val);
    const shuffled = value.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit).join(' ');
  };

  // Initialize the target text
  useEffect(() => {
    const randomText = getRandomText(30, wordData); // Change the limit as needed
    setText(randomText);
    setInputValue(''); // Clear input value initially
  }, []);

  // Handle input change
  const handleInput = (e) => {
    const value = e.target.innerText; // Get the text from the content editable div
    setInputValue(value); // Update the input value

    // Highlight the text based on correctness
    highlightText(value);
  };

  // Highlighting logic
  const highlightText = (value) => {
    const words = text.split(' ');
    const userWords = value.split(' ');

    const highlightedText = words.map((word, index) => {
      const userWord = userWords[index] || '';
      const isCorrect = userWord === word;

      return (
        <span key={index} style={{ backgroundColor: isCorrect ? 'lightgreen' : 'red' }}>
          {word}
        </span>
      );
    });

    // Update the contentEditable div with highlighted text
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = highlightedText.map(span => span.props.children).join(' ');
      placeCursorAtEnd(contentEditableRef.current); // Place cursor at the end after updating
    }
  };

  // Function to place the cursor at the end of the contentEditable div
  const placeCursorAtEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Collapse to the end
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className="typing-test-container">
      <h2>Typing Test</h2>
      <div
        ref={contentEditableRef}
        contentEditable
        onInput={handleInput}
        className="typing-input"
        suppressContentEditableWarning={true} // Prevent React warning for contentEditable
        style={{ minHeight: '40px', border: '1px solid #ccc', padding: '10px', fontSize: '16px' }}
      >
        {inputValue} {/* Display the user's input */}
      </div>
      <button onClick={() => setInputValue('')}>Reset</button>
    </div>
  );
}

export default EditableParagraph;