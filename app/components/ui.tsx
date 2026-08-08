"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function Button({ children, className = "", ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} className={`game-button ${className}`} {...props}>{children}</motion.button>;
}

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <motion.section whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className={`game-card ${className}`}>{children}</motion.section>;
}

export function Badge({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <span className={`badge ${className}`}>{children}</span>;
}
