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

  // States untuk Leaderboard & Input Nama
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>('');
  const [submittingScore, setSubmittingScore] = useState<boolean>(false);

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

  // Fetch Leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (data && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      }
    } catch (e) {
      console.error('Gagal memuat leaderboard:', e);
    }
  };

  // Submit Score
  const submitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setSubmittingScore(true);
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          score: scoreRef.current,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      }
    } catch (error) {
      console.error('Gagal mengirim skor:', error);
    } finally {
      setSubmittingScore(false);
      setShowNameInput(false);
      setNameInput('');
      setGameOverState(true);
    }
  };

  // Load highscore & leaderboard on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = parseInt(localStorage.getItem('dino-highscore') || '0');
      setHighScore(saved);
      if (highscoreSpanRef.current) {
        highscoreSpanRef.current.textContent = String(saved).padStart(5, '0');
      }
    }
    fetchLeaderboard();
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
    setShowNameInput(false);
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

    // Tampilkan modal input nama jika skor di atas 0
    if (currentScore > 0) {
      setShowNameInput(true);
    } else {
      setGameOverState(true);
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
    // Abaikan klik pemicu lompatan jika sedang input nama
    if (showNameInput) return;

    if (!isPlayingRef.current) {
      startGame();
    } else {
      dinoRef.current.jump();
    }
  };

  useEffect(() => {
    drawInitialState();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan shortcut keyboard lompatan jika sedang mengisi input nama
      if (showNameInput) return;

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
  }, [highScore, showNameInput]);

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

        {/* Arcade Machine Wrapper (Two-column layout on Desktop) */}
        <div className="max-w-4xl mx-auto bg-[#16213e] rounded-2xl border border-white border-opacity-5 p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] fade-in visible">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* COLUMN 1: Dino Canvas Game (8 Cols) */}
            <div className="md:col-span-8 flex flex-col justify-between">
              
              {/* Console Top Info Bar */}
              <div className="flex justify-between items-center mb-4 font-mono text-xs border-b border-white/5 pb-3">
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

                {/* Modal Input Inisial Nama (New Record) */}
                {showNameInput && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center p-4 z-30 cursor-default" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                    <div className="text-lg md:text-xl text-yellow-400 font-black mb-1 animate-pulse tracking-wide font-mono">
                      <i className="fas fa-star"></i> NEW RECORD! <i className="fas fa-star"></i>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono mb-3">
                      Your score: <span className="text-cyan-400 font-bold">{scoreRef.current}</span>. Enter 3-letter initials to save:
                    </p>
                    <form onSubmit={submitScore} className="flex flex-col items-center gap-3">
                      <input
                        type="text"
                        maxLength={3}
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                        placeholder="AAA"
                        required
                        disabled={submittingScore}
                        className="bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xl tracking-widest rounded-xl px-4 py-2 w-28 focus:outline-none focus:border-cyan-400"
                        autoFocus
                      />
                      <button
                        type="submit"
                        disabled={submittingScore || nameInput.trim().length === 0}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-gray-950 font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {submittingScore ? 'Saving...' : 'Submit Score'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Start / Game Over Overlay Menu */}
                {(!isPlaying && !showNameInput || gameOverState) && (
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
              {!isPlaying && !showNameInput && (
                <div className="sm:hidden mt-4">
                  <button
                    onClick={handleMobileButtonClick}
                    className="w-full py-3 bg-[#1a1a2e] border border-cyan-500/30 text-cyan-400 rounded-xl font-bold font-mono active:scale-95 transition-all text-xs"
                  >
                    <i className="fas fa-arrow-up mr-1"></i> TAP TO PLAY <i className="fas fa-arrow-up ml-1"></i>
                  </button>
                </div>
              )}
              {isPlaying && !showNameInput && (
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

            {/* COLUMN 2: Leaderboard Panel (4 Cols) */}
            <div className="md:col-span-4 flex flex-col bg-[#0d1117] rounded-xl border border-gray-800 p-4 font-mono text-xs text-gray-300 min-h-[180px] md:min-h-0 justify-between mt-4 md:mt-0">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] md:text-xs">
                    <i className="fas fa-trophy mr-1 text-[10px] md:text-xs text-yellow-500"></i> TOP RACERS
                  </span>
                  <span className="text-gray-500 font-bold text-[9px] md:text-[10px]">ALL TIME</span>
                </div>
                
                <div className="space-y-2">
                  {leaderboard.length === 0 ? (
                    <div className="text-gray-600 text-center py-8">Loading records...</div>
                  ) : (
                    leaderboard.map((entry, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-4 text-center font-black ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-gray-600'}`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-white tracking-widest">{entry.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 font-bold font-mono">{String(entry.score).padStart(5, '0')}</span>
                          <span className="text-[9px] text-gray-600">{entry.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-[9px] text-gray-600 text-center pt-2 mt-2 border-t border-white/5 font-mono uppercase">
                Offline Arcade Station v2.0
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DinoGame;
