import React from "react";
import { motion } from "framer-motion";

type PlayerProps = { y: number };

const PLAYER_SIZE = 40;

export const Player: React.FC<PlayerProps> = ({ y }) => (
  <motion.div
    className="absolute bg-yellow-400 rounded-full"
    style={{
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      left: 40,
      top: y,
    }}
    layout
    transition={{ type: "spring", damping: 20, stiffness: 150 }}
  />
);