'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';

const Button = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    flushSync(() => {
      setCount(count + 1);
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      click me!{count}
    </button>
  );
};

export default Button;
