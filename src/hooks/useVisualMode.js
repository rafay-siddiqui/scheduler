import { useState } from 'react';

export default function useVisualMode(intial) {
  const [mode, setMode] = useState(intial);
  const [history, setHistory] = useState([intial]);

  const editHistory = () => {
    const array = [...history];
    (history.length !== 1 && array.pop());
    setHistory(array);
  }

  const transition = (next, replace = false) => {
    setMode(next)
    if (replace) {
      editHistory();
    } else {
      setHistory(prev => [...prev, next])
    }
  }

  const back = () => {
    editHistory();
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}