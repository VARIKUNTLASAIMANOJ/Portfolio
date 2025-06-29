import { useState, useEffect } from 'react';

export const useTypingAnimation = (words: string[], speed: number = 100, delay: number = 2000) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!words.length) return;

    const word = words[currentIndex];
    
    if (isTyping) {
      if (currentWord.length < word.length) {
        const timeout = setTimeout(() => {
          setCurrentWord(word.slice(0, currentWord.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, delay);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentWord.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentWord(currentWord.slice(0, -1));
        }, speed / 2);
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }
  }, [currentWord, currentIndex, isTyping, words, speed, delay]);

  return currentWord;
};