import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd'

export default function MyInput() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      setInputValue(inputRef.current.input.value);
    }
  }, [inputRef.current]);

  const handleClick = () => {
    console.log(inputRef.current.input.value)
    const value = inputRef.current.input.value;
    setInputValue(value);
  };

  return (
    <div>
      <Input type="text" ref={inputRef} />
      <button onClick={handleClick}>Get value</button>
      <p>Input value: {inputValue}</p>
    </div>
  );
}