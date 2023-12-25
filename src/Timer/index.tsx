import React, { useState, useEffect, useRef } from 'react';

const QuizTimer = ({ startTime, duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  const calculateTimeLeft = () => {
    const now = new Date();
    const endTime = new Date(startTime.getTime() + duration * 1000);
    const remainingTime = endTime.getTime() - now.getTime();
    setTimeLeft(Math.max(remainingTime, 0)); // Ensure non-negative time
  };

  useEffect(() => {
    calculateTimeLeft();
    intervalRef.current = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalRef.current);
  }, [startTime, duration]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      Time Left: {days}d {hours}h {minutes}m {seconds}s
      {timeLeft === 0 && <div>Time is up!</div>}
    </div>
  );
};

export default QuizTimer;