"use client"

import { useEffect } from 'react';

import { GLOBAL_CSS } from '@/styles';

export function useStyles() {
  useEffect(() => {
    if (document.getElementById("ap3-g")) return;
    const l1 = document.createElement("link");
    l1.rel = "stylesheet";
    l1.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(l1);
    const l2 = document.createElement("link");
    l2.rel = "stylesheet";
    l2.href =
      "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css";
    document.head.appendChild(l2);
    const s = document.createElement("style");
    s.id = "ap3-g";
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
  }, []);
}