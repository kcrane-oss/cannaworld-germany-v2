import confetti from "canvas-confetti";

export function useConfetti() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899"],
    });
  };

  const triggerCelebration = () => {
    const end = Date.now() + 2000;
    const interval = setInterval(() => {
      if (Date.now() > end) { clearInterval(interval); return; }
      confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#10b981", "#3b82f6"] });
      confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#8b5cf6", "#f59e0b"] });
    }, 250);
  };

  return { triggerConfetti, triggerCelebration };
}
