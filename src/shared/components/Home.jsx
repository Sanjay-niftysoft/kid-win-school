import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, Play, Heart, Users, Star, GraduationCap, Sparkles, Phone, Lightbulb, Leaf, Target, Baby, BookOpen, Quote, ShieldCheck, Clock, CheckCircle2, MessageSquare, Palette, Monitor, Bus, Home as HomeIcon, Gamepad2, Smile, X, Trophy } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetPath';

const coursesData = [
  {
    id: 'toddler',
    title: 'Little Learners',
    age: '1 – 2 yrs',
    focus: 'Sensory play & movement',
    img: getAssetUrl('/new-images/newlearner.png')
  },
  {
    id: 'playgroup',
    title: 'Playgroup',
    age: '2 – 3 yrs',
    focus: 'Play-based learning',
    img: getAssetUrl('/new-images/playgroup.png')
  },
  {
    id: 'nursery',
    title: 'Nursery / Pre-KG',
    age: '3 – 4 yrs',
    focus: 'Colours, shapes & numbers',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lkg',
    title: 'LKG / Junior KG',
    age: '4 – 5 yrs',
    focus: 'Reading & writing basics',
    img: getAssetUrl('/new-images/Lkg.png')
  },
  {
    id: 'ukg',
    title: 'UKG / Senior KG',
    age: '5 – 6 yrs',
    focus: 'School-readiness skills',
    img: getAssetUrl('/new-images/Ukg.png')
  }
];

const weeklyClassesData = [
  {
    id: 'art-craft',
    title: 'Art & Craft',
    img: getAssetUrl('/courses/art.png')
  },
  {
    id: 'music-rhymes',
    title: 'Music & Rhymes',
    img: getAssetUrl('/courses/music.png')
  },
  {
    id: 'dance-movement',
    title: 'Dance & Movement',
    img: getAssetUrl('/courses/dance.png')
  },
  {
    id: 'puzzle-brain',
    title: 'Puzzle & Brain Games',
    img: getAssetUrl('/new-images/puzzle-brain.jpg')
  },
  {
    id: 'alphabet-phonics',
    title: 'Alphabet & Phonics',
    img: getAssetUrl('/new-images/alphabet-phonics.jpg')
  },
  {
    id: 'numbers-counting',
    title: 'Numbers & Counting',
    img: getAssetUrl('/new-images/numbers-counting.jpg')
  },
  {
    id: 'color-shape',
    title: 'Color & Shape Matching',
    img: getAssetUrl('/new-images/color-shape.jpg')
  },
  {
    id: 'sports-games',
    title: 'Sports & Physical Games',
    img: getAssetUrl('/courses/play.png')
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    img: getAssetUrl('/new-images/storytelling.jpg')
  },
  {
    id: 'communication',
    title: 'Communication Skills',
    img: getAssetUrl('/new-images/home-about-us.png')
  },
  {
    id: 'nature-environment',
    title: 'Nature & Environment',
    img: getAssetUrl('/new-images/nature-environment.jpg')
  },
  {
    id: 'yoga-mindfulness',
    title: 'Yoga & Mindfulness',
    img: getAssetUrl('/new-images/yoga-mindfulness.jpg')
  }
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [courseStartIndex, setCourseStartIndex] = useState(0);
  const [weeklyStartIndex, setWeeklyStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showAdmissionPopup, setShowAdmissionPopup] = useState(false);
  const [isPopupClicked, setIsPopupClicked] = useState(false);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  useEffect(() => {
    // Automatically trigger admission popup when entering the home page
    const timer = setTimeout(() => {
      setShowAdmissionPopup(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = (e) => {
    if (e) e.stopPropagation();
    setShowAdmissionPopup(false);
  };

  const handlePopupClick = () => {
    setIsPopupClicked(true);
    setTimeout(() => {
      setShowAdmissionPopup(false);
      navigate('/admission');
    }, 220);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const maxCourseIndex = isMobile ? coursesData.length - 1 : coursesData.length - 3;
  const maxWeeklyIndex = isMobile ? weeklyClassesData.length - 1 : weeklyClassesData.length - 3;

  const handlePrevCourse = () => {
    setCourseStartIndex((prev) => (prev === 0 ? maxCourseIndex : prev - 1));
  };

  const handleNextCourse = () => {
    setCourseStartIndex((prev) => (prev >= maxCourseIndex ? 0 : prev + 1));
  };

  const handlePrevWeekly = () => {
    setWeeklyStartIndex((prev) => (prev === 0 ? maxWeeklyIndex : prev - 1));
  };

  const handleNextWeekly = () => {
    setWeeklyStartIndex((prev) => (prev >= maxWeeklyIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    const hash = window.location.hash;
    const pathName = location.pathname.replace('/', '');
    const targetId = hash ? hash.replace('#', '') : (pathName !== '' ? pathName : null);

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full select-none">

      {/* ========================================================================= */}
      {/* 1. HERO BANNER SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F4FD] via-[#F0F9FF] to-white select-none pt-6 sm:pt-10 lg:pt-12">


        {/* 1. EXACT REFERENCE BACKGROUND IMAGE (public/bg.png) WITH FADE-IN ENTRANCE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none hidden xl:block"
          style={{ backgroundImage: `url('${getAssetUrl('/bg.png')}')` }}
        ></motion.div>

        {/* 2. AIR, CLOUD, LEAF & STORYBOOK ANIMATED OVERLAYS */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">



          {/* B) BEAUTIFUL DRIFTING SOLID WHITE ANIMATED CLOUDS */}
          <div className="absolute top-2 left-4 opacity-90 animate-cloud-horizontal filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.10)] pointer-events-none">
            <svg width="140" height="70" viewBox="0 0 160 80">
              <path
                d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 32 154 44 150 56 C 146 65 134 65 125 65 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          <div className="absolute top-4 left-1/2 opacity-95 animate-cloud-horizontal filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.10)] pointer-events-none" style={{ animationDelay: '5s' }}>
            <svg width="120" height="60" viewBox="0 0 160 80">
              <path
                d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 65 134 65 125 65 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          <div className="absolute top-1 right-1/4 opacity-85 animate-cloud-horizontal filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] pointer-events-none" style={{ animationDelay: '10s' }}>
            <svg width="160" height="80" viewBox="0 0 160 80">
              <path
                d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 65 134 65 125 65 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          {/* C) SUBTLE TWINKLING STARS - hidden on mobile to avoid text overlap */}
          <div className="absolute top-6 left-1/3 animate-star-soft text-amber-400 text-xl drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none hidden sm:block">⭐</div>
          <div className="absolute top-8 right-1/3 animate-star-soft text-amber-400 text-xl drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none hidden sm:block" style={{ animationDelay: '1.5s' }}>🌟</div>
          <div className="absolute top-20 right-1/2 animate-star-soft text-amber-300 text-base drop-shadow-[0_0_6px_rgba(253,224,71,0.7)] pointer-events-none hidden md:block" style={{ animationDelay: '2s' }}>✨</div>

          {/* D) LEAVES - only on larger screens to not overlap mobile text */}
          <div className="absolute top-12 left-6 animate-leaf-air-1 pointer-events-none hidden lg:block">
            <svg width="28" height="28" viewBox="0 0 24 24" className="drop-shadow-md">
              <path d="M17.484 3.7c-5.18 0-9.4 4.22-9.4 9.4 0 2.14.72 4.11 1.93 5.7L3.7 20.3a1 1 0 101.4 1.4l6.5-6.314c1.59 1.21 3.56 1.93 5.7 1.93 5.18 0 9.4-4.22 9.4-9.4s-4.22-9.216-9.216-9.216z" fill="url(#leafAirGrad1)" />
              <defs>
                <linearGradient id="leafAirGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#84CC16" />
                  <stop offset="100%" stopColor="#4D7C0F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute top-36 left-12 animate-leaf-air-2 pointer-events-none hidden lg:block">
            <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-md">
              <path d="M17.484 3.7c-5.18 0-9.4 4.22-9.4 9.4 0 2.14.72 4.11 1.93 5.7L3.7 20.3a1 1 0 101.4 1.4l6.5-6.314c1.59 1.21 3.56 1.93 5.7 1.93 5.18 0 9.4-4.22 9.4-9.4s-4.22-9.216-9.216-9.216z" fill="url(#leafAirGrad2)" />
              <defs>
                <linearGradient id="leafAirGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A3E635" />
                  <stop offset="100%" stopColor="#65A30D" />
                </linearGradient>
              </defs>
            </svg>
          </div>



          {/* F) SUN - pushed to right edge, only visible properly on sm+ screens */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 120 }}
            className="absolute top-6 sm:top-8 lg:top-10 right-0 sm:right-4 lg:right-12 z-[2] pointer-events-none"
          >
            <div className="relative animate-sun-float-pulse">

              {/* "Small Steps Big Futures" tag — only show on sm+ */}
              <div className="absolute top-2 sm:top-4 -left-16 sm:-left-20 text-center transform -rotate-12 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-md border border-amber-200 z-30 hidden sm:block">
                <div className="text-[9px] font-black text-amber-800 leading-tight uppercase tracking-wider">
                  Small Steps
                </div>
                <div className="text-[10px] font-black text-orange-600 leading-none">
                  Big Futures
                </div>
              </div>

              {/* Sun Rays */}
              <svg className="w-20 h-20 sm:w-28 sm:h-28 text-amber-400 animate-rays-slow-spin drop-shadow-[0_0_20px_rgba(255,184,0,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <rect
                    key={deg}
                    x="46"
                    y="5"
                    width="8"
                    height="17"
                    rx="4"
                    transform={`rotate(${deg} 50 50)`}
                    fill="url(#sunRayGrad)"
                  />
                ))}
                <defs>
                  <linearGradient id="sunRayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB800" />
                    <stop offset="100%" stopColor="#FF8A00" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Sun Face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FFD600] via-[#FFB800] to-[#FF9900] border-4 border-amber-200 shadow-[0_0_25px_rgba(255,184,0,0.7)] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute left-2 bottom-4 w-3 h-2 rounded-full bg-rose-400/50"></div>
                  <div className="absolute right-2 bottom-4 w-3 h-2 rounded-full bg-rose-400/50"></div>
                  <div className="flex gap-2 relative z-10 -mt-1 animate-eye-blink">
                    <div className="w-3 h-3.5 bg-slate-950 rounded-full relative">
                      <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                    <div className="w-3 h-3.5 bg-slate-950 rounded-full relative">
                      <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="mt-1 relative z-10">
                    <svg width="18" height="10" viewBox="0 0 22 12" fill="none">
                      <path d="M 2 2 Q 11 12 20 2" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* G) RIGHT GREEN WAVY CLOUD BADGE (Positioned below the Sun) */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
            className="absolute top-56 sm:top-60 right-6 sm:right-10 z-20 animate-float-gentle hidden xl:block"
          >
            <div className="bg-gradient-to-r from-[#4CAE38] to-[#3B9E28] text-white px-5 py-4 rounded-[28px] shadow-xl max-w-[200px] text-center border-2 border-white transform rotate-3">
              <div className="text-[11px] font-black uppercase tracking-wider leading-tight text-white drop-shadow-xs">
                Give Your Seed To us,
              </div>
              <div className="text-[10px] font-black text-amber-200 leading-tight mt-1 drop-shadow-xs uppercase">
                We Will give You The
              </div>
              <div className="text-xs font-black text-white leading-tight mt-1 drop-shadow-xs italic">
                "Tree of life"
              </div>
              <div className="text-xs mt-1 text-rose-200">♥</div>
            </div>
          </motion.div>

          {/* H) BOTTOM RIGHT CARD: BUILDING BRIGHTER TOMORROWS */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
            className="absolute bottom-12 right-6 sm:right-12 z-20 animate-float-gentle hidden xl:block"
          >
            <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100/90 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-xs shadow-xs">👦</div>
                <div className="w-8 h-8 rounded-full bg-rose-200 border-2 border-white flex items-center justify-center text-xs shadow-xs">👧</div>
                <div className="w-8 h-8 rounded-full bg-sky-200 border-2 border-white flex items-center justify-center text-xs shadow-xs">👶</div>
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-800 leading-tight">Building</div>
                <div className="text-xs font-black text-[#1B75BC] leading-tight">Brighter Tomorrows</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3. MAIN HERO CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 xl:gap-8 xl:min-h-[72vh] xl:items-center pt-12 sm:pt-16 xl:pt-16 pb-8 sm:pb-10 xl:pb-8">

            {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION, CTAs, FEATURES */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="xl:col-span-7 space-y-3 sm:space-y-4 text-left w-full"
            >

              {/* Premium Glossy Rounded-Rectangle Badge: Welcome to Kidwin Preschool */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="hidden lg:inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-sm hover:shadow-md hover:scale-105 transition-all group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs transform group-hover:rotate-12 transition-transform">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-rose-600 tracking-wide">
                  Welcome to Kidwin Preschool
                </span>
                {/* <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> */}
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-0.5">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0F2942] tracking-tight leading-[1.1]"
                >
                  Where Little Minds
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1]"
                >
                  <span className="text-[#0088FF]">Begin Their </span>
                  <span className="text-[#FF6600]">Big Journey</span>
                </motion.div>
              </div>

              {/* Subtitle Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-black text-xs xs:text-sm sm:text-base leading-relaxed max-w-md font-medium pt-0.5"
              >
                A safe, happy and nurturing environment where children learn, play and grow for a brighter tomorrow.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5"
              >
                <Link
                  to="/admission"
                  className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-[#FF9900] hover:bg-amber-400 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Admission Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

              </motion.div>

              {/* 4 Horizontal Feature Badges (Solid White, Perfect Alignment, Lift-Up on Hover) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 bg-white px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-3.5 lg:py-2.5 rounded-2xl border-2 border-rose-200 shadow-md hover:shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer overflow-hidden">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Heart className="w-4 h-4 lg:w-4.5 lg:h-4.5 fill-current" />
                  </div>
                  <div className="text-left leading-tight min-w-0 flex-1">
                    <div className="text-[11px] sm:text-xs font-black text-slate-900 tracking-tight truncate">Safe & Caring</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-rose-600 mt-0.5 truncate">Environment</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 bg-white px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-3.5 lg:py-2.5 rounded-2xl border-2 border-emerald-200 shadow-md hover:shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer overflow-hidden">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Users className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                  </div>
                  <div className="text-left leading-tight min-w-0 flex-1">
                    <div className="text-[11px] sm:text-xs font-black text-slate-900 tracking-tight truncate">Experienced</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-emerald-600 mt-0.5 truncate">Teachers</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 bg-white px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-3.5 lg:py-2.5 rounded-2xl border-2 border-amber-200 shadow-md hover:shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer overflow-hidden">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Star className="w-4 h-4 lg:w-4.5 lg:h-4.5 fill-slate-950" />
                  </div>
                  <div className="text-left leading-tight min-w-0 flex-1">
                    <div className="text-[11px] sm:text-xs font-black text-slate-900 tracking-tight truncate">Activity Based</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-amber-700 mt-0.5 truncate">Learning</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 bg-white px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-3.5 lg:py-2.5 rounded-2xl border-2 border-purple-200 shadow-md hover:shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer overflow-hidden">
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <GraduationCap className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                  </div>
                  <div className="text-left leading-tight min-w-0 flex-1">
                    <div className="text-[11px] sm:text-xs font-black text-slate-900 tracking-tight truncate">Bright</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-purple-600 mt-0.5 truncate">Future</div>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* RIGHT / BOTTOM COLUMN: Hero Image — visible on ALL screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-0 pb-6 sm:pb-8"
            >
              <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none">
                {/* Image Card */}
                <div className="relative z-10 p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] bg-white shadow-2xl border-4 border-sky-100">
                  <div className="overflow-hidden rounded-[22px] sm:rounded-[28px] aspect-[4/3]">
                    <img
                      src={getAssetUrl('/hero-kids.jpg')}
                      alt="Happy Children at Kidwin Preschool"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Top-left badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 140, delay: 0.55 }}
                  className="absolute -top-5 -left-4 sm:-top-6 sm:-left-5 z-20"
                >
                  <div className="w-20 h-20 sm:w-26 sm:h-26 bg-[#FFDF00] border-4 border-white rounded-3xl shadow-xl flex flex-col items-center justify-center text-center p-2 transform -rotate-6">
                    <span className="text-[10px] font-black text-slate-900 leading-tight">Happy</span>
                    <span className="text-[10px] font-black text-slate-900 leading-tight">Children</span>
                    <span className="text-[9px] font-black text-amber-900 leading-tight">Brighter</span>
                    <span className="text-[9px] font-black text-amber-900 leading-tight">Tomorrow</span>
                    <span className="text-xs text-rose-600">♥</span>
                  </div>
                </motion.div>
                {/* Bottom-right Play/Learn/Grow badge */}
                <motion.div
                  initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 140, delay: 0.7 }}
                  className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 z-20"
                >
                  <div className="bg-white border-2 border-sky-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[22px] shadow-xl text-center transform rotate-3">
                    <div className="text-sm font-black text-[#0088FF]">Play</div>
                    <div className="text-sm font-black text-[#FF6600]">Learn</div>
                    <div className="text-sm font-black text-[#00A859] flex items-center gap-1 justify-center">Grow <span className="text-xs text-rose-500">♥</span></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT KIDWIN PRESCHOOLS SECTION (DIRECTLY UNDER HERO BANNER)           */}
      {/* ========================================================================= */}
      <section id="about" className="relative bg-gradient-to-b from-sky-50/50 via-white to-emerald-50/30 py-6 sm:py-10 lg:py-12 overflow-hidden border-t border-slate-100/80">

        {/* Ambient Decorative Clouds & Flight Lines in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 opacity-30 animate-cloud-horizontal">
            <svg width="140" height="70" viewBox="0 0 160 80">
              <path d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 32 154 44 150 56 C 146 65 134 65 125 65 Z" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="absolute top-20 right-16 opacity-30 animate-cloud-horizontal" style={{ animationDelay: '5s' }}>
            <svg width="160" height="80" viewBox="0 0 160 80">
              <path d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 32 154 44 150 56 C 146 65 134 65 125 65 Z" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* LEFT COLUMN: CLOUD FRAMED KIDS PHOTO WITH STYLISH BADGES */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">




                {/* Main Cloud Framed Image Box */}
                <div className="relative z-10 p-3 sm:p-4 rounded-[48px] bg-white shadow-2xl border-4 border-sky-100">
                  <div className="overflow-hidden rounded-[36px] aspect-[4/3] relative">
                    <img
                      src={getAssetUrl('/new-images/home-about-us.png')}
                      alt="Happy Children Learning at Kidwin Preschool"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 ring-1 ring-black/5 rounded-[36px] pointer-events-none"></div>
                  </div>
                </div>

                {/* Top-Left Badge: Give Your Seed To us */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: -6 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 140, delay: 0.2 }}
                  className="hidden sm:block absolute -top-6 -left-4 sm:-top-8 sm:-left-6 z-20"
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white border-2 border-amber-200/90 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center p-2 transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">Give Your Seed</span>
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">To us,</span>
                    <span className="text-[9px] sm:text-[10px] font-black text-[#F37023] leading-tight mt-1">We Will give You</span>
                    <span className="text-[9px] sm:text-[10px] font-black text-[#F37023] leading-tight">The "Tree of life"</span>
                    <span className="text-[10px] text-rose-600 mt-1">♥</span>
                  </div>
                </motion.div>

                {/* Bottom-Left Rounded-Rectangle Badge: Play Learn Grow */}
                <motion.div
                  initial={{ scale: 0, y: 20 }}
                  whileInView={{ scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 140, delay: 0.4 }}
                  className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 z-20"
                >
                  <div className="bg-white border-2 border-sky-200 px-5 py-3 rounded-[28px] shadow-xl text-left transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="text-base sm:text-lg font-black text-[#0088FF] leading-none">Play</div>
                    <div className="text-base sm:text-lg font-black text-[#FF6600] leading-none mt-0.5">Learn</div>
                    <div className="text-base sm:text-lg font-black text-[#00A859] leading-none mt-0.5 flex items-center gap-1">
                      <span>Grow</span>
                      <span className="text-xs text-rose-500">♥</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Origami Paper Plane */}
                <div className="absolute -top-10 right-4 z-20 animate-float-gentle hidden sm:block">
                  <svg width="44" height="44" viewBox="0 0 64 64" fill="none" className="drop-shadow-md transform rotate-12">
                    <path d="M58 6L6 32L28 42L58 6Z" fill="#0088FF" />
                    <path d="M58 6L28 42L42 58L58 6Z" fill="#38BDF8" />
                  </svg>
                </div>

              </div>
            </motion.div>

            {/* RIGHT COLUMN: ABOUT TEXT, CALL BUTTON, 3 CIRCULAR FEATURES */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Badge: About Kidwin Preschools */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-100/90 border border-sky-200 text-[#0088FF] text-xs font-black tracking-wide shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#0088FF]" />
                <span>About Kidwin Preschools</span>
              </div>

              {/* Heading: About Kidwin Preschools */}
              <div className="space-y-2">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight leading-[1.15]">
                  About Kidwin{' '}
                  <span className="text-[#FF6600] relative inline-block">
                    Preschools
                    <span className="absolute -bottom-1.5 left-0 w-full h-2 bg-amber-400 rounded-full"></span>
                  </span>
                </h2>
              </div>

              {/* Paragraph Description */}
              <p className="text-black text-xs sm:text-sm md:text-base leading-relaxed font-normal pt-1">
                KIDWIN is a fusion of a world class curriculum and knowledgeable child development professional that meet the need of children at every stage. At KIDWIN, our endeavour is to provide your child a comfortable atmosphere where learning is full of fun. Children learn in an eco-friendly environment in consonance with an innovative methodology specially evolved by us. The Pre-School is your child's first experience away from you and it's a huge leap for you as a parent.
              </p>

              {/* Call Button */}
              <div className="pt-2">
                <a
                  href="tel:7305145873"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-[#0088FF] hover:bg-sky-600 text-white font-black text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 group"
                >
                  <Phone className="w-4 h-4 text-white fill-current" />
                  <span>CALL: 7305145873</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* 3 Circular Feature Cards */}
              {/* 3 Feature Highlights */}
<div className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-6 border-t border-slate-100">
  <div className="flex flex-col items-center text-center group cursor-pointer">
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(16,185,129,0.35)] ring-1 ring-emerald-200/60 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-8px_rgba(16,185,129,0.5)] transition-all duration-300 mb-3">
      <Users className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" strokeWidth={2.25} />
    </div>
    <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Caring</div>
    <div className="text-xs sm:text-sm font-medium text-black">Environment</div>
  </div>

  <div className="flex flex-col items-center text-center group cursor-pointer">
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(244,63,94,0.35)] ring-1 ring-rose-200/60 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-8px_rgba(244,63,94,0.5)] transition-all duration-300 mb-3">
      <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500 fill-rose-500" strokeWidth={2} />
    </div>
    <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Child</div>
    <div className="text-xs sm:text-sm font-medium text-black">
      Development
    </div>
  </div>

  <div className="flex flex-col items-center text-center group cursor-pointer">
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(245,158,11,0.35)] ring-1 ring-amber-200/60 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-8px_rgba(245,158,11,0.5)] transition-all duration-300 mb-3">
      <Star className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 fill-amber-500" strokeWidth={2} />
    </div>
    <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Bright</div>
    <div className="text-xs sm:text-sm font-medium text-black">Future</div>
  </div>
</div>

            </motion.div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. OUR COURSE (PROGRAMS SECTION)                                         */}
      {/* ========================================================================= */}
      <section id="course" className="relative bg-gradient-to-b from-white via-sky-50/30 to-white py-6 sm:py-10 lg:py-12 overflow-hidden border-t border-slate-100/60">

        {/* Background Clouds */}
        <div className="absolute top-8 left-1/4 opacity-40 animate-cloud-horizontal">
          <svg width="150" height="75" viewBox="0 0 160 80">
            <path d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 65 134 65 125 65 Z" fill="#FFFFFF" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center space-y-2 mb-8 sm:mb-12">
            <div className="text-xs font-black text-rose-500 tracking-widest uppercase">
              PROGRAMS
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight inline-block relative">
              Our <span className="text-[#1B75BC]">Course</span>

            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

            {/* Left Cloud Photo Frame & Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 relative"
            >
              <div className="relative mx-auto max-w-sm">
                <div className="p-3 bg-white rounded-[40px] shadow-xl border-4 border-sky-100">
                  <div className="overflow-hidden rounded-[28px] aspect-[4/3]">
                    <img
                      src={getAssetUrl('/new-images/course.png')}
                      alt="Kids playing in preschool course"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Yellow Badge: Learning Today A Brighter Tomorrow */}
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-[#FFDF00] border-4 border-white rounded-3xl shadow-lg flex flex-col items-center justify-center text-center p-2 transform -rotate-12">
                  <span className="text-[11px] font-black text-slate-900 leading-tight">Learning</span>
                  <span className="text-[11px] font-black text-slate-900 leading-tight">Today A</span>
                  <span className="text-[10px] font-black text-amber-900 leading-tight">Brighter</span>
                  <span className="text-[10px] font-black text-amber-900 leading-tight">Tomorrow</span>
                  <span className="text-xs text-rose-600">♥</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Program Cards Slider with Navigation Arrows */}
            <div className="lg:col-span-8 relative min-w-0">

              {/* Slider Container with Left & Right Arrow Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-3">

                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevCourse}
                  aria-label="Previous Course"
                  className="shrink-0 p-2 sm:p-3 rounded-xl bg-white border border-sky-200 shadow-md text-sky-700 hover:bg-[#1B75BC] hover:text-white transition-all transform hover:scale-110 active:scale-95 z-20"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Smooth Horizontal Sliding Carousel Track */}
                <div className="overflow-hidden flex-1 py-2 relative">
                  <motion.div
                    className="flex gap-4 sm:gap-5"
                    animate={{
                      x: isMobile
                        ? `calc(-${courseStartIndex} * (100% + 1rem))`
                        : `calc(-${courseStartIndex} * (33.3333% + 0.4166rem))`
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {coursesData.map((course) => (
                      <div
                        key={course.id}
                        className="w-full sm:w-[calc((100%-2.5rem)/3)] shrink-0 bg-white rounded-3xl p-4 border border-sky-100/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-center group min-h-[360px]"
                      >
                        <div>
                          <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-3">
                            <img
                              src={course.img}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1 leading-tight">{course.title}</h3>
                          <div className="inline-block px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-bold mb-2">
                            Typical Age: {course.age}
                          </div>
                          <p className="text-sm font-medium text-slate-900 mb-4 line-clamp-2 leading-relaxed">
  <span className="font-bold text-slate-900">Main Focus: </span>{course.focus}
</p>
                        </div>
                        <Link
                          to="/programs"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-slate-900 font-black text-xs shadow-xs transition-all"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextCourse}
                  aria-label="Next Course"
                  className="shrink-0 p-2 sm:p-3 rounded-xl bg-white border border-sky-200 shadow-md text-sky-700 hover:bg-[#1B75BC] hover:text-white transition-all transform hover:scale-110 active:scale-95 z-20"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

              </div>

              {/* Slider Indicator Dots */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {Array.from({ length: maxCourseIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCourseStartIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${courseStartIndex === idx ? 'w-8 bg-[#1B75BC]' : 'w-2.5 bg-sky-200 hover:bg-sky-400'
                      }`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>

      </section>
{/* ========================================================================= */}
{/* 3B. DAY CARE & AFTER SCHOOL CARE SECTION                                 */}
{/* ========================================================================= */}
<section id="daycare" className="relative bg-gradient-to-b from-[#FFFDF0] via-slate-50/50 to-[#F0F9FF] py-10 sm:py-14 overflow-hidden border-t border-amber-100/60 select-none">

  {/* Subtle Background Glow Spheres */}
  <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>
  <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">

    {/* Section Header */}
    <div className="text-center space-y-2 max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/80 text-amber-900 text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
        <span>EXTENDED CARE & ENRICHMENT</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F2942] tracking-tight">
        Day Care & <span className="bg-gradient-to-r from-[#F37023] to-amber-500 bg-clip-text text-transparent">After School</span>
      </h2>
      <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-md mx-auto">
        Safe, engaging care beyond the classroom.
      </p>
    </div>

    {/* TWO CARDS — IMAGE-LED LAYOUT */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

      {/* CARD 1: DAY CARE */}
      {/* CARD 1: DAY CARE */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="group relative bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-xl shadow-amber-500/5 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-2 hover:scale-[1.02] hover:z-20 transition-all duration-300"
>
  {/* Hero Image */}
<div className="relative w-full aspect-[16/10] overflow-hidden">
  <img
    src={getAssetUrl('/new-images/daycare-boy.jpg')}
    alt="Day Care"
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight leading-snug">
    Learn, Play & Grow in Day Care
  </h3>
</div>
</div>

  <div className="p-5 sm:p-6 space-y-4">
    <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
      Full-day care with loving attention, resting pods and nutritious meals — from 8 AM to 7 PM.
    </p>

    <div className="flex flex-wrap gap-2.5">
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
        <ShieldCheck className="w-4 h-4 text-[#F37023] shrink-0" />
        <span>CCTV & Rest Pods</span>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-900 text-xs sm:text-sm font-bold shadow-sm">
        <Heart className="w-4 h-4 text-[#F37023] shrink-0 fill-current" />
        <span>Nutritious Meals</span>
      </div>
    </div>

    <Link
      to="/daycare"
      className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gradient-to-r from-[#F37023] to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-md shadow-orange-500/20 hover:shadow-lg transition-all"
    >
      <span>Explore Day Care</span>
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</motion.div>

{/* CARD 2: AFTER SCHOOL */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="group relative bg-white rounded-3xl overflow-hidden border border-sky-200/80 shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/25 hover:-translate-y-2 hover:scale-[1.02] hover:z-20 transition-all duration-300"
>
  {/* Hero Image */}
  <div className="relative w-full aspect-[16/10] overflow-hidden">
    <img
      src={getAssetUrl('public/new-images/image1.png')}
      alt="After School"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
    <div className="absolute bottom-3 left-4 right-4">
      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
        Learn, Play & Grow After School
      </h3>
    </div>
  </div>

  <div className="p-5 sm:p-6 space-y-4">
    <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
      Homework support, creative arts and games in a fun evening program with snacks.
    </p>

    <div className="flex flex-wrap gap-2.5">
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 border-2 border-sky-200 text-sky-900 text-xs sm:text-sm font-bold shadow-sm">
        <CheckCircle2 className="w-4 h-4 text-[#1B75BC] shrink-0" />
        <span>Homework Support</span>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 border-2 border-sky-200 text-sky-900 text-xs sm:text-sm font-bold shadow-sm">
        <Trophy className="w-4 h-4 text-[#1B75BC] shrink-0" />
        <span>Arts & Sports</span>
      </div>
    </div>

    <Link
      to="/afterschool"
      className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1B75BC] to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-black text-sm shadow-md shadow-sky-500/20 hover:shadow-lg transition-all"
    >
      <span>Explore After School</span>
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</motion.div>

    </div>

  </div>
</section>
      {/* ========================================================================= */}
      {/* 4. OUR FACILITIES SECTION (EXACT 4 x 2 GRID)                               */}
      {/* ========================================================================= */}
      <section id="facilities" className="relative bg-gradient-to-b from-[#FFFDF0] via-white to-[#F0F9FF] py-6 sm:py-10 overflow-hidden border-t border-amber-100/60 select-none">

        {/* Top Left Doodle Badge: Spaces for Brighter Futures - only on xl desktop to avoid header text overlay */}
        <div className="absolute top-10 left-6 sm:left-12 hidden xl:block pointer-events-none z-10">
          <div className="flex flex-col items-center transform -rotate-6">
            <span className="text-xs sm:text-sm font-black text-sky-800 leading-tight">Spaces</span>
            <span className="text-xs sm:text-sm font-black text-sky-800 leading-tight">for Brighter</span>
            <span className="text-xs sm:text-sm font-black text-rose-500 flex items-center gap-1">
              <span>Futures</span> <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" />
            </span>
          </div>
        </div>

        {/* Top Right Animated Doodle Sun & Badge: Play Learn Grow Together - only on xl desktop to avoid header text overlay */}
        <div className="absolute top-6 right-6 sm:right-12 hidden xl:flex items-center gap-3 pointer-events-none z-10">
          {/* Smiling Yellow Sun */}
          <div className="w-16 h-16 rounded-full bg-[#FFD600] border-4 border-amber-200 shadow-[0_0_20px_rgba(255,214,0,0.5)] flex items-center justify-center relative animate-pulse">
            <div className="flex gap-1.5">
              <div className="w-2 h-2.5 bg-slate-900 rounded-full"></div>
              <div className="w-2 h-2.5 bg-slate-900 rounded-full"></div>
            </div>
          </div>

          {/* Rounded-Rectangle Badge */}
          <div className="bg-rose-100/90 border border-rose-200 px-3.5 py-1.5 rounded-lg shadow-xs text-center transform rotate-3">
            <div className="text-[11px] font-black text-rose-900 leading-tight flex items-center gap-1">
              <span>Play Learn Grow Together</span> <span className="text-rose-600">♥</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">

          {/* Section Header */}
          <div className="text-center space-y-2.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-100/90 border border-amber-200/90 text-amber-900 text-xs font-black uppercase tracking-wider shadow-2xs">
              <HomeIcon className="w-3.5 h-3.5 text-[#F37023]" />
              <span>OUR FACILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight">
              A Safe, Modern & <span className="text-[#F37023]">Inspiring Environment</span>
            </h2>
            <p className="text-black text-base sm:text-lg font-semibold leading-relaxed max-w-2xl mx-auto">
              We provide child-friendly facilities that ensure safety, learning, creativity and overall development.
            </p>
          </div>

          {/* RESPONSIBLE GRID (1 col on 320px/mobile, 2 on sm, 4 on lg) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto items-stretch">

            {[
              {
                id: 1,
                title: "Creative Activity Room",
                description: "A space where imagination grows through art, craft and creative activities.",
                img: getAssetUrl('/new-images/ai_creative_activity.jpg'),
                Icon: Palette,
                iconBg: "bg-[#FFEEC2]",
                iconColor: "text-amber-700"
              },
              {
                id: 2,
                title: "Indoor & Outdoor Play Area",
                description: "Safe and spacious play areas for active play, physical development and lots of fun.",
                img: getAssetUrl('/new-images/ai_play_area.jpg'),
                Icon: Gamepad2,
                iconBg: "bg-[#D1F7C4]",
                iconColor: "text-emerald-700"
              },
              {
                id: 3,
                title: "Kids Library",
                description: "A wide collection of age-appropriate books to build reading habits and spark curiosity.",
                img: getAssetUrl('/new-images/ai_kids_library.jpg'),
                Icon: BookOpen,
                iconBg: "bg-[#FFD6E8]",
                iconColor: "text-rose-600"
              },
              {
                id: 4,
                title: "Smart Classrooms",
                description: "Technology-enabled learning for an engaging and effective education experience.",
                img: getAssetUrl('/new-images/ai_smart_classroom.jpg'),
                Icon: Monitor,
                iconBg: "bg-[#D2EEFF]",
                iconColor: "text-[#0088FF]"
              },
              {
                id: 5,
                title: "School Transport",
                description: "Safe and reliable transport with trained staff and GPS tracking for your child’s safety.",
                img: getAssetUrl('/new-images/ai_school_transport.jpg'),
                Icon: Bus,
                iconBg: "bg-[#E2D9FF]",
                iconColor: "text-indigo-600"
              },
              {
                id: 6,
                title: "CCTV Security",
                description: "24/7 CCTV surveillance to ensure a safe and secure environment for every child.",
                img: getAssetUrl('/new-images/ai_cctv_security.jpg'),
                Icon: ShieldCheck,
                iconBg: "bg-[#D1F7C4]",
                iconColor: "text-emerald-700"
              },
              {
                id: 7,
                title: "Hygienic Environment",
                description: "Clean, safe and well-maintained classrooms, play areas and facilities for healthy living.",
                img: getAssetUrl('/new-images/gallery1.png'),
                Icon: Sparkles,
                iconBg: "bg-[#FFD6E8]",
                iconColor: "text-rose-600"
              },
              {
                id: 8,
                title: "Day Care & After-School Care",
                description: "A loving and supervised space with flexible timings, nutritious snacks and fun learning activities.",
                img: getAssetUrl('/new-images/daycare-afterschool-care.jpg'),
                Icon: Users,
                iconBg: "bg-[#FFEEC2]",
                iconColor: "text-amber-700"
              }
            ].map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-4 sm:p-5 lg:p-5 border border-slate-100/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full max-w-sm sm:max-w-none mx-auto w-full"
              >
                <div>
                  {/* Top Image Frame with Square Icon */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Square Icon Badge */}
                    <div className={`absolute -bottom-3 left-3 w-9 h-9 sm:w-11 sm:h-11 rounded-lg border-2 border-white shadow-md flex items-center justify-center z-10 ${card.iconBg}`}>
                      <card.Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} />
                    </div>
                  </div>

                  {/* Card Title & Description */}
                  <div className="pt-1.5 text-left space-y-1.5">
                    <h3 className="text-sm sm:text-base lg:text-[17px] font-black text-[#0F2942] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-black text-xs sm:text-sm lg:text-[14.5px] font-normal leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LEARNING THROUGH PLAY (FULL WIDTH BANNER)                             */}
      {/* ========================================================================= */}
      <section className="relative py-8 sm:py-12 flex items-center overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-800 text-white select-none">

        {/* Background Image Overlay - Widescreen Outdoor Play Area (No Awkward Cropping) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('${getAssetUrl('/new-images/play-bg.jpg')}')` }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

            {/* Left Image Feature - Full Uncropped 1:1 Square Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="p-2.5 sm:p-3 bg-white/20 backdrop-blur-md rounded-[28px] sm:rounded-[36px] border-2 border-emerald-300/40 shadow-2xl max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] w-full transition-transform duration-300 hover:scale-[1.02]">
                <div className="overflow-hidden rounded-2xl sm:rounded-[26px] aspect-square w-full bg-emerald-950/20 relative shadow-inner">
                  <img
                    src={getAssetUrl('/new-images/new-images.png')}
                    alt="Kids playing outdoors - Learning Through Play"
                    className="w-full h-full object-contain rounded-2xl sm:rounded-[26px] transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right Text Feature */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold shadow-sm">
                <span>Interactive Learning</span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight flex items-center justify-center lg:justify-start gap-3">
                <span>Learning Through Play</span>
                <span className="text-rose-400 animate-bounce">♥</span>
              </h2>

              <p className="text-white text-base sm:text-lg lg:text-xl font-extrabold max-w-xl mx-auto lg:mx-0 drop-shadow-sm">
                Because every child's journey is unique and special!
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. OUR WEEKLY CLASSES & VISION / MISSION                                  */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-sky-50/40 via-white to-sky-50/60 py-6 sm:py-10 overflow-hidden border-t border-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">

          {/* A) WEEKLY CLASSES SLIDER HEADER */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-black text-rose-500 tracking-widest uppercase">
                ACTIVITIES
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight inline-block relative">
                Our <span className="text-[#1B75BC]">Weekly Classes</span>

              </h2>
            </div>

            {/* Classes Row with Navigation Arrows */}
            <div className="relative flex items-center justify-between gap-2 sm:gap-4">

              {/* Left Arrow Button */}
              <button
                onClick={handlePrevWeekly}
                className="w-10 h-10 rounded-xl bg-[#0088FF] text-white flex items-center justify-center shadow-md hover:bg-sky-600 transition-all transform hover:scale-110 active:scale-95 shrink-0 cursor-pointer z-10"
                aria-label="Previous Class"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Smooth Horizontal Sliding Carousel Track */}
              <div className="overflow-hidden flex-1 py-2 relative">
                <motion.div
                  className="flex gap-4 sm:gap-6"
                  animate={{
                    x: isMobile
                      ? `calc(-${weeklyStartIndex} * (100% + 1rem))`
                      : `calc(-${weeklyStartIndex} * (33.3333% + 0.5rem))`
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                >
                  {weeklyClassesData.map((item) => (
                    <div
                      key={item.id}
                      className="w-full sm:w-[calc((100%-3rem)/3)] shrink-0 bg-white rounded-3xl p-3.5 border border-sky-100/80 shadow-xs hover:shadow-md transition-all duration-300 text-center group cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-3 relative">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug py-1">
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={handleNextWeekly}
                className="w-10 h-10 rounded-xl bg-[#0088FF] text-white flex items-center justify-center shadow-md hover:bg-sky-600 transition-all transform hover:scale-110 active:scale-95 shrink-0 cursor-pointer z-10"
                aria-label="Next Class"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

            {/* Slider Indicator Dots */}
            <div className="flex justify-center items-center gap-2 pt-2">
              {Array.from({ length: maxWeeklyIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setWeeklyStartIndex(idx)}
                  aria-label={`Go to weekly slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${weeklyStartIndex === idx ? 'w-8 bg-[#1B75BC]' : 'w-2.5 bg-sky-200 hover:bg-sky-400'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* B) VISION & MISSION GLASS CONTAINER */}
          <div className="bg-gradient-to-r from-sky-50/80 via-white to-purple-50/80 rounded-[36px] p-6 sm:p-10 border-2 border-sky-100 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10 text-left">

              {/* OUR VISION */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center shadow-xs">
                    <Lightbulb className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-rose-500 uppercase tracking-wider">OUR VISION</div>
                    <h3 className="text-2xl font-black text-slate-900">Vision</h3>
                  </div>
                </div>
                <p className="text-black text-sm sm:text-base lg:text-[16.5px] leading-relaxed font-medium">
                  To create a nurturing and stimulating environment where every child discovers their potential, learns with joy, and grows into a confident, compassionate and responsible individual.
                </p>
                <div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0088FF] hover:bg-sky-600 text-white font-black text-sm shadow-md transition-all"
                  >
                    <span>Contact Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* OUR MISSION */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0088FF] uppercase tracking-wider">OUR MISSION</div>
                    <h3 className="text-2xl font-black text-slate-900">Mission</h3>
                  </div>
                </div>
                <p className="text-black text-sm sm:text-base lg:text-[16.5px] leading-relaxed font-medium">
                  To provide high-quality early childhood education through innovative methods, caring educators and a safe, playful environment that builds a strong foundation for a brighter tomorrow.
                </p>
              </div>

            </div>
          </div>

        </div>

      </section>

{/* ========================================================================= */}
{/* 7. GALLERY SECTION (OUR MOMENTS)                                         */}
{/* ========================================================================= */}
<section
  id="gallery"
  className="relative bg-white py-10 sm:py-14 lg:py-16 overflow-hidden border-t border-slate-100"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    {/* Header */}
    <div className="text-center mb-10 sm:mb-12">
      <div className="text-xs sm:text-sm font-black text-rose-500 tracking-widest uppercase mb-2">
        OUR MOMENTS
      </div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F2942] tracking-tight">
        Gallery
      </h2>
    </div>

    {/* 3 × 2 BIG PHOTO GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {[
        {
          id: 1,
          title: "Our School Campus",
          img: getAssetUrl('/new-images/school.png')
        },
        {
          id: 2,
          title: "Outdoor Play Time",
          img: getAssetUrl('/new-images/new-images.png')
        },
        {
          id: 3,
          title: "Creative Learning Space",
          img: getAssetUrl('/new-images/gallery2.png')
        },
        {
          id: 4,
          title: "Classroom Teaching",
          img: getAssetUrl('/new-images/gallery3.png')
        },
        {
          id: 5,
          title: "Interactive Classroom",
          img: getAssetUrl('/new-images/gallery4.png')
        },
        {
          id: 6,
          title: "Fun Learning Activities",
          img: getAssetUrl('/new-images/course.png')
        },
      ].map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.5,
            delay: idx * 0.08
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            aspect-[4/3]
            bg-slate-100
            shadow-md
            border-2
            border-slate-100
            cursor-pointer
          "
        >
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />

          {/* Hover Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-black/10
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
              flex
              items-end
              p-5
            "
          >
            <span className="text-white text-sm sm:text-base font-bold">
              {item.title}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* View All Button */}
    <div className="text-center mt-10 sm:mt-12">
      <Link
        to="/gallery"
        className="
          inline-flex
          items-center
          gap-2
          px-8
          py-3.5
          rounded-xl
          bg-[#0088FF]
          hover:bg-sky-600
          text-white
          font-black
          text-sm
          shadow-md
          hover:shadow-lg
          transition-all
          transform
          hover:-translate-y-0.5
        "
      >
        <span>View All</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

  </div>
</section>

      {/* ========================================================================= */}
      {/* 7B. TESTIMONIALS SECTION (WHAT PARENTS SAY)                               */}
      {/* ========================================================================= */}
      <section id="testimonials" className="relative bg-gradient-to-b from-[#FFFDF0] via-white to-[#F0F9FF] py-6 sm:py-10 overflow-hidden border-t border-amber-100/60 select-none">

        {/* Top-Right Animated Sun Doodle - only on xl desktop to avoid header text overlay */}
        <div className="absolute top-4 right-6 sm:right-12 hidden xl:block pointer-events-none z-10">
          <motion.div
            animate={{ rotate: [0, 8, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-[#FFD600] border-4 border-amber-200 shadow-sm flex items-center justify-center relative">
              <div className="flex gap-1.5">
                <div className="w-2 h-2.5 bg-slate-900 rounded-full"></div>
                <div className="w-2 h-2.5 bg-slate-900 rounded-full"></div>
              </div>
              <div className="absolute bottom-2 text-[10px] font-black text-slate-900"></div>
            </div>
            <div className="px-3 py-1.5 bg-white/90 rounded-lg border border-amber-200 shadow-2xs text-[11px] font-black text-amber-900">
              Happy Parents ♥
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">

          {/* Section Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-100/90 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider shadow-2xs">
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              <span>PARENTS' REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight">
              What <span className="text-[#F37023]">Parents Say</span> About Us
            </h2>
            <p className="text-black text-xs sm:text-sm font-medium leading-relaxed">
              Hear from happy parents who trust Kidwin Preschool with their children's early education and care.
            </p>
          </div>

          {/* 3 Clean Aligned Testimonial Cards Grid (Seamless at 768px, 1024px & Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6 max-w-6xl mx-auto items-stretch">

            {/* CARD 1: PLAYGROUP PARENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-3.5 lg:p-6 border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3.5 overflow-hidden"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  {/* React Icon Stars */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-black text-amber-800 ml-0.5">5.0</span>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </div>
                </div>

                <p className="text-black text-xs sm:text-sm lg:text-base font-medium leading-relaxed">
                  "Kidwin Preschool has transformed my daughter's confidence! The teachers are extraordinarily caring and patient. She looks forward to going to school every single morning!"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 sm:gap-2.5 md:gap-2 lg:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black text-[11px] sm:text-xs shrink-0 shadow-2xs mt-0.5">
                  AR
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-1 sm:gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      Mrs. Anitha R.
                    </h4>
                    <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md border border-sky-100 shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1B75BC]" />
                      <span>Verified</span>
                    </div>
                  </div>
                  <p className="text-[10.5px] sm:text-xs font-medium text-slate-700 mt-0.5 leading-snug">
                    Mother of Samhita (Playgroup)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: DAY CARE PARENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-3.5 lg:p-6 border-2 border-amber-200/90 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-3.5 relative overflow-hidden"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  {/* React Icon Stars */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-black text-amber-800 ml-0.5">Top Rated</span>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </div>
                </div>

                <p className="text-black text-xs sm:text-sm lg:text-base font-medium leading-relaxed">
                  "The Day Care facility is top class! As working parents, knowing our child is in a clean, secure, and nurturing environment with nutritious snacks gives us complete peace of mind."
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 sm:gap-2.5 md:gap-2 lg:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-[11px] sm:text-xs shrink-0 shadow-2xs mt-0.5">
                  RK
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-1 sm:gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      Mr. Rajesh Kumar
                    </h4>
                    <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md border border-sky-100 shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1B75BC]" />
                      <span>Verified</span>
                    </div>
                  </div>
                  <p className="text-[10.5px] sm:text-xs font-medium text-slate-700 mt-0.5 leading-snug">
                    Father of Vivaan (Day Care)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: AFTER SCHOOL PARENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl p-4 sm:p-5 md:p-3.5 lg:p-6 border border-sky-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3.5 overflow-hidden"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  {/* React Icon Stars */}
                  <div className="flex items-center gap-1 bg-sky-50 px-2 py-1 rounded-lg border border-sky-200">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-black text-sky-800 ml-0.5">5.0</span>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 text-[#1B75BC] flex items-center justify-center shrink-0">
                    <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </div>
                </div>

                <p className="text-black text-xs sm:text-sm lg:text-base font-medium leading-relaxed">
                  "The evening School Tuition program boosted my son's mathematics and handwriting foundation tremendously. The tutors give 1-on-1 attention. Highly recommended!"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 sm:gap-2.5 md:gap-2 lg:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-sky-100 text-[#1B75BC] flex items-center justify-center font-black text-[11px] sm:text-xs shrink-0 shadow-2xs mt-0.5">
                  PS
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-1 sm:gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      Mrs. Priya Sharma
                    </h4>
                    <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md border border-sky-100 shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1B75BC]" />
                      <span>Verified</span>
                    </div>
                  </div>
                  <p className="text-[10.5px] sm:text-xs font-medium text-slate-700 mt-0.5 leading-snug">
                    Mother of Aarav (UKG)
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SCHOOL'S MOTTO SECTION (Redesigned — warm, confident keepsake plaque)  */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-white to-sky-50/40 py-8 sm:py-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#0F2942] rounded-[28px] px-6 py-8 sm:px-12 sm:py-10 shadow-xl overflow-hidden"
          >
            {/* Soft ambient accents instead of a flat alert-pink wash */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 text-center sm:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
                <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950" />
              </div>

              <div className="space-y-3 min-w-0">
                <div className="text-[11px] font-black text-amber-300 uppercase tracking-[0.2em]">
                  Our School Motto
                </div>
                <p className="text-white text-lg sm:text-2xl font-black leading-snug">
                  "Give Your Seed To Us, We Will Give You The Tree of Life"
                </p>
                <p className="text-white text-sm sm:text-base lg:text-[17px] font-medium leading-relaxed max-w-2xl">
                  Just like a seed needs care to grow into a strong tree, we give every child the perfect environment for their character and personality to blossom through fun, guided learning.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8.5 TESTIMONIALS SECTION (What Parents Say - Blue Color Theme)            */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-12 sm:py-16 bg-[#FAF9F6] border-t border-slate-200/80 relative overflow-hidden">

        {/* Soft Background Doodles & Glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center space-y-2 mb-10 sm:mb-14 relative">
            <div className="text-xs sm:text-sm font-extrabold text-[#1B75BC] uppercase tracking-widest">
              TESTIMONIALS
            </div>

            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                What <span className="text-[#1B75BC]">Parents</span> Say
              </h2>

              {/* Paper Plane Doodle */}
              <div className="absolute -top-6 -right-14 hidden sm:block pointer-events-none opacity-80">
                <svg className="w-10 h-10 text-[#1B75BC]" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10,35 Q25,20 38,12" strokeDasharray="3 3" />
                  <polygon points="38,8 46,12 36,20 38,14" fill="#1B75BC" />
                </svg>
              </div>
            </div>

            <p className="text-base sm:text-lg text-black font-semibold max-w-lg mx-auto">
              Real stories from real parents.
            </p>

            <div className="w-14 h-1 bg-[#F37023] rounded-full mx-auto mt-2" />
          </div>

          {/* Testimonial Cards (3 Highlight Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-6 sm:p-7 shadow-md hover:shadow-xl hover:shadow-sky-100/70 border border-slate-100 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="text-4xl font-serif text-[#1B75BC] leading-none select-none font-bold">
                  ““
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Utkarsh has improved his vocabulary and basic sentence formation with the help of Kidwin Preschool. He enjoys learning a lot now and looks forward to every class.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-[#1B75BC]">
                  — Parent of Utkarsh
                </h4>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-6 sm:p-7 shadow-md hover:shadow-xl hover:shadow-sky-100/70 border border-slate-100 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="text-4xl font-serif text-[#1B75BC] leading-none select-none font-bold">
                  ““
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Vihan has improved his speaking and pronunciation after attending classes at Kidwin Preschool. The teacher is very supportive and gives regular updates on his progress.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-[#1B75BC]">
                  — Parent of Vihan
                </h4>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-6 sm:p-7 shadow-md hover:shadow-xl hover:shadow-sky-100/70 border border-slate-100 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="text-4xl font-serif text-[#1B75BC] leading-none select-none font-bold">
                  ““
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  My child has become more confident in speaking English. Classes are fun, interactive, and very helpful for early growth.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs sm:text-sm font-black text-[#1B75BC]">
                  — Parent of Anushka
                </h4>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>


        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOOK AN APPOINTMENT BANNER (PRE-FOOTER CTA)                          */}
      {/* ========================================================================= */}
      <section id="contact" className="relative bg-gradient-to-r from-slate-950 via-[#07243A] to-slate-950 text-white py-6 sm:py-8 overflow-hidden border-t border-slate-800">

        {/* Ambient Glow accents */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/80 backdrop-blur-md p-6 sm:p-10 rounded-[36px] border border-slate-800 shadow-2xl">

            {/* Left Contact Info */}
            <div className="space-y-3 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Book an appointment with Kidwin nursery and preschool
              </h2>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="tel:7305145873"
                  className="inline-flex items-center gap-3 text-lg sm:text-xl font-black text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <span>+91 7305145873</span>
                </a>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <Link
                to="/admission"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#FFB800] hover:bg-amber-400 text-white font-black text-sm sm:text-base shadow-xl shadow-amber-400/20 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book a Visit</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VIDHYARAMBAM ADMISSION POPUP MODAL (HOME PAGE ENTRANCE)                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAdmissionPopup && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
            {/* Blurry Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClosePopup}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            ></motion.div>

            {/* Popup Modal Box with Spring Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 max-w-xl sm:max-w-2xl w-full bg-white rounded-3xl sm:rounded-[36px] p-2.5 sm:p-3.5 shadow-2xl border-4 border-amber-300 my-auto overflow-hidden"
            >
              {/* Close Button ('X') */}
              <button
                onClick={handleClosePopup}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center shadow-xl transition-all hover:rotate-90 cursor-pointer border border-white/40"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Animated Interactive Image Container */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePopupClick}
                className={`relative overflow-hidden rounded-2xl sm:rounded-[28px] cursor-pointer group shadow-lg transition-all ${
                  isPopupClicked ? 'ring-4 ring-amber-400 scale-95 shadow-2xl' : ''
                }`}
              >
                <img
                  src={getAssetUrl('/vidhyarambam.png')}
                  alt="Vidhyarambam Admission Opening 2026 - 2027"
                  className="w-full h-auto object-contain rounded-2xl sm:rounded-[28px] transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Light Ripple / Floating CTA Bar Overlay */}
                <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex items-center justify-center z-20 pointer-events-none">
                  <div className="pointer-events-auto inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-[#F37023] hover:bg-[#e05f15] text-white font-black text-sm sm:text-base tracking-wider border-2 border-white shadow-[0_4px_15px_rgba(243,112,35,0.6)] hover:shadow-[0_8px_25px_rgba(243,112,35,0.8)] transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 uppercase">
                    <span>Click to Apply Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;