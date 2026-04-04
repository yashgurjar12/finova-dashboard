import { useEffect, useRef, useState } from 'react';

/**
 * Typing effect for two lines (Overview greeting), implemented with useEffect timers.
 * Mirrors the original typewriter behavior: line1 completes, short pause, then line2.
 */
export function useOverviewGreeting(line1Text, line2Text) {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingLine, setTypingLine] = useState(1);
  const timersRef = useRef([]);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };

    const typeLine = (fullText, setChar, baseSpeed, variance, onDone) => {
      let i = 0;
      const step = () => {
        if (i < fullText.length) {
          setChar(fullText.slice(0, i + 1));
          i += 1;
          const delay = Math.max(
            20,
            baseSpeed + Math.floor(Math.random() * variance) - variance / 2
          );
          timersRef.current.push(window.setTimeout(step, delay));
        } else {
          onDone?.();
        }
      };
      step();
    };

    setLine1('');
    setLine2('');
    setTypingLine(1);

    typeLine(line1Text, setLine1, 120, 30, () => {
      setTypingLine(0);
      timersRef.current.push(
        window.setTimeout(() => {
          setTypingLine(2);
          typeLine(line2Text, setLine2, 50, 25, () => setTypingLine(0));
        }, 180)
      );
    });

    return clearTimers;
  }, [line1Text, line2Text]);

  return { line1, line2, typingLine };
}
