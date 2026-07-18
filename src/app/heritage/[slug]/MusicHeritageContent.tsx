"use client";
 
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
 
interface DrumItem {
  id: string;
  name: string;
  description: string;
  significance: string;
  imageUrl: string;
}
 
interface MusicHeritageContentProps {
  items: DrumItem[];
  styles: {
    badge: string;
    card: string;
    bullet: string;
    heading: string;
    dot: string;
  };
}
 
const RHYTHM_HEIGHTS = [
  [12, 45, 12], [12, 60, 12], [12, 30, 12], [12, 75, 12], [12, 50, 12], [12, 85, 12],
  [12, 40, 12], [12, 90, 12], [12, 25, 12], [12, 70, 12], [12, 35, 12], [12, 80, 12],
  [12, 55, 12], [12, 65, 12], [12, 20, 12], [12, 95, 12], [12, 48, 12], [12, 72, 12],
  [12, 38, 12], [12, 88, 12], [12, 28, 12], [12, 82, 12], [12, 42, 12], [12, 68, 12]
];
 
export default function MusicHeritageContent({ items, styles }: MusicHeritageContentProps) {
  const [activeDrum, setActiveDrum] = useState<string>(items[0]?.id || "");
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Audio Context on first interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  // Synthesize Drum Sounds using Web Audio API
  const playSynthesizedSound = (drumType: string) => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    if (drumType.includes("Atsimevu") || drumType.includes("Master")) {
      // low accent thud
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.3);
      gainNode.gain.setValueAtTime(1.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (drumType.includes("Sogo") || drumType.includes("Response")) {
      // mid range punch
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
      gainNode.gain.setValueAtTime(0.8, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      // Gankogui bell: double tone metallic clank using two oscillators
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // high tone
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(587, now); // low tone
      gain2.gain.setValueAtTime(0.3, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc2.start(now);
      osc2.stop(now + 0.15);
    }
  };

  // Rhythm Sequence: Simplified Ewe Agbadza/Polyrhythm
  // 8 steps: Bell is key timekeeper, drums converse
  const playRhythmStep = (step: number) => {
    // Bell plays on every odd/even beat combination (timekeeper)
    const bellPattern = [true, false, true, true, false, true, false, true];
    // Atsimevu plays low accents
    const masterPattern = [true, false, false, false, true, false, false, false];
    // Sogo plays response
    const responsePattern = [false, false, true, false, false, false, true, false];

    if (bellPattern[step]) playSynthesizedSound("Gankogui");
    if (masterPattern[step]) setTimeout(() => playSynthesizedSound("Atsimevu"), 20);
    if (responsePattern[step]) setTimeout(() => playSynthesizedSound("Sogo"), 40);
  };

  // Toggle Rhythm Loop
  const toggleRhythm = () => {
    initAudio();
    if (isPlayingRhythm) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlayingRhythm(false);
      setCurrentStep(0);
    } else {
      setIsPlayingRhythm(true);
      let step = 0;
      intervalRef.current = setInterval(() => {
        playRhythmStep(step);
        setCurrentStep(step);
        step = (step + 1) % 8;
      }, 250); // 120 BPM
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const selectedDrum = items.find((item) => item.id === activeDrum) || items[0];

  return (
    <section className="py-16 bg-white border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Interactive Synthesizer Console Panel */}
        <AnimateOnScroll direction="up">
          <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[var(--color-heritage-black)] text-white shadow-xl relative overflow-hidden border border-[var(--color-border)]/30">
            {/* Visualizer background waves */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-around px-8 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[var(--color-heritage-gold)] rounded-full"
                  animate={{
                    height: isPlayingRhythm 
                      ? RHYTHM_HEIGHTS[i % RHYTHM_HEIGHTS.length] 
                      : 12
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.03,
                    ease: "easeInOut"
                  }}
                  style={{ height: 12 }}
                />
              ))}
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge badge-gold bg-[var(--color-heritage-gold)]/20 text-[var(--color-heritage-gold-light)] border-[var(--color-heritage-gold)]/30 shadow-sm">
                    Interactive Edu-Audio
                  </span>
                  <span className="text-xs text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Volume2 size={13} className="text-[var(--color-heritage-gold)]" />
                    Web Synthesized
                  </span>
                </div>
                
                <h3 className="font-display text-3xl font-black mb-3">
                  Voices of the <span className="text-[var(--color-heritage-gold)]">Ancestors</span>
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xl font-light mb-6">
                  Ewe drumming is a complex polyrhythmic conversation. Below, listen to the individual drum tones, or play the interactive loop to hear the dialogue (the Gankogui bell keeping timing while the Atsimevu and Sogo converse).
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={toggleRhythm}
                    className="btn-primary px-6 flex items-center gap-2 shadow-lg"
                  >
                    {isPlayingRhythm ? (
                      <>
                        <Pause size={16} fill="currentColor" />
                        Pause Dialogue
                      </>
                    ) : (
                      <>
                        <Play size={16} fill="currentColor" />
                        Play Rhythm Dialogue
                      </>
                    )}
                  </button>

                  <div className="flex gap-1.5 items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${
                          isPlayingRhythm && currentStep === i
                            ? "bg-[var(--color-heritage-gold)] scale-125 shadow-[0_0_8px_var(--color-heritage-gold)]"
                            : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Quick Pad */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-3 text-center">
                  Quick Sound Pads (Click to hit)
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        playSynthesizedSound(item.name);
                        setActiveDrum(item.id);
                      }}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all select-none hover:bg-white/10 ${
                        activeDrum === item.id 
                          ? "bg-[var(--color-heritage-gold)]/20 border-[var(--color-heritage-gold)] shadow-md scale-[1.03]" 
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Music size={14} className="text-[var(--color-heritage-gold)]" />
                      </span>
                      <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-full">
                        {item.name.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Dynamic Display Details card + selector */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* List/Sidebar of Drums */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-2">
              Select Instrument to Explore
            </p>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playSynthesizedSound(item.name);
                    setActiveDrum(item.id);
                  }}
                  className={`card text-left p-4 flex items-center gap-4 cursor-pointer transition-all ${
                    activeDrum === item.id 
                      ? "border-[var(--color-heritage-gold)] shadow-md bg-[var(--color-bg-secondary)]" 
                      : "bg-white border-[var(--color-border)]"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${styles.dot} flex items-center justify-center font-black text-xs flex-shrink-0`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)]">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
                      Click to play tone
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Large Detail card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedDrum && (
                <motion.div
                  key={selectedDrum.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`card ${styles.card} overflow-hidden h-full flex flex-col justify-between bg-white border border-[var(--color-border)]`}
                >
                  <div className="flex flex-col sm:flex-row items-stretch">
                    {/* Image side */}
                    <div className="relative w-full sm:w-48 h-40 sm:h-auto min-h-[160px] flex-shrink-0">
                      <Image
                        src={selectedDrum.imageUrl}
                        alt={selectedDrum.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Description side */}
                    <div className="p-6 sm:p-8 flex flex-col justify-center flex-1 gap-4">
                      <div>
                        <span className="badge badge-gold mb-2 shadow-sm">Featured Voice</span>
                        <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
                          {selectedDrum.name}
                        </h3>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                          Role & Function
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-light">
                          {selectedDrum.description}
                        </p>
                      </div>

                      <div className={`p-4 rounded-xl bg-[var(--color-bg-secondary)] border-l-4 ${styles.bullet} shadow-sm`}>
                        <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                          Cultural Significance
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic font-light">
                          {selectedDrum.significance}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
