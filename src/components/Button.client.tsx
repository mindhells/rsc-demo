'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';

import styles from './Button.scss';

const Button = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    flushSync(() => {
      setCount(count + 1);
    });
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      click me!{count}
    </button>
  );
};

export default Button;
