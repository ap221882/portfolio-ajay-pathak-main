"use client";

import React, { useRef } from 'react';

import { motion } from 'motion/react';

import { useFollowPointer } from '../../hooks/useFollowPointer';

type Props = {}


const ball = {
  width: 100,
  height: 100,
  backgroundColor: "red",
  borderRadius: "50%",
}

const Pointer = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useFollowPointer(ref)
  return (
    <motion.div ref={ref} style={{ ...ball, x, y }} />
  )
}

export default Pointer