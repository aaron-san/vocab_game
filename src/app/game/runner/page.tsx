"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Constants
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 40;
const BOX_WIDTH = 30;
const BOX_HEIGHT = 30;
const GROUND_Y = 320;
const JUMP_VELOCITY = -80;
const GRAVITY = 20;
const SPEED = 6;
const TERMINAL_VELOCITY = 30;

const COYOTE_TIME = 8;
const JUMP_BUFFER_TIME = 6;

interface Box {
  x: number;
  y: number;
  letter: string;
  hit: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

interface ScorePopup {
  id: number;
  x: number;
  y: number;
}

const letterColors: Record<string, string> = {
  A: "bg-red-400",
  B: "bg-blue-400",
  C: "bg-green-400",
  D: "bg-purple-400",
  E: "bg-pink-400",
};

let particleId = 0;
let popupId = 0;

export default function TypingGame() {
  const [playerX, setPlayerX] = useState(200);
  const [playerY, setPlayerY] = useState(GROUND_Y);
  const [velocityY, setVelocityY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [popups, setPopups] = useState<ScorePopup[]>([]);
  const [coyoteTimer, setCoyoteTimer] = useState(0);
  const [jumpBuffer, setJumpBuffer] = useState(0);

  const focusRef = useRef<HTMLButtonElement>(null);

  const platforms = [
    { x: 500, y: 250 },
    { x: 800, y: 220 },
    { x: 1200, y: 210 },
  ];

  const initialBoxes = [
    { x: 300, y: 250, letter: "A", hit: false },
    { x: 400, y: 240, letter: "B", hit: false },
    { x: 500, y: 120, letter: "C", hit: false },
    { x: 600, y: 250, letter: "D", hit: false },
    { x: 700, y: 240, letter: "E", hit: false },
    { x: 800, y: 260, letter: "F", hit: false },
    { x: 900, y: 220, letter: "G", hit: false },
    { x: 1000, y: 270, letter: "H", hit: false },
    { x: 1100, y: 260, letter: "I", hit: false },
  ];

  const [boxes, setBoxes] = useState<Box[]>(initialBoxes);

  function handleStart() {
    setIsRunning(true);
    setScrollOffset(0);
    setPlayerX(100);
    setPlayerY(GROUND_Y);
    setVelocityY(0);
    setIsJumping(false);
    setScore(0);
    setParticles([]);
    setPopups([]);
    setBoxes(initialBoxes);
    focusRef.current?.focus();
  }

  function handleRestart() {
    setIsRunning(false);
    setScrollOffset(0);
    setPlayerX(100);
    setPlayerY(GROUND_Y);
    setVelocityY(0);
    setIsJumping(false);
    setScore(0);
    setParticles([]);
    setPopups([]);
  }

  function spawnParticles(x: number, y: number, letter: string) {
    const color = letterColors[letter] || "bg-yellow-300";
    const burst = Array.from({ length: 10 }).map(() => ({
      id: particleId++,
      x: x - scrollOffset,
      y,
      offsetX: Math.random() * 40 - 20,
      offsetY: Math.random() * -40,
      color,
    }));
    setParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !burst.includes(p)));
    }, 500);
  }

  function showPopup(x: number, y: number) {
    const popup = { id: popupId++, x: x - scrollOffset, y };
    setPopups((prev) => [...prev, popup]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popup.id));
    }, 800);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setJumpBuffer(JUMP_BUFFER_TIME);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const loop = setInterval(() => {
      setPlayerX((x) => x + SPEED);
      setScrollOffset((s) => s + SPEED);

      setPlayerY((y) => {
        const newPlayerX = playerX + SPEED;
        let newY = y + velocityY;
        let newVelY = velocityY + GRAVITY;
        let landed = false;

        for (const plat of platforms) {
          const platLeft = plat.x;
          const platRight = plat.x + 96;
          const platTop = plat.y;

          const playerLeft = newPlayerX;
          const playerRight = newPlayerX + PLAYER_WIDTH;
          const playerBottom = newY + PLAYER_HEIGHT;
          const prevPlayerBottom = y + PLAYER_HEIGHT;

          const isLanding =
            newVelY > 0 &&
            prevPlayerBottom <= platTop &&
            playerBottom >= platTop &&
            playerRight > platLeft &&
            playerLeft < platRight;

          if (isLanding) {
            newY = platTop - PLAYER_HEIGHT;
            newVelY = 0;
            landed = true;
            setIsJumping(false);
            break;
          }
        }

        if (newY > GROUND_Y) {
          newY = GROUND_Y;
          newVelY = 0;
          landed = true;
          setIsJumping(false);
        }

        setCoyoteTimer(landed ? COYOTE_TIME : Math.max(coyoteTimer - 1, 0));

        if (
          jumpBuffer > 0 &&
          (coyoteTimer > 0 || newY === GROUND_Y) &&
          !isJumping
        ) {
          newVelY = JUMP_VELOCITY;
          setIsJumping(true);
          setJumpBuffer(0);
        }

        newVelY = Math.min(newVelY, TERMINAL_VELOCITY);
        setVelocityY(newVelY);
        return newY;
      });

      const hits: Box[] = [];

      setBoxes((prev) =>
        prev.map((box) => {
          const isHit =
            !box.hit &&
            playerX + PLAYER_WIDTH > box.x &&
            playerX < box.x + BOX_WIDTH &&
            playerY + PLAYER_HEIGHT > box.y &&
            playerY < box.y + BOX_HEIGHT;

          if (isHit) hits.push(box);
          return { ...box, hit: box.hit || isHit };
        })
      );

      hits.forEach((box) => {
        setScore((s) => s + 1);
        spawnParticles(box.x, box.y, box.letter);
        showPopup(box.x, box.y - 20);
      });

      setJumpBuffer((j) => Math.max(j - 1, 0));
    }, 20);

    return () => clearInterval(loop);
  }, [velocityY, playerX, playerY, isRunning, coyoteTimer, jumpBuffer]);

  return (
    <div className="relative bg-gradient-to-b from-blue-100 to-blue-300 shadow-lg mx-auto mt-12 rounded-lg w-full max-w-[800px] h-[400px] overflow-hidden">
      {!isRunning && (
        <button
          ref={focusRef}
          onClick={handleStart}
          className="top-4 left-4 absolute bg-yellow-500 shadow px-4 py-2 rounded outline-none font-bold text-white"
        >
          Start
        </button>
      )}
      {isRunning && (
        <button
          onClick={handleRestart}
          className="top-4 left-4 absolute bg-red-500 shadow px-4 py-2 rounded font-bold text-white"
        >
          Restart
        </button>
      )}

      <div className="top-4 right-4 absolute font-bold text-white text-xl">
        Score: {score}
      </div>

      {isRunning && (
        <motion.div
          animate={{
            scaleY: isJumping ? 2 : 1,
            scaleX: isJumping ? 0.8 : 1,
            borderRadius: isJumping ? "50% 50% 0 0" : "50%",
          }}
          transition={{ duration: 0.1 }}
          className="absolute bg-emerald-500 shadow-lg w-[40px] h-[50px]"
          style={{ left: playerX - scrollOffset, top: playerY }}
        />
      )}

      {boxes.map((box, i) =>
        box.hit ? (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute w-[${BOX_WIDTH}px] h-[${BOX_HEIGHT}px] rounded ${
              letterColors[box.letter] || "bg-yellow-400"
            }`}
            style={{ left: box.x - scrollOffset, top: box.y }}
          />
        ) : (
          <div
            key={i}
            className="absolute bg-yellow-400 rounded w-[40px] h-[40px] font-bold text-white text-center leading-[40px]"
            style={{ left: box.x - scrollOffset, top: box.y }}
          >
            {box.letter}
            {/* Coordinate label */}
            <div className="-bottom-5 left-1 z-10 absolute bg-white shadow px-1 rounded text-[10px] text-black">
              x:{box.x}, y:{box.y}
            </div>
          </div>
        )
      )}

      {platforms.map((plat, i) => (
        <div
          key={i}
          className="absolute bg-green-600 shadow-md rounded w-24 h-4"
          style={{ left: plat.x - scrollOffset, top: plat.y }}
        />
      ))}

      <div className="bottom-0 absolute bg-green-800 w-full h-8" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
          className={`absolute rounded-full w-2 h-2 ${p.color}`}
          style={{
            left: p.x + p.offsetX,
            top: p.y + p.offsetY,
          }}
        />
      ))}

      {popups.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="absolute font-bold text-white text-sm pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
          }}
        >
          +1
        </motion.div>
      ))}
    </div>
  );
}
