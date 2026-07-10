'use client';

import React, { useEffect, useRef, useState } from 'react';

class Cactus {
  x: number;
  width: number;
  height: number;
  y: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth;
    this.width = Math.random() > 0.6 ? 18 : 10;
    this.height = Math.random() * 15 + 20;
    this.y = canvasHeight - this.height - 6;
    this.color = '#4361ee';
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#ff006e';
    ctx.fillRect(this.x + (this.width / 2) - 1, this.y, 2, this.height);
  }

  update(gameSpeed: number) {
    this.x -= gameSpeed;
  }
}

const DinoGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scoreSpanRef = useRef<HTMLSpanElement | null>(null);
  const highscoreSpanRef = useRef<HTMLSpanElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameOverState, setGameOverState] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);

  const isPlayingRef = useRef<boolean>(false);
  const gameSpeedRef = useRef<number>(4.5);
  const scoreRef = useRef<number>(0);
  const obstaclesRef = useRef<Cactus[]>([]);
  const nextObstacleTimerRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);

  // Dino object inside refs to keep it mutable across frames
  const dinoRef = useRef({
    x: 40,
    y: 116,
    width: 22,
    height: 28,
    vy: 0,
    isJumping: false,
    color: '#4cc9f0',
    draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height - 6);
      ctx.fillRect(this.x + 8, this.y - 6, 16, 10); // Head
      ctx.fillStyle = '#10111a'; // Eye
      ctx.fillRect(this.x + 18, this.y - 3, 2, 2);
      ctx.fillStyle = this.color; // Feet
      ctx.fillRect(this.x + 2, this.y + this.height - 6, 5, 6);
      ctx.fillRect(this.x + 14, this.y + this.height - 6, 5, 6);
    },
    jump() {
      if (!this.isJumping) {
        this.vy = -8.5;
        this.isJumping = true;
      }
    },
    update(gravity: number, canvasHeight: number) {
      this.vy += gravity;
      this.y += this.vy;
      if (this.y > canvasHeight - 34) {
        this.y = canvasHeight - 34;
        this.vy = 0;
        this.isJumping = false;
      }
    }
  });

  const gravity = 0.55;

  // Load highscore on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = parseInt(localStorage.getItem('dino-highscore') || '0');
      setHighScore(saved);
      if (highscoreSpanRef.current) {
        highscoreSpanRef.current.textContent = String(saved).padStart(5, '0');
      }
    }
  }, []);

  const drawInitialState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw Ground
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 6);
    ctx.lineTo(canvas.width, canvas.height - 6);
    ctx.stroke();

    // Reset dino y
    dinoRef.current.y = canvas.height - 34;
    dinoRef.current.draw(ctx, canvas.height);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOverState(false);
    isPlayingRef.current = true;
    scoreRef.current = 0;
    gameSpeedRef.current = 4.5;
    obstaclesRef.current = [];
    nextObstacleTimerRef.current = 0;

    const canvas = canvasRef.current;
    if (canvas) {
      dinoRef.current.y = canvas.height - 34;
      dinoRef.current.vy = 0;
    }

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    runGameLoop();
  };

  const gameOver = () => {
    setIsPlaying(false);
    setGameOverState(true);
    isPlayingRef.current = false;

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    const currentScore = scoreRef.current;
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem('dino-highscore', String(currentScore));
      if (highscoreSpanRef.current) {
        highscoreSpanRef.current.textContent = String(currentScore).padStart(5, '0');
      }
    }
  };

  const runGameLoop = () => {
    if (!isPlayingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Ground Level
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 6);
    ctx.lineTo(canvas.width, canvas.height - 6);
    ctx.stroke();

    // Dino Update
    dinoRef.current.update(gravity, canvas.height);
    dinoRef.current.draw(ctx, canvas.height);

    // Obstacle Logic
    if (nextObstacleTimerRef.current <= 0) {
      obstaclesRef.current.push(new Cactus(canvas.width, canvas.height));
      nextObstacleTimerRef.current = Math.random() * 45 + 50;
    } else {
      nextObstacleTimerRef.current--;
    }

    const obstacles = obstaclesRef.current;
    const dino = dinoRef.current;

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.update(gameSpeedRef.current);
      obs.draw(ctx);

      // Hitbox Collision Check (AABB)
      if (
        dino.x < obs.x + obs.width &&
        dino.x + dino.width > obs.x &&
        dino.y < obs.y + obs.height &&
        dino.y + dino.height > obs.y
      ) {
        gameOver();
        return;
      }

      // Remove offscreen
      if (obs.x + obs.width < 0) {
        obstacles.splice(i, 1);
      }
    }

    // Score Progression
    scoreRef.current++;
    if (scoreSpanRef.current) {
      scoreSpanRef.current.textContent = String(scoreRef.current).padStart(5, '0');
    }

    // Speed progression
    if (scoreRef.current % 400 === 0 && gameSpeedRef.current < 10) {
      gameSpeedRef.current += 0.5;
    }

    animationIdRef.current = requestAnimationFrame(runGameLoop);
  };

  const triggerJumpAction = () => {
    if (!isPlayingRef.current) {
      startGame();
    } else {
      dinoRef.current.jump();
    }
  };

  useEffect(() => {
    // Canvas setup on mount or screen change
    drawInitialState();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerJumpAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [highScore]);

  const handleStageMouseDown = () => {
    triggerJumpAction();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    triggerJumpAction();
  };

  const handleMobileButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerJumpAction();
  };

  return (
    <section id="arcade-game" className="py-16 relative overflow-hidden bg-gray-950 border-t border-white border-opacity-5">
      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 fade-in visible">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            OFFLINE <span className="gradient-text">ARCADE STATION</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Need a break? Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700 text-white font-mono">SPACE</kbd> or tap the screen to jump!
          </p>
        </div>

        {/* Arcade Machine Wrapper */}
        <div className="max-w-2xl mx-auto bg-[#16213e] rounded-2xl border border-white border-opacity-5 p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] fade-in visible">
          
          {/* Console Top Info Bar */}
          <div className="flex justify-between items-center mb-4 font-mono text-xs border-b border-white border-opacity-5 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-bold uppercase text-gray-300">
                SCORE: <span ref={scoreSpanRef} className="text-cyan-400 font-black">00000</span>
              </span>
            </div>
            <div className="text-gray-500 font-bold uppercase">
              HI-SCORE: <span ref={highscoreSpanRef} className="text-purple-400">00000</span>
            </div>
          </div>

          {/* Main Canvas Stage */}
          <div
            onClick={handleStageMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full bg-[#0d1117] rounded-xl border border-gray-800 overflow-hidden select-none touch-none h-[180px] cursor-pointer"
            id="game-stage"
          >
            <canvas ref={canvasRef} width="600" height="150" className="w-full h-full block" />

            {/* Start / Game Over Overlay Menu */}
            {(!isPlaying || gameOverState) && (
              <div id="game-overlay" className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300">
                <div id="overlay-icon" className="text-3xl text-cyan-400 mb-2 animate-bounce">
                  <i className="fas fa-gamepad"></i>
                </div>
                <h3 id="overlay-title" className="text-sm font-black text-white uppercase tracking-wider font-mono">
                  {gameOverState ? 'GAME OVER' : 'PRESS SPACE TO PLAY'}
                </h3>
                <p id="overlay-desc" className="text-[10px] text-gray-500 font-mono mt-0.5">
                  {gameOverState ? 'Press SPACE or TAP to retry' : 'or click inside this box'}
                </p>
              </div>
            )}
          </div>

          {/* Mobile Controls Helper */}
          {!isPlaying && (
            <div className="sm:hidden mt-4">
              <button
                onClick={handleMobileButtonClick}
                className="w-full py-3 bg-[#1a1a2e] border border-cyan-500/30 text-cyan-400 rounded-xl font-bold font-mono active:scale-95 transition-all text-xs"
              >
                <i className="fas fa-arrow-up mr-1"></i> TAP TO PLAY <i className="fas fa-arrow-up ml-1"></i>
              </button>
            </div>
          )}
          {isPlaying && (
            <div className="sm:hidden mt-4">
              <button
                onClick={handleMobileButtonClick}
                className="w-full py-3 bg-[#1a1a2e] border border-cyan-500/30 text-cyan-400 rounded-xl font-bold font-mono active:scale-95 transition-all text-xs"
              >
                <i className="fas fa-arrow-up mr-1"></i> TAP TO JUMP <i className="fas fa-arrow-up ml-1"></i>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default DinoGame;
