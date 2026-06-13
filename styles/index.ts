export const GLOBAL_CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  @keyframes ap3-blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes ap3-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @keyframes ap3-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
  @keyframes ap3-ripple{0%{transform:scale(0);opacity:0.5}100%{transform:scale(4);opacity:0}}
  @keyframes ap3-scanline{0%{top:-20%}100%{top:110%}}
  @keyframes ap3-dot-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}
  @keyframes ap3-shimmer{0%{background-position:200% center}100%{background-position:-200% center}}

  /* reveal / stagger */
  .ap3-in{animation:ap3-in 0.5s cubic-bezier(0.16,1,0.3,1) both}
  .ap3-stagger{opacity:0;transform:translateY(22px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
  .ap3-stagger.ap3-visible{opacity:1;transform:none}
  .ap3-reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1),transform 0.8s cubic-bezier(0.16,1,0.3,1)}
  .ap3-reveal.ap3-visible{opacity:1;transform:none}

  /* press */
  .ap3-press{transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s ease,background 0.2s ease,border-color 0.2s ease,color 0.2s ease}
  .ap3-press:hover{transform:translateY(-1px)}
  .ap3-press:active{transform:translateY(0) scale(0.97)}

  /* underline link */
  .ap3-link{position:relative;text-decoration:none}
  .ap3-link::after{content:"";position:absolute;left:0;right:100%;bottom:-1px;height:1px;background:currentColor;transition:right 0.3s cubic-bezier(0.16,1,0.3,1)}
  .ap3-link:hover::after{right:0}

  a:focus-visible,button:focus-visible,[role="button"]:focus-visible{outline:2px solid #3B82F6;outline-offset:3px}

  /* pill hover tint — theme-aware via parent class */
  .ap3-pill{transition:background 0.2s ease,border-color 0.2s ease,color 0.2s ease;cursor:default}
  .light .ap3-pill:hover{background:#F0F7FF;border-color:#A8CEFF;color:#0058CC}
  .dark  .ap3-pill:hover{background:#0C2D52;border-color:#3291FF;color:#52A8FF}

  /* craft card left-border reveal */
  .ap3-craft-card{position:relative;overflow:hidden;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),background 0.2s ease}
  .ap3-craft-card::before{content:"";position:absolute;inset:0;border-left:2px solid transparent;transition:border-color 0.25s ease;pointer-events:none}
  .ap3-craft-card:hover,.ap3-craft-card:focus-visible{transform:translateY(-2px)}
  .light .ap3-craft-card:hover::before,.light .ap3-craft-card:focus-visible::before{border-color:#0070F3}
  .dark  .ap3-craft-card:hover::before,.dark  .ap3-craft-card:focus-visible::before{border-color:#3291FF}

  /* work row bottom accent sweep */
  .ap3-work-row{position:relative}
  .ap3-work-row::after{content:"";position:absolute;bottom:0;left:0;width:0;height:2px;transition:width 0.35s cubic-bezier(0.16,1,0.3,1);pointer-events:none}
  .light .ap3-work-row::after{background:#0070F3}
  .dark  .ap3-work-row::after{background:#3291FF}
  .ap3-work-row:hover::after{width:100%}

  /* work chevron accent when open */
  .ap3-chevron-open{color:#3291FF !important}
  .light .ap3-chevron-open{color:#0070F3 !important}

  /* toggle track accent when dark */
  .ap3-toggle{transition:background 0.35s ease,border-color 0.35s ease}
  .light .ap3-toggle-on{background:#0070F3 !important;border-color:#0070F3 !important}
  .dark  .ap3-toggle-on{background:#3291FF !important;border-color:#3291FF !important}

  /*
   * WCAG 2.5.5: Toggle minimum touch target 44×44px.
   * The visible button stays 44×24px; the wrapper expands the hit area
   * by 10px on all sides via negative margin, keeping layout identical.
   */
  .ap3-toggle-wrap{display:inline-flex;align-items:center;padding:10px;margin:-10px}

  /* timeline row hover bg */
  .ap3-tl-row{position:relative;transition:background 0.2s ease,transform 0.25s cubic-bezier(0.16,1,0.3,1);border-radius:6px;margin:0 -12px;padding-left:12px;padding-right:12px}
  .light .ap3-tl-row:hover{background:#F5F5F5}
  .dark  .ap3-tl-row:hover{background:#0A0A0A}
  .ap3-tl-row:hover{transform:translateX(4px)}

  /* tag spring-pop */
  .ap3-tag-pop{transform:scale(0.85);opacity:0;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease;display:inline-block}
  .ap3-tag-pop.ap3-tag-on{transform:scale(1);opacity:1}

  /* ripple inside buttons */
  .ap3-ripple-host{position:relative;overflow:hidden}
  .ap3-ripple-el{position:absolute;border-radius:50%;width:60px;height:60px;margin:-30px 0 0 -30px;background:currentColor;animation:ap3-ripple 0.55s linear;pointer-events:none}

  /* "AP" logo magnetic spacing */
  .ap3-logo{transition:letter-spacing 0.3s cubic-bezier(0.34,1.56,0.64,1);cursor:default}
  .ap3-logo:hover{letter-spacing:0.18em}

  /* status dot pulse-on-hover */
  .ap3-dot{animation:ap3-blink 2.5s ease-in-out infinite}
  .ap3-dot-wrap:hover .ap3-dot{animation:ap3-dot-pulse 0.6s ease infinite}

  /* terminal scanline */
  .ap3-scanline{position:absolute;left:0;right:0;height:20px;pointer-events:none;opacity:0.04;animation:ap3-scanline 4s linear infinite}
  .light .ap3-scanline{background:linear-gradient(transparent,rgba(0,0,0,0.5),transparent)}
  .dark  .ap3-scanline{background:linear-gradient(transparent,rgba(255,255,255,0.8),transparent)}

  /* section label underline */
  .ap3-sec-label{position:relative;display:inline-block}
  .ap3-sec-label::after{content:"";position:absolute;left:0;bottom:-2px;width:0;height:1px;background:currentColor;transition:width 0.4s cubic-bezier(0.16,1,0.3,1)}
  .ap3-reveal.ap3-visible .ap3-sec-label::after{width:100%}

  /* name one-shot shimmer */
  .ap3-name{animation:ap3-rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s both}

  /* toast */
  .ap3-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(8px);padding:10px 20px;border-radius:6px;font-size:12px;letter-spacing:0.06em;font-family:'IBM Plex Mono',monospace;pointer-events:none;z-index:9999;white-space:nowrap;opacity:0;transition:opacity 0.25s ease,transform 0.3s cubic-bezier(0.34,1.56,0.64,1)}
  .ap3-toast.ap3-toast-show{opacity:1;transform:translateX(-50%) translateY(0)}
  .light .ap3-toast{background:#000;color:#fff}
  .dark  .ap3-toast{background:#fff;color:#000}

  @media (prefers-reduced-motion:reduce){
    .ap3-stagger,.ap3-reveal{transition:opacity 0.4s ease !important;transform:none !important}
    .ap3-in,.ap3-name{animation:none !important;opacity:1;-webkit-text-fill-color:inherit;color:inherit}
    .ap3-press,.ap3-press:hover,.ap3-press:active{transform:none !important}
    .ap3-logo:hover{letter-spacing:inherit !important}
    .ap3-work-row::after,.ap3-sec-label::after{transition:none !important}
    .ap3-tag-pop{transition:none !important}
    .ap3-scanline,.ap3-dot{animation:none !important}
    *{animation-duration:0.01ms !important}
  }
`;