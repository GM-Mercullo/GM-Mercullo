import React, { useState } from 'react';
import { audioFx } from '../../utils/audioFx';
import { triggerLibrarySparks } from '../../utils/magicFx';
import { Sparkles, Trophy, Coins, Feather, EyeOff, Flame } from 'lucide-react';

interface MagicalCreaturesProps {
  currentTheme: 'light' | 'dark';
}

export const MagicalCreatures: React.FC<MagicalCreaturesProps> = ({ currentTheme }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    return localStorage.getItem('gm_creatures_visible') !== 'false';
  });

  // Interactive interaction states
  const [nifflerCoins, setNifflerCoins] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<{ text: string; icon?: string; type?: string } | null>(null);
  const [snitchCatchCount, setSnitchCatchCount] = useState<number>(0);
  const [hippogriffBowing, setHippogriffBowing] = useState<boolean>(false);
  const [otterSpinning, setOtterSpinning] = useState<boolean>(false);
  const [pygmyBouncing, setPygmyBouncing] = useState<boolean>(false);

  const showToast = (text: string, icon: string = '✨', type: string = 'info') => {
    setToastMessage({ text, icon, type });
    setTimeout(() => setToastMessage(null), 4200);
  };

  const toggleVisibility = () => {
    const next = !isVisible;
    setIsVisible(next);
    localStorage.setItem('gm_creatures_visible', next ? 'true' : 'false');
    if (next) {
      audioFx.playLumos();
    }
  };

  // Interactions: Light Mode
  const handleNifflerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playCoinChime();
    setNifflerCoins((prev) => prev + 1);
    showToast('The Niffler slipped a gleaming gold Galleon from the repository!', '🪙', 'gold');
    triggerLibrarySparks({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  };

  const handleOwlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playOwlHoot();
    showToast('Hedwig delivered a parchment note: "Verified codebases require steady hands."', '📜', 'parchment');
    triggerLibrarySparks({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  };

  const handleBowtruckleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPaperRustle();
    showToast('Pickett the Bowtruckle waves his twig arms: "Protecting the Git branches!"', '🌿', 'nature');
  };

  const handleHippogriffClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playHippogriffCry();
    setHippogriffBowing(true);
    showToast('You maintained eye contact and bowed. Buckbeak bows back with regal pride!', '🦅', 'regal');
    setTimeout(() => setHippogriffBowing(false), 3000);
  };

  const handlePhoenixClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPhoenixSong();
    showToast('Fawkes sings an uplifting song of rebirth & perseverance!', '🔥', 'phoenix');
    triggerLibrarySparks({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  };

  const handleKneazleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPaperRustle();
    showToast('Crookshanks investigates the perimeter — no suspicious Muggle anomalies found.', '🐾', 'cat');
  };

  const handlePygmyPuffClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPygmyPuff();
    setPygmyBouncing(true);
    showToast('The Pygmy Puff squeaks delightfully and purrs on your cursor!', '🌸', 'cute');
    setTimeout(() => setPygmyBouncing(false), 1500);
  };

  const handleMemoBirdClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPaperRustle();
    showToast('Ministry Origami Memo: "Packet inspection approved for NetworkLabApp."', '✉️', 'memo');
  };

  // Interactions: Dark Mode
  const handlePatronusStagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPatronusChord();
    showToast('EXPECTO PATRONUM! A radiant silver stag dispels the midnight gloom.', '🦌', 'patronus');
    triggerLibrarySparks({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  };

  const handleSnitchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playSnitchCatch();
    setSnitchCatchCount((prev) => prev + 1);
    showToast('⚡ 150 POINTS TO GRYFFINDOR! You caught the Golden Snitch!', '🏆', 'snitch');
    triggerLibrarySparks({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  };

  const handleDragonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playDragonRoar();
    showToast('The Hungarian Horntail roars, banking through the midnight clouds!', '🐉', 'dragon');
  };

  const handleOtterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playPatronusChord();
    setOtterSpinning(true);
    showToast('Hermione’s Patronus Otter somersaults playfully through the air!', '🦦', 'patronus');
    setTimeout(() => setOtterSpinning(false), 2000);
  };

  const handleAshwinderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playIncendio();
    showToast('The Ashwinder leaves a trail of fiery sparks across the parchment border.', '🐍', 'fire');
  };

  const handleMooncalfClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioFx.playLumos();
    showToast('A shy Mooncalf gazes upward with luminous sapphire eyes.', '🌕', 'moon');
  };

  return (
    <>
      <style>{`
        /* ================= KEYFRAME ANIMATIONS ================= */
        
        /* 1. Niffler Walk & Sniff */
        @keyframes nifflerPath {
          0% { transform: translateX(-160px) scaleX(1); }
          46% { transform: translateX(calc(100vw + 60px)) scaleX(1); }
          50% { transform: translateX(calc(100vw + 60px)) scaleX(-1); }
          96% { transform: translateX(-160px) scaleX(-1); }
          100% { transform: translateX(-160px) scaleX(1); }
        }
        @keyframes nifflerGait {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-3deg); }
          50% { transform: translateY(0) rotate(1deg); }
          75% { transform: translateY(-4px) rotate(3deg); }
        }

        /* 2. Snowy Owl Flight */
        @keyframes owlFlightPath {
          0% { transform: translate(-180px, 0) scale(0.9); }
          50% { transform: translate(50vw, 35px) scale(1); }
          100% { transform: translate(calc(100vw + 180px), -15px) scale(0.9); }
        }
        @keyframes owlWingBeat {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.4) rotate(4deg); }
        }

        /* 3. Bowtruckle Sway */
        @keyframes bowtruckleSwayReal {
          0%, 100% { transform: rotate(0deg) skewX(0deg); }
          30% { transform: rotate(5deg) skewX(2deg); }
          70% { transform: rotate(-4deg) skewX(-2deg); }
        }

        /* 4. Hippogriff Flight */
        @keyframes hippogriffSwoop {
          0% { transform: translate(calc(100vw + 260px), 80px) scale(0.95); }
          45% { transform: translate(50vw, 130px) scale(1.05); }
          100% { transform: translate(-260px, 60px) scale(0.9); }
        }
        @keyframes hippogriffWings {
          0%, 100% { transform: rotate(0deg) scaleY(1); }
          50% { transform: rotate(-8deg) scaleY(0.55); }
        }

        /* 5. Phoenix Fawkes Flight & Flame Motes */
        @keyframes phoenixDrift {
          0% { transform: translate(-220px, 120px) scale(0.9); }
          30% { transform: translate(30vw, 70px) scale(1); }
          70% { transform: translate(70vw, 130px) scale(0.98); }
          100% { transform: translate(calc(100vw + 220px), 90px) scale(0.9); }
        }
        @keyframes phoenixTailWave {
          0%, 100% { transform: rotate(0deg) scaleX(1); }
          50% { transform: rotate(6deg) scaleX(0.92); }
        }

        /* 6. Kneazle Prowl */
        @keyframes kneazleProwl {
          0% { transform: translateX(calc(100vw + 100px)) scaleX(-1); }
          48% { transform: translateX(-120px) scaleX(-1); }
          52% { transform: translateX(-120px) scaleX(1); }
          98% { transform: translateX(calc(100vw + 100px)) scaleX(1); }
          100% { transform: translateX(calc(100vw + 100px)) scaleX(-1); }
        }
        @keyframes kneazleTail {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(18deg); }
        }

        /* 7. Pygmy Puff Roll & Bounce */
        @keyframes pygmyRoll {
          0% { transform: translateX(10vw) rotate(0deg); }
          50% { transform: translateX(45vw) rotate(360deg); }
          100% { transform: translateX(10vw) rotate(0deg); }
        }

        /* 8. Origami Memo Flutter */
        @keyframes memoFlutter {
          0% { transform: translate(-100px, 180px) rotate(15deg); }
          25% { transform: translate(25vw, 120px) rotate(-10deg); }
          50% { transform: translate(55vw, 210px) rotate(12deg); }
          75% { transform: translate(80vw, 140px) rotate(-8deg); }
          100% { transform: translate(calc(100vw + 120px), 190px) rotate(10deg); }
        }
        @keyframes memoWing {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }

        /* ================= DARK MODE ANIMATIONS ================= */

        /* 1. Patronus Stag (Prongs) */
        @keyframes patronusStride {
          0% { transform: translateX(-280px) scale(0.92); opacity: 0.15; }
          15% { opacity: 0.9; }
          50% { transform: translateX(50vw) translateY(-20px) scale(1); opacity: 0.98; }
          85% { opacity: 0.9; }
          100% { transform: translateX(calc(100vw + 280px)) translateY(10px) scale(0.92); opacity: 0.1; }
        }
        @keyframes stagGallop {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-3deg); }
          50% { transform: translateY(-2px) rotate(2deg); }
          75% { transform: translateY(-12px) rotate(-1deg); }
        }

        /* 2. Golden Snitch */
        @keyframes snitchPath {
          0% { transform: translate(12vw, 22vh); }
          20% { transform: translate(82vw, 14vh); }
          40% { transform: translate(88vw, 68vh); }
          60% { transform: translate(28vw, 78vh); }
          80% { transform: translate(18vw, 38vh); }
          100% { transform: translate(12vw, 22vh); }
        }
        @keyframes snitchWingVibrate {
          0%, 100% { transform: scaleY(1) rotate(18deg); }
          50% { transform: scaleY(-0.85) rotate(-22deg); }
        }

        /* 3. Thestral High Glide */
        @keyframes thestralHighPath {
          0% { transform: translate(calc(100vw + 240px), 40px) scale(0.8); opacity: 0.25; }
          50% { transform: translate(50vw, 70px) scale(0.9); opacity: 0.55; }
          100% { transform: translate(-240px, 30px) scale(0.8); opacity: 0.2; }
        }

        /* 4. Hungarian Horntail Dragon */
        @keyframes dragonSwoop {
          0% { transform: translate(-350px, 90px) scale(0.75); opacity: 0.3; }
          45% { transform: translate(45vw, 160px) scale(1); opacity: 0.85; }
          100% { transform: translate(calc(100vw + 350px), 60px) scale(0.75); opacity: 0.25; }
        }
        @keyframes dragonWingBeat {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.4) rotate(-5deg); }
        }

        /* 5. Patronus Otter */
        @keyframes otterSwimPath {
          0% { transform: translate(calc(100vw + 160px), 55vh); }
          25% { transform: translate(75vw, 45vh) rotate(-15deg); }
          50% { transform: translate(45vw, 60vh) rotate(15deg); }
          75% { transform: translate(20vw, 48vh) rotate(-10deg); }
          100% { transform: translate(-180px, 58vh); }
        }
        @keyframes otterSineWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        /* 6. Ashwinder Fire Serpent */
        @keyframes ashwinderSlither {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes ashwinderBodyWave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.75) skewX(6deg); }
        }

        /* 7. Mooncalf Dance */
        @keyframes mooncalfGentleStep {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(4deg) translateY(-4px); }
          75% { transform: rotate(-4deg) translateY(-2px); }
        }

        /* 8. Distant Dementor Mist */
        @keyframes dementorFloat {
          0% { transform: translate(85vw, 15vh); opacity: 0.2; }
          50% { transform: translate(78vw, 22vh); opacity: 0.45; }
          100% { transform: translate(85vw, 15vh); opacity: 0.2; }
        }
      `}</style>

      {/* Floating Toggle & Status Pill (Bottom-left) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 select-none print:hidden">
        <button
          onClick={toggleVisibility}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading font-medium tracking-wide transition-all shadow-lg backdrop-blur-md border ${
            isVisible
              ? 'bg-[#E8D9AE]/95 dark:bg-[#111D2B]/95 text-[#302B22] dark:text-[#C5A66A] border-[#B49A62]/60 dark:border-[#C5A66A]/40 hover:scale-105'
              : 'bg-black/75 text-white/70 border-white/20 hover:text-white'
          }`}
          title={isVisible ? 'Put magical creatures to sleep' : 'Awaken wandering creatures'}
        >
          {isVisible ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#B49A62] animate-pulse" />
              <span>Magical Creatures (8 Active)</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Awaken Creatures</span>
            </>
          )}
        </button>

        {isVisible && nifflerCoins > 0 && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-amber-500/20 border border-amber-500/40 text-amber-900 dark:text-amber-200 font-serif shadow">
            <Coins className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
            <span>{nifflerCoins} Galleon{nifflerCoins > 1 ? 's' : ''}</span>
          </div>
        )}

        {isVisible && snitchCatchCount > 0 && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-yellow-500/20 border border-yellow-500/40 text-yellow-900 dark:text-yellow-200 font-serif shadow">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>+{snitchCatchCount * 150} pts</span>
          </div>
        )}
      </div>

      {/* Interactive Creature Announcement Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-md w-[90%] sm:w-auto px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border-2 font-serif text-xs sm:text-sm flex items-center gap-3 animate-bounce bg-[#F7EED4] dark:bg-[#111D2B] text-[#302B22] dark:text-[#F0E8D5] border-[#B49A62] dark:border-[#C5A66A]">
          <span className="text-xl sm:text-2xl">{toastMessage.icon}</span>
          <span className="font-heading font-medium tracking-wide">{toastMessage.text}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MAGICAL CREATURES CANVAS (pointer-events: none, SVGs: pointer-events: auto) */}
      {/* ==================================================================== */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">

          {/* ================================================================ */}
          {/* MODE 1: THE ENCHANTED LIBRARY (LIGHT THEME - 8 CREATURES)        */}
          {/* ================================================================ */}
          {currentTheme === 'light' && (
            <>
              {/* 1. REALISTIC NIFFLER (Ground scavenger waddling with shiny coin) */}
              <div 
                className="absolute bottom-2 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'nifflerPath 48s linear infinite' }}
                onClick={handleNifflerClick}
                title="The Mischievous Niffler. Click him to collect Galleons!"
              >
                <div style={{ animation: 'nifflerGait 0.55s ease-in-out infinite' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#302B22] text-[#F4E9C8] text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                    Niffler sniffing for shiny code... (Click)
                  </div>

                  <svg width="78" height="52" viewBox="0 0 110 75" fill="none" className="filter drop-shadow-md hover:scale-110 transition-transform">
                    {/* Plush fur gradients */}
                    <defs>
                      <radialGradient id="nifflerFur" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#4A3428" />
                        <stop offset="65%" stopColor="#2E1F17" />
                        <stop offset="100%" stopColor="#1B120D" />
                      </radialGradient>
                      <linearGradient id="nifflerBeak" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E0A97E" />
                        <stop offset="100%" stopColor="#A8683E" />
                      </linearGradient>
                      <radialGradient id="goldCoinShine" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#FEF08A" />
                        <stop offset="50%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#B45309" />
                      </radialGradient>
                    </defs>

                    {/* Body Silhouette */}
                    <ellipse cx="52" cy="42" rx="38" ry="26" fill="url(#nifflerFur)" />
                    {/* Fur layers / shading */}
                    <ellipse cx="46" cy="38" rx="32" ry="20" fill="#3D291F" opacity="0.6" />
                    
                    {/* Claws & Paws */}
                    <path d="M28 62 C26 68 34 70 38 64 Z" fill="#C28758" stroke="#7A441E" strokeWidth="1" />
                    <path d="M64 62 C62 68 70 70 74 64 Z" fill="#C28758" stroke="#7A441E" strokeWidth="1" />

                    {/* Long Duck-billed Snout */}
                    <path d="M82 38 C96 38 108 42 106 48 C104 54 90 52 80 49 Z" fill="url(#nifflerBeak)" stroke="#7A441E" strokeWidth="1.2" />
                    <circle cx="98" cy="44" r="1.5" fill="#4A2A14" />

                    {/* Dark Glistening Eye */}
                    <circle cx="76" cy="30" r="4.5" fill="#0F0906" />
                    <circle cx="77.5" cy="28.5" r="1.6" fill="#FFFFFF" />

                    {/* Marsupial Pouch with Peeking Gold Galleon */}
                    <path d="M42 42 Q52 54 62 42 Z" fill="#150D08" />
                    <circle cx="52" cy="44" r="7" fill="url(#goldCoinShine)" stroke="#92400E" strokeWidth="1" />
                    <text x="49" y="47" fontSize="8" fill="#78350F" fontWeight="bold">G</text>
                  </svg>
                </div>
              </div>

              {/* 2. REALISTIC SNOWY POST OWL (Hedwig gliding with wing layers) */}
              <div 
                className="absolute top-14 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'owlFlightPath 36s ease-in-out infinite' }}
                onClick={handleOwlClick}
                title="Hedwig the Snowy Owl carrying an official parchment dispatch."
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#302B22] text-[#F4E9C8] text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                  Hedwig with Owl Post (Click)
                </div>

                <svg width="86" height="58" viewBox="0 0 110 75" fill="none" className="filter drop-shadow-lg hover:scale-115 transition-transform">
                  <g style={{ transformOrigin: '55px 30px', animation: 'owlWingBeat 0.4s ease-in-out infinite' }}>
                    {/* Layered Primary & Secondary Feathers */}
                    <path d="M12 25 C26 5 50 16 58 32 C38 30 22 34 12 25 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
                    <path d="M98 25 C84 5 60 16 52 32 C72 30 88 34 98 25 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                  </g>

                  {/* Body & Plumage Speckles */}
                  <ellipse cx="55" cy="38" rx="16" ry="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                  <circle cx="51" cy="32" r="1.2" fill="#64748B" />
                  <circle cx="59" cy="35" r="1.4" fill="#64748B" />
                  <circle cx="53" cy="42" r="1.2" fill="#64748B" />
                  <circle cx="57" cy="45" r="1.3" fill="#64748B" />

                  {/* Head & Amber Eyes */}
                  <circle cx="55" cy="22" r="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                  <circle cx="50" cy="21" r="3.5" fill="#F59E0B" />
                  <circle cx="50" cy="21" r="2" fill="#0F172A" />
                  <circle cx="60" cy="21" r="3.5" fill="#F59E0B" />
                  <circle cx="60" cy="21" r="2" fill="#0F172A" />
                  <path d="M54 24 L56 24 L55 28 Z" fill="#334155" />

                  {/* Gripping Talons & Sealed Parchment Envelope */}
                  <rect x="46" y="52" width="18" height="12" rx="1.5" fill="#F5E8C7" stroke="#B49A62" strokeWidth="1" />
                  <path d="M46 52 L55 58 L64 52" stroke="#B49A62" strokeWidth="0.8" fill="none" />
                  <circle cx="55" cy="57" r="2.4" fill="#702C38" />
                </svg>
              </div>

              {/* 3. REALISTIC BOWTRUCKLE (Pickett - Branch bark texture & leafy head) */}
              <div 
                className="absolute bottom-2 right-4 pointer-events-auto cursor-pointer group"
                onClick={handleBowtruckleClick}
                title="Pickett the Bowtruckle. Guardian of trees and clean code branches."
              >
                <div style={{ animation: 'bowtruckleSwayReal 5s ease-in-out infinite' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 right-0 whitespace-nowrap bg-[#302B22] text-[#F4E9C8] text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                    Pickett: Branch guardian 🌿
                  </div>

                  <svg width="48" height="64" viewBox="0 0 65 85" fill="none" className="filter drop-shadow hover:scale-120 transition-transform">
                    {/* Knotted Bark Spine */}
                    <path d="M32 80 Q29 55 34 32 Q31 20 31 14" stroke="#4D603E" strokeWidth="4" strokeLinecap="round" />
                    <path d="M29 56 Q20 70 17 80" stroke="#4D603E" strokeWidth="3" strokeLinecap="round" />
                    <path d="M35 56 Q44 70 47 80" stroke="#4D603E" strokeWidth="3" strokeLinecap="round" />

                    {/* Jointed Twig Arms */}
                    <path d="M33 38 Q18 30 13 22" stroke="#5E784D" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M33 40 Q48 34 54 26" stroke="#5E784D" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Leaf Sprouts on Crown */}
                    <ellipse cx="27" cy="10" rx="7" ry="3.5" fill="#65A30D" transform="rotate(-30 27 10)" />
                    <ellipse cx="36" cy="8" rx="7" ry="3.5" fill="#84CC16" transform="rotate(25 36 8)" />

                    {/* Subtle Eyes */}
                    <circle cx="29" cy="18" r="1.6" fill="#14210D" />
                    <circle cx="34" cy="18" r="1.6" fill="#14210D" />
                  </svg>
                </div>
              </div>

              {/* 4. NEW: BUCKBEAK THE HIPPOGRIFF (Eagle head/wings + grey horse hindquarters) */}
              <div 
                className="absolute top-28 right-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'hippogriffSwoop 44s ease-in-out infinite' }}
                onClick={handleHippogriffClick}
                title="Buckbeak the Hippogriff. Bow to him before approaching!"
              >
                <div style={{ transform: hippogriffBowing ? 'rotate(15deg) translateY(12px)' : 'none', transition: 'transform 0.5s' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#302B22] text-[#F4E9C8] text-[10px] font-serif px-2.5 py-0.5 rounded shadow pointer-events-none">
                    Buckbeak: Bow first! 🦅 (Click)
                  </div>

                  <svg width="115" height="75" viewBox="0 0 140 90" fill="none" className="filter drop-shadow-xl hover:scale-110 transition-transform">
                    {/* Great Wings with Primaries */}
                    <g style={{ transformOrigin: '65px 35px', animation: 'hippogriffWings 0.6s ease-in-out infinite' }}>
                      <path d="M60 35 C35 5 10 18 2 12 C18 28 42 36 60 38 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
                      <path d="M75 35 C100 5 125 18 135 12 C118 28 95 36 75 38 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
                    </g>

                    {/* Horse Hindquarters & Muscular Flank */}
                    <path d="M40 45 Q20 48 15 62 Q28 72 38 70 Q52 70 58 55 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
                    {/* Equine Legs and Hooves */}
                    <path d="M24 64 L20 84 M34 65 L36 84" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Flowing Tail */}
                    <path d="M15 60 Q6 72 8 82" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />

                    {/* Eagle Forebody & Raptor Talons */}
                    <path d="M52 48 Q68 40 76 28 Q84 32 88 28 Q80 18 68 20 Q56 30 52 48 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
                    <path d="M56 55 L58 75 M64 54 L68 74" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />

                    {/* Raptor Beak & Fierce Eye */}
                    <path d="M85 24 Q94 26 92 34 Q86 31 84 30 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                    <circle cx="78" cy="24" r="2.5" fill="#F59E0B" />
                    <circle cx="78" cy="24" r="1.3" fill="#0F172A" />
                  </svg>
                </div>
              </div>

              {/* 5. NEW: FAWKES THE PHOENIX (Radiant scarlet & gold plumage with song) */}
              <div 
                className="absolute top-8 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'phoenixDrift 38s ease-in-out infinite' }}
                onClick={handlePhoenixClick}
                title="Fawkes the Phoenix. Click to hear his healing song!"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#702C38] text-[#F4E9C8] text-[10px] font-serif px-2.5 py-0.5 rounded shadow pointer-events-none">
                  Fawkes: Phoenix song 🔥 (Click)
                </div>

                <svg width="105" height="70" viewBox="0 0 130 85" fill="none" className="filter drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] hover:scale-115 transition-transform">
                  <defs>
                    <linearGradient id="phoenixFeathers" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DC2626" />
                      <stop offset="50%" stopColor="#EA580C" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                  </defs>

                  {/* Magnificent Beating Wings */}
                  <g style={{ transformOrigin: '65px 35px', animation: 'hippogriffWings 0.45s ease-in-out infinite' }}>
                    <path d="M60 35 C38 8 12 18 5 12 C18 28 42 36 60 38 Z" fill="url(#phoenixFeathers)" stroke="#B91C1C" strokeWidth="1.2" />
                    <path d="M72 35 C94 8 120 18 125 12 C112 28 88 36 72 38 Z" fill="url(#phoenixFeathers)" stroke="#B91C1C" strokeWidth="1.2" />
                  </g>

                  {/* Scarlet Body & Ruby Crest */}
                  <ellipse cx="66" cy="38" rx="14" ry="18" fill="#DC2626" />
                  <path d="M66 22 C64 12 70 8 74 6 C72 14 68 18 66 22 Z" fill="#F59E0B" />

                  {/* Golden Beak & Amber Eye */}
                  <path d="M72 26 L80 28 L72 31 Z" fill="#FBBF24" />
                  <circle cx="68" cy="24" r="2" fill="#FBBF24" />
                  <circle cx="68" cy="24" r="1" fill="#450A0A" />

                  {/* Flowing Golden Twin Tail Feathers */}
                  <g style={{ transformOrigin: '66px 52px', animation: 'phoenixTailWave 1.2s ease-in-out infinite' }}>
                    <path d="M64 52 Q55 70 52 82 Q56 74 62 60" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M68 52 Q77 70 80 82 Q76 74 70 60" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                  </g>

                  {/* Glowing flame dust motes */}
                  <circle cx="58" cy="74" r="1.5" fill="#FEF08A" className="animate-ping" />
                  <circle cx="74" cy="76" r="1.5" fill="#FEF08A" className="animate-ping" />
                </svg>
              </div>

              {/* 6. NEW: CROOKSHANKS THE KNEAZLE (Ginger coat, bottlebrush tail) */}
              <div 
                className="absolute bottom-1 right-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'kneazleProwl 40s linear infinite' }}
                onClick={handleKneazleClick}
                title="Crookshanks the Kneazle. Extremely perceptive feline beast!"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#302B22] text-[#F4E9C8] text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                  Crookshanks: Security patrol 🐾 (Click)
                </div>

                <svg width="68" height="44" viewBox="0 0 95 60" fill="none" className="filter drop-shadow hover:scale-110 transition-transform">
                  {/* Fluffy Orange Feline Body */}
                  <ellipse cx="45" cy="35" rx="26" ry="16" fill="#D97706" />
                  <ellipse cx="43" cy="33" rx="22" ry="12" fill="#F59E0B" />

                  {/* Paws */}
                  <circle cx="28" cy="48" r="4" fill="#D97706" />
                  <circle cx="38" cy="48" r="4" fill="#D97706" />
                  <circle cx="54" cy="48" r="4" fill="#D97706" />
                  <circle cx="64" cy="48" r="4" fill="#D97706" />

                  {/* Feline Head with Tufted Ears */}
                  <circle cx="72" cy="26" r="12" fill="#D97706" />
                  <polygon points="66,16 70,6 74,16" fill="#B45309" />
                  <polygon points="74,16 78,6 82,16" fill="#B45309" />

                  {/* Wise Yellow Eyes & Nose */}
                  <ellipse cx="70" cy="25" rx="2.5" ry="3" fill="#FEF08A" />
                  <ellipse cx="70" cy="25" rx="1" ry="2.5" fill="#451A03" />
                  <ellipse cx="76" cy="25" rx="2.5" ry="3" fill="#FEF08A" />
                  <ellipse cx="76" cy="25" rx="1" ry="2.5" fill="#451A03" />
                  <polygon points="72,30 74,30 73,32" fill="#9A3412" />

                  {/* Bottlebrush Tail */}
                  <g style={{ transformOrigin: '22px 35px', animation: 'kneazleTail 1.5s ease-in-out infinite' }}>
                    <path d="M22 35 Q10 24 6 12 Q14 18 20 28" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
                  </g>
                </svg>
              </div>

              {/* 7. NEW: PYGMY PUFF (Arnold - Fluffy bouncing pink sphere) */}
              <div 
                className="absolute bottom-16 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'pygmyRoll 32s ease-in-out infinite' }}
                onClick={handlePygmyPuffClick}
                title="A fluffy Pygmy Puff! Click to hear it squeak."
              >
                <div style={{ transform: pygmyBouncing ? 'scale(1.3) translateY(-14px)' : 'none', transition: 'transform 0.25s' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#831843] text-pink-100 text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                    Pygmy Puff 🌸 (Click me)
                  </div>

                  <svg width="42" height="42" viewBox="0 0 60 60" fill="none" className="filter drop-shadow hover:scale-120 transition-transform">
                    {/* Fluffy Sphere */}
                    <circle cx="30" cy="30" r="24" fill="#DB2777" />
                    <circle cx="28" cy="28" r="20" fill="#F472B6" />
                    {/* Fur fluff ripples */}
                    <circle cx="16" cy="22" r="6" fill="#F472B6" opacity="0.6" />
                    <circle cx="44" cy="22" r="6" fill="#F472B6" opacity="0.6" />
                    <circle cx="20" cy="38" r="7" fill="#F472B6" opacity="0.6" />
                    <circle cx="40" cy="38" r="7" fill="#F472B6" opacity="0.6" />

                    {/* Cute Big Sparkling Eyes */}
                    <circle cx="24" cy="28" r="4.5" fill="#0F172A" />
                    <circle cx="25.5" cy="26.5" r="1.8" fill="#FFFFFF" />
                    <circle cx="36" cy="28" r="4.5" fill="#0F172A" />
                    <circle cx="37.5" cy="26.5" r="1.8" fill="#FFFFFF" />

                    {/* Sweet Little Nose */}
                    <ellipse cx="30" cy="34" rx="2" ry="1.2" fill="#831843" />
                  </svg>
                </div>
              </div>

              {/* 8. NEW: ENCHANTED ORIGAMI MEMO BIRD (Ministry folded parchment memo) */}
              <div 
                className="absolute top-24 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'memoFlutter 28s linear infinite' }}
                onClick={handleMemoBirdClick}
                title="Enchanted Origami Interdepartmental Memo."
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#302B22] text-[#F4E9C8] text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                  Folded Memo ✉️ (Click)
                </div>

                <svg width="44" height="30" viewBox="0 0 60 40" fill="none" className="filter drop-shadow hover:scale-120 transition-transform">
                  <g style={{ transformOrigin: '30px 20px', animation: 'memoWing 0.25s ease-in-out infinite' }}>
                    <polygon points="30,20 10,5 25,25" fill="#F5E8C7" stroke="#B49A62" strokeWidth="1" />
                    <polygon points="30,20 50,5 35,25" fill="#E8D9AE" stroke="#B49A62" strokeWidth="1" />
                  </g>
                  <polygon points="25,25 30,35 35,25" fill="#D8C697" stroke="#B49A62" strokeWidth="1" />
                  <circle cx="30" cy="22" r="2" fill="#702C38" />
                </svg>
              </div>
            </>
          )}

          {/* ================================================================ */}
          {/* MODE 2: THE MIDNIGHT LIBRARY (DARK THEME - 8 CREATURES)          */}
          {/* ================================================================ */}
          {currentTheme === 'dark' && (
            <>
              {/* 1. REALISTIC LUMINESCENT PATRONUS STAG (Prongs - 12-point branching antlers) */}
              <div 
                className="absolute bottom-16 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'patronusStride 42s ease-in-out infinite' }}
                onClick={handlePatronusStagClick}
                title="Expecto Patronum! The Silver Stag casts a protective aura."
              >
                <div style={{ animation: 'stagGallop 1.3s ease-in-out infinite' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111D2B] text-[#8CCBFF] border border-[#8CCBFF]/40 text-[10px] font-heading px-2.5 py-0.5 rounded shadow pointer-events-none">
                    Expecto Patronum 🦌 (Click)
                  </div>

                  <svg width="135" height="110" viewBox="0 0 150 125" fill="none" className="filter drop-shadow-[0_0_22px_rgba(140,203,255,0.9)] hover:scale-110 transition-transform">
                    <defs>
                      <linearGradient id="stagMist" x1="20%" y1="20%" x2="90%" y2="90%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                        <stop offset="45%" stopColor="#BAE6FD" stopOpacity="0.88" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>

                    {/* Muscular Cervine Torso */}
                    <path d="M42 75 Q48 58 70 60 Q98 62 106 78 Q92 88 68 85 Q50 88 42 75 Z" fill="url(#stagMist)" />

                    {/* Arched Neck & Graceful Head */}
                    <path d="M92 65 Q106 50 110 35 Q115 37 117 34 Q112 28 104 31 Q98 42 86 60 Z" fill="url(#stagMist)" />

                    {/* Detailed Branching 12-Point Crown of Antlers */}
                    <path 
                      d="M108 31 C112 18 124 10 134 5 M116 20 C125 18 135 18 140 14 M110 26 C102 16 94 12 90 9 M105 18 C96 17 87 13 82 15 M122 12 C126 5 132 2 138 1 M98 12 C94 6 88 4 82 3" 
                      stroke="#FFFFFF" 
                      strokeWidth="2.2" 
                      strokeLinecap="round" 
                      opacity="0.95"
                    />

                    {/* Long Cantering Legs & Hooves */}
                    <path d="M52 82 Q45 100 40 118 M46 84 Q56 102 60 118" stroke="#E0F2FE" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
                    <path d="M96 78 Q102 98 110 116 M88 80 Q84 98 80 116" stroke="#E0F2FE" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />

                    {/* Flowing Stardust Tail & Trail */}
                    <path d="M42 75 Q30 82 22 90 Q34 85 40 78" fill="#F0F9FF" opacity="0.85" />
                    <circle cx="20" cy="86" r="2" fill="#FFFFFF" className="animate-ping" />
                    <circle cx="10" cy="80" r="1.5" fill="#7DD3FC" />
                    <circle cx="4" cy="92" r="1.2" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>

              {/* 2. REALISTIC GOLDEN SNITCH (Filigree gold sphere + vibrating wings) */}
              <div 
                className="absolute top-0 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'snitchPath 24s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                onClick={handleSnitchClick}
                title="The Golden Snitch! Snatch it for +150 Gryffindor points."
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500 text-slate-950 font-bold text-[10px] font-heading px-2 py-0.5 rounded shadow pointer-events-none">
                  ⚡ Catch the Snitch (+150 pts)
                </div>

                <svg width="60" height="38" viewBox="0 0 90 55" fill="none" className="filter drop-shadow-[0_0_15px_rgba(245,158,11,0.95)] hover:scale-130 transition-transform">
                  <defs>
                    <radialGradient id="snitchSpecular" cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stopColor="#FEF9C3" />
                      <stop offset="35%" stopColor="#FBBF24" />
                      <stop offset="75%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#78350F" />
                    </radialGradient>
                  </defs>

                  {/* Translucent Ribbed Wings with Micro-Vibration */}
                  <path 
                    d="M36 28 C22 10, 4 18, 2 8 C12 20, 25 24, 36 28 Z" 
                    fill="#F8FAFC" 
                    fillOpacity="0.8" 
                    stroke="#E2E8F0" 
                    strokeWidth="1.2"
                    style={{ transformOrigin: '36px 28px', animation: 'snitchWingVibrate 0.1s linear infinite' }}
                  />
                  <path 
                    d="M54 28 C68 10, 86 18, 88 8 C78 20, 65 24, 54 28 Z" 
                    fill="#F8FAFC" 
                    fillOpacity="0.8" 
                    stroke="#E2E8F0" 
                    strokeWidth="1.2"
                    style={{ transformOrigin: '54px 28px', animation: 'snitchWingVibrate 0.1s linear infinite reverse' }}
                  />

                  {/* Burnished Golden Sphere */}
                  <circle cx="45" cy="28" r="10" fill="url(#snitchSpecular)" stroke="#B45309" strokeWidth="1.5" />
                  {/* Quidditch Seam Engravings */}
                  <path d="M39 25 Q45 30 51 25" stroke="#92400E" strokeWidth="1" fill="none" />
                  <path d="M39 31 Q45 26 51 31" stroke="#92400E" strokeWidth="1" fill="none" />
                  <circle cx="42" cy="23" r="1.8" fill="#FFFFFF" opacity="0.85" />
                </svg>
              </div>

              {/* 3. REALISTIC THESTRAL (Skeletal winged steed soaring high) */}
              <div 
                className="absolute top-12 right-0 pointer-events-auto cursor-default"
                style={{ animation: 'thestralHighPath 52s linear infinite' }}
                title="A Thestral soaring silently across the midnight clouds."
              >
                <svg width="100" height="46" viewBox="0 0 130 60" fill="none" className="filter drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] opacity-50 hover:opacity-90 transition-opacity">
                  {/* Skeletal Leathery Bat-like Wings */}
                  <path d="M65 30 C48 10, 22 14, 5 7 C16 22, 38 27, 56 31 C45 44, 25 50, 16 55 C34 50, 52 44, 63 35 Z" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  <path d="M65 30 C82 10, 108 14, 125 7 C114 22, 92 27, 74 31 C85 44, 105 50, 114 55 C96 50, 78 44, 67 35 Z" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  <ellipse cx="65" cy="30" rx="9" ry="4.5" fill="#020617" />
                  {/* Pale pupil-less eye */}
                  <circle cx="68" cy="29" r="1.3" fill="#E2E8F0" />
                </svg>
              </div>

              {/* 4. NEW: HUNGARIAN HORNTAIL DRAGON (Obsidian scales, bronze horns, blue fire) */}
              <div 
                className="absolute top-16 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'dragonSwoop 46s ease-in-out infinite' }}
                onClick={handleDragonClick}
                title="The Hungarian Horntail Dragon. Roars through the midnight sky!"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0F172A] text-amber-300 border border-amber-500/40 text-[10px] font-heading px-2.5 py-0.5 rounded shadow pointer-events-none">
                  Hungarian Horntail 🐉 (Click)
                </div>

                <svg width="125" height="80" viewBox="0 0 160 100" fill="none" className="filter drop-shadow-[0_0_16px_rgba(249,115,22,0.4)] hover:scale-115 transition-transform">
                  {/* Spiked Wings */}
                  <g style={{ transformOrigin: '80px 45px', animation: 'dragonWingBeat 0.5s ease-in-out infinite' }}>
                    <path d="M75 45 C48 10, 15 22, 5 15 C18 35, 52 45, 75 48 Z" fill="#18181B" stroke="#71717A" strokeWidth="1.5" />
                    <path d="M85 45 C112 10, 145 22, 155 15 C142 35, 108 45, 85 48 Z" fill="#27272A" stroke="#71717A" strokeWidth="1.5" />
                  </g>

                  {/* Scaled Serpentine Body */}
                  <path d="M60 50 Q80 44 95 35 Q105 38 112 34 Q98 24 88 28 Q75 40 60 50 Z" fill="#09090B" stroke="#3F3F46" strokeWidth="1.2" />

                  {/* Bronze Horns & Spikes */}
                  <path d="M108 30 L118 22 M104 27 L112 18" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M65 48 L62 42 M75 45 L73 39 M85 40 L84 34" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Whip Spiked Tail */}
                  <path d="M60 50 Q40 62 25 75 Q35 70 45 62" stroke="#09090B" strokeWidth="3.5" strokeLinecap="round" />
                  <polygon points="20,78 28,73 24,80" fill="#D97706" />

                  {/* Glowing Amber Eye & Blue Fire Breath Trail */}
                  <circle cx="102" cy="30" r="1.8" fill="#F59E0B" />
                  <path d="M112 35 Q125 40 135 38 Q128 44 114 38" fill="#38BDF8" opacity="0.8" />
                  <circle cx="130" cy="39" r="1.5" fill="#BAE6FD" className="animate-ping" />
                </svg>
              </div>

              {/* 5. NEW: HERMIONE'S PATRONUS OTTER (Swims in air with silvery stardust bubbles) */}
              <div 
                className="absolute top-0 right-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'otterSwimPath 34s ease-in-out infinite' }}
                onClick={handleOtterClick}
                title="Hermione Granger's Silver Patronus Otter!"
              >
                <div style={{ animation: otterSpinning ? 'spin 1s ease-in-out' : 'otterSineWave 1.8s ease-in-out infinite' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111D2B] text-[#8CCBFF] border border-[#8CCBFF]/40 text-[10px] font-heading px-2 py-0.5 rounded shadow pointer-events-none">
                    Patronus Otter 🦦 (Click)
                  </div>

                  <svg width="85" height="52" viewBox="0 0 110 65" fill="none" className="filter drop-shadow-[0_0_18px_rgba(140,203,255,0.85)] hover:scale-120 transition-transform">
                    {/* Fluid Sine-Wave Streamlined Body */}
                    <path d="M18 42 Q38 25 60 30 Q82 35 95 24 Q86 38 65 38 Q38 48 18 42 Z" fill="#BAE6FD" opacity="0.9" />
                    {/* Head with Whiskers */}
                    <circle cx="95" cy="24" r="7" fill="#E0F2FE" />
                    <circle cx="97" cy="23" r="1.5" fill="#FFFFFF" />
                    {/* Webbed Paws */}
                    <path d="M72 38 Q76 46 80 48" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M42 42 Q40 50 36 52" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Silvery Stardust Bubbles */}
                    <circle cx="12" cy="45" r="2" fill="#FFFFFF" className="animate-ping" />
                    <circle cx="6" cy="48" r="1.5" fill="#7DD3FC" />
                    <circle cx="2" cy="40" r="1" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>

              {/* 6. NEW: ASHWINDER (Slithering magical fire serpent with ember trail) */}
              <div 
                className="absolute bottom-1 left-0 pointer-events-auto cursor-pointer group"
                style={{ animation: 'ashwinderSlither 50s linear infinite' }}
                onClick={handleAshwinderClick}
                title="The Ashwinder. Born from magical fire, slithering along the rim!"
              >
                <div style={{ animation: 'ashwinderBodyWave 1.4s ease-in-out infinite' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#18181B] text-red-400 border border-red-500/40 text-[10px] font-serif px-2 py-0.5 rounded shadow pointer-events-none">
                    Ashwinder 🔥 (Click)
                  </div>

                  <svg width="95" height="32" viewBox="0 0 130 40" fill="none" className="filter drop-shadow-[0_0_10px_rgba(239,68,68,0.7)] hover:scale-115 transition-transform">
                    {/* Slender Ash-Grey Serpentine Coil */}
                    <path d="M10 20 Q30 5 50 20 Q70 35 90 20 Q110 5 125 18" stroke="#94A3B8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    {/* Inner glowing fire vein */}
                    <path d="M10 20 Q30 5 50 20 Q70 35 90 20 Q110 5 125 18" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
                    {/* Glowing Red Eyes */}
                    <circle cx="122" cy="16" r="1.8" fill="#F87171" className="animate-pulse" />
                    {/* Flickering Sparks */}
                    <circle cx="4" cy="22" r="1.5" fill="#F97316" className="animate-ping" />
                    <circle cx="28" cy="8" r="1.2" fill="#F97316" />
                  </svg>
                </div>
              </div>

              {/* 7. NEW: MOONCALF (Large luminous saucer eyes dancing gently) */}
              <div 
                className="absolute bottom-4 right-8 pointer-events-auto cursor-pointer group"
                onClick={handleMooncalfClick}
                title="A shy Mooncalf dancing under the stars."
              >
                <div style={{ animation: 'mooncalfGentleStep 3.5s ease-in-out infinite' }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 right-0 whitespace-nowrap bg-[#111D2B] text-[#93C5FD] border border-[#93C5FD]/40 text-[10px] font-heading px-2 py-0.5 rounded shadow pointer-events-none">
                    Mooncalf 🌕 (Click)
                  </div>

                  <svg width="55" height="65" viewBox="0 0 75 90" fill="none" className="filter drop-shadow hover:scale-115 transition-transform">
                    {/* Smooth Velvety Body */}
                    <ellipse cx="38" cy="52" rx="18" ry="22" fill="#64748B" />
                    {/* Spindly Legs & Flat Webbed Hooves */}
                    <path d="M26 68 L22 86 M30 70 L28 86" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M46 68 L44 86 M50 70 L52 86" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                    <ellipse cx="22" cy="86" rx="5" ry="2" fill="#334155" />
                    <ellipse cx="52" cy="86" rx="5" ry="2" fill="#334155" />

                    {/* Head with Giant Luminous Sapphire Saucer Eyes */}
                    <circle cx="38" cy="26" r="15" fill="#64748B" />
                    <circle cx="32" cy="24" r="6" fill="#38BDF8" className="animate-pulse" />
                    <circle cx="32" cy="24" r="3" fill="#0284C7" />
                    <circle cx="33" cy="22" r="1.5" fill="#FFFFFF" />

                    <circle cx="44" cy="24" r="6" fill="#38BDF8" className="animate-pulse" />
                    <circle cx="44" cy="24" r="3" fill="#0284C7" />
                    <circle cx="45" cy="22" r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>

              {/* 8. NEW: DISTANT DEMENTOR / SHADOW WRAITH (Hovering in deep night fog) */}
              <div 
                className="absolute top-20 right-16 pointer-events-auto cursor-default opacity-30 hover:opacity-75 transition-opacity"
                style={{ animation: 'dementorFloat 36s ease-in-out infinite' }}
                title="A distant shadowy specter in the midnight fog, kept at bay by the Patronus."
              >
                <svg width="70" height="95" viewBox="0 0 90 120" fill="none" className="filter drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                  {/* Tattered Hooded Cloak Silhouette */}
                  <path d="M45 15 C38 15 28 25 25 45 C20 70 15 95 12 115 C25 105 35 110 45 100 C55 110 65 105 78 115 C75 95 70 70 65 45 C62 25 52 15 45 15 Z" fill="#09090B" opacity="0.85" />
                  {/* Empty void under hood */}
                  <ellipse cx="45" cy="32" rx="7" ry="10" fill="#000000" />
                  {/* Skeletal Hands reaching out */}
                  <path d="M25 55 Q12 60 8 68 M65 55 Q78 60 82 68" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </>
          )}

        </div>
      )}
    </>
  );
};
