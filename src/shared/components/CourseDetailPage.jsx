import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Leaf,
  Lightbulb,
  Users,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  Smile,
  CheckCircle2,
  MessageCircle,
  Shapes,
  Palette,
  Footprints,
  Pencil,
  Sun,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  Moon,
  Utensils
} from 'lucide-react';
import { coursesData } from '../../data/coursesData';
import { getAssetUrl } from '../../utils/assetPath';
import CtaBanner from './CtaBanner';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const location = useLocation();

  // Selected course object fallback logic supporting /daycare, /afterschool, /tuition
  let currentKey = courseId;
  if (!currentKey || !coursesData[currentKey]) {
    const path = location.pathname.toLowerCase();
    if (path.includes('daycare')) currentKey = 'daycare';
    else if (path.includes('after') || path.includes('tuition')) currentKey = 'afterschool';
    else currentKey = 'toddler';
  }
  const course = coursesData[currentKey] || coursesData['toddler'];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentKey]);

  // Daily Routine Schedule (7 Steps specified for preschool website)
  const dailyRoutineSchedule = [
    {
      step: '01',
      time: '08:00 AM',
      title: 'Morning Reception & Check-in',
      desc: 'Warm welcome, health check, and open play exploration.',
      icon: 'sun',
      color: 'bg-sky-100/90 text-sky-800 border-sky-200',
      stepBg: 'bg-[#3B82F6]',
      iconBg: 'bg-sky-100 text-sky-600',
      badgeColor: 'border-sky-300'
    },
    {
      step: '02',
      time: '09:30 AM',
      title: 'Breakfast & Fruit Time',
      desc: 'Nutritious breakfast, milk routine & table manners.',
      icon: 'heart',
      color: 'bg-rose-100/90 text-rose-800 border-rose-200',
      stepBg: 'bg-[#EC4899]',
      iconBg: 'bg-rose-100 text-rose-600',
      badgeColor: 'border-rose-300'
    },
    {
      step: '03',
      time: '10:30 AM',
      title: 'Sensory & Guided Play',
      desc: 'Building blocks, finger paint & shape puzzle sorting.',
      icon: 'shapes',
      color: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
      stepBg: 'bg-[#10B981]',
      iconBg: 'bg-emerald-100 text-emerald-600',
      badgeColor: 'border-emerald-300'
    },
    {
      step: '04',
      time: '12:30 PM',
      title: 'Wholesome Lunch Routine',
      desc: 'Healthy lunch routine & handwashing hygiene.',
      icon: 'utensils',
      color: 'bg-purple-100/90 text-purple-800 border-purple-200',
      stepBg: 'bg-[#A855F7]',
      iconBg: 'bg-purple-100 text-purple-600',
      badgeColor: 'border-purple-300'
    },
    {
      step: '05',
      time: '01:30 PM',
      title: 'Cozy Nap & Rest Time',
      desc: 'Climate-controlled rest pods with soft music.',
      icon: 'moon',
      color: 'bg-sky-200 text-sky-900 border-sky-300',
      stepBg: 'bg-[#0EA5E9]',
      iconBg: 'bg-sky-200 text-sky-600',
      badgeColor: 'border-sky-400',
      isFeatured: true
    },
    {
      step: '06',
      time: '04:00 PM',
      title: 'Evening Snack & Story Hour',
      desc: 'Fresh snacks, storybooks & circle chat time.',
      icon: 'book',
      color: 'bg-amber-100/90 text-amber-800 border-amber-200',
      stepBg: 'bg-[#F97316]',
      iconBg: 'bg-amber-100 text-amber-600',
      badgeColor: 'border-amber-300'
    },
    {
      step: '07',
      time: '06:00 PM',
      title: 'Indoor Games & Pickup',
      desc: 'Creative games, packing bags & cheerful parent handover.',
      icon: 'smile',
      color: 'bg-yellow-100/90 text-yellow-800 border-yellow-200',
      stepBg: 'bg-[#EAB308]',
      iconBg: 'bg-yellow-100 text-yellow-700',
      badgeColor: 'border-yellow-300'
    }
  ];

  // Course info cards array for 2-column elevated container
  const courseInfoCards = [
    {
      id: 1,
      label: 'AGE GROUP',
      value: course.courseInfo.ageGroup,
      desc: 'Tailored play & care for early learning development',
      icon: 'smile',
      tagBg: 'bg-rose-100 text-rose-600',
      cardTheme: 'from-rose-50/90 via-white to-pink-50/60 border-rose-200/90 hover:border-rose-400 hover:shadow-[0_20px_45px_rgba(244,63,94,0.18)]',
    },
    {
      id: 2,
      label: 'CLASS TIMINGS',
      value: course.courseInfo.classTimings,
      desc: 'Flexible half day or full day routine sessions',
      icon: 'clock',
      tagBg: 'bg-sky-100 text-sky-600',
      cardTheme: 'from-sky-50/90 via-white to-blue-50/60 border-sky-200/90 hover:border-sky-400 hover:shadow-[0_20px_45px_rgba(14,165,233,0.18)]',
    },
    {
      id: 3,
      label: 'CLASS SIZE',
      value: course.courseInfo.classSize,
      desc: 'Small group ratio for loving individual care',
      icon: 'users',
      tagBg: 'bg-emerald-100 text-emerald-600',
      cardTheme: 'from-emerald-50/90 via-white to-teal-50/60 border-emerald-200/90 hover:border-emerald-400 hover:shadow-[0_20px_45px_rgba(16,185,129,0.18)]',
    },
    {
      id: 4,
      label: 'DAYS',
      value: course.courseInfo.days,
      desc: 'Structured weekday learning & fun activities',
      icon: 'calendar',
      tagBg: 'bg-purple-100 text-purple-600',
      cardTheme: 'from-purple-50/90 via-white to-amber-50/60 border-purple-200/90 hover:border-purple-400 hover:shadow-[0_20px_45px_rgba(168,85,247,0.18)]',
    },
  ];

  // Helper icon generator
  const renderIcon = (iconType, className = "w-6 h-6") => {
    switch (iconType) {
      case 'heart':
        return <Heart className={className} />;
      case 'leaf':
        return <Leaf className={className} />;
      case 'bulb':
        return <Lightbulb className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'shapes':
        return <Shapes className={className} />;
      case 'runner':
        return <Footprints className={className} />;
      case 'message':
        return <MessageCircle className={className} />;
      case 'palette':
        return <Palette className={className} />;
      case 'pencil':
        return <Pencil className={className} />;
      case 'book':
        return <BookOpen className={className} />;
      case 'sparkles':
        return <Sparkles className={className} />;
      case 'sun':
        return <Sun className={className} />;
      case 'moon':
        return <Moon className={className} />;
      case 'utensils':
        return <Utensils className={className} />;
      default:
        return <Smile className={className} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={course.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="min-h-screen bg-white text-slate-900 pb-6 selection:bg-amber-100 selection:text-amber-900 select-none overflow-x-hidden"
      >

        {/* ========================================================================= */}
        {/* 1. HERO SECTION — HIGH-END PLAYFUL PRE-SCHOOL DESIGN                     */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF5FC] via-[#FDF8F0] to-white border-b border-sky-100/70 pt-10 sm:pt-12 pb-10 lg:pt-16 lg:pb-16 select-none">
          
          {/* Drifting Background Clouds */}
          <div className="absolute top-2 left-8 opacity-80 animate-cloud-horizontal pointer-events-none hidden sm:block">
            <svg width="130" height="65" viewBox="0 0 160 80">
              <path
                d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 32 154 44 150 56 C 146 65 134 65 125 65 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          <div className="absolute top-6 left-1/2 opacity-75 animate-cloud-horizontal pointer-events-none hidden lg:block" style={{ animationDelay: '6s' }}>
            <svg width="110" height="55" viewBox="0 0 160 80">
              <path
                d="M 25 65 C 12 65 2 54 2 40 C 2 28 12 18 24 19 C 30 7 48 2 62 10 C 72 2 92 3 102 14 C 114 8 132 15 134 30 C 146 65 134 65 125 65 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          {/* Animated Sun in Top Left/Center */}
          <div className="absolute top-8 left-1/4 z-0 pointer-events-none hidden lg:block opacity-90 animate-[spin_20s_linear_infinite]">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <circle cx="35" cy="35" r="16" fill="#FFCA28" stroke="#FFB300" strokeWidth="2" />
              {[...Array(8)].map((_, i) => (
                <path key={i} d="M35 5 L35 13" stroke="#FFCA28" strokeWidth="5" strokeLinecap="round" transform={`rotate(${i * 45} 35 35)`} />
              ))}
            </svg>
          </div>

          {/* Animated Sunflower in Top Right */}
          <div className="absolute top-10 right-8 sm:right-16 z-0 pointer-events-none hidden sm:block opacity-95 animate-[bounce_5s_ease-in-out_infinite]">
            <div className="relative w-20 h-20 animate-[spin_15s_linear_infinite] flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-4 h-10 bg-gradient-to-t from-amber-500 to-yellow-300 rounded-full" style={{ transform: `rotate(${i * 45}deg)` }} />
              ))}
              <div className="absolute w-8 h-8 bg-[#8B4513] rounded-full border-[3px] border-amber-600" />
            </div>
          </div>

          {/* Animated Bouncing Ball in Bottom Left */}
          <div className="absolute bottom-5 left-10 z-0 pointer-events-none hidden sm:flex flex-col items-center opacity-95">
            <div className="animate-bounce" style={{ animationDuration: '1.5s' }}>
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="animate-[spin_4s_linear_infinite]">
                <circle cx="26" cy="26" r="23" fill="#FF5252" stroke="#FFFFFF" strokeWidth="3" />
                <path d="M26 3 C36 12 36 40 26 49" fill="#FFCA28" />
                <path d="M26 3 C16 12 16 40 26 49" fill="#42A5F5" />
                <circle cx="26" cy="26" r="8" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="w-8 h-1.5 rounded-full bg-slate-300 animate-pulse mt-1"></div>
          </div>

          {/* Animated Floating Leaf in Right Middle */}
          <div className="absolute top-1/2 right-10 z-0 pointer-events-none hidden lg:block opacity-85 animate-[bounce_4s_ease-in-out_infinite]">
            <svg width="50" height="50" viewBox="0 0 40 40" fill="none" className="animate-[spin_8s_linear_infinite] origin-center">
              <path d="M20 35 C10 35 5 25 5 15 C15 15 25 20 20 35 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2" />
              <path d="M20 35 C30 35 35 25 35 15 C25 15 15 20 20 35 Z" fill="#81C784" />
              <path d="M5 15 Q20 20 20 35" stroke="#388E3C" strokeWidth="2" fill="none" />
            </svg>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN (7 cols desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6 text-left py-2"
              >

                {/* Main Course Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#0F2942] tracking-tight leading-[1.15]">
                  {course.title.includes('/') ? (
                    <>
                      {course.title.split('/')[0]} /{' '}
                      <span className="text-[#FF6600] relative inline-block">
                        {course.title.split('/')[1]}
                        <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-amber-300 opacity-80" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="7" fill="none" />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <span className="text-[#FF6600]">{course.title}</span>
                  )}
                </h1>

                {/* Elegant Motto Ribbon */}
                <div className="flex items-center gap-3 my-2">
                  <div className="w-1.5 h-8 rounded-full bg-[#1B75BC] shrink-0"></div>
                  <p className="text-[#1B75BC] font-black italic text-base sm:text-lg lg:text-xl leading-snug">
                    "Give Your Seed To Us, We Will Give You The Tree of Life"
                  </p>
                </div>

                {/* Description Paragraph */}
                <div className="space-y-3 pt-1">
                  <p className="text-slate-800 font-medium text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                    {course.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF1775] to-[#E0125F] hover:from-[#e0125f] hover:to-[#c00f52] text-white font-black text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:scale-105 transition-all border border-rose-400/30 cursor-pointer"
                  >
                    <Calendar className="w-5 h-5 text-white" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </Link>

                  <Link
                    to="/admission"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-base shadow-xs hover:shadow-md transition-all border-2 border-slate-200 hover:scale-105 cursor-pointer"
                  >
                    <span>Admission Open</span>
                  </Link>
                </div>

                {/* 3 Glossy Trust Micro-Cards */}
                <div className="pt-6 border-t border-sky-100/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-800">Safe Environment</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Shapes className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-800">Play-Based Learning</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-800">Experienced Teachers</span>
                  </div>
                </div>

              </motion.div>

              {/* RIGHT COLUMN: Enhanced Hero Photo Card with Floating Motto Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0"
              >
                <div className="relative w-full max-w-[460px] lg:max-w-none">
                  
                  {/* Layered Background Glow Blob */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-amber-300/40 via-rose-300/30 to-sky-300/40 rounded-[48px] transform rotate-2 blur-md -z-10" />

                  {/* Enhanced Double-Border Photo Frame with Glass Shimmer */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative p-3 sm:p-4 rounded-[40px] sm:rounded-[48px] bg-white border-4 border-sky-100 shadow-[0_20px_50px_rgba(27,117,188,0.22)] group"
                  >
                    <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] aspect-[4/3] sm:aspect-[1.15/1] relative bg-amber-50">
                      <img
                        src={getAssetUrl(course.heroImage)}
                        alt={course.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Floating Motto Badge: Give Your Seed To us, We Will give You The "Tree of life" */}
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 2 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 140 }}
                    className="absolute -top-5 -left-3 sm:-top-6 sm:-left-5 z-20"
                  >
                    <div className="bg-gradient-to-r from-[#4CAE38] to-[#3B9E28] text-white px-3.5 sm:px-4.5 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-white transform rotate-1 text-center">
                      <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider leading-tight text-white drop-shadow-xs">
                        Give Your Seed To us,
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-black text-amber-200 leading-tight mt-0.5 drop-shadow-xs uppercase">
                        We Will give You The
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5 drop-shadow-xs italic">
                        "Tree of life"
                      </div>
                      <div className="text-xs mt-0.5 text-rose-200">♥</div>
                    </div>
                  </motion.div>

                  {/* Play • Learn • Grow Bottom Badge */}
                  <motion.div
                    initial={{ scale: 0, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 z-20"
                  >
                    <div className="bg-white/95 backdrop-blur-md border-2 border-sky-200 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-lg text-center transform -rotate-2">
                      <div className="text-xs sm:text-sm font-black text-[#0088FF]">
                        Play • <span className="text-[#FF6600]">Learn</span> • <span className="text-[#00A859]">Grow</span> <span className="text-xs text-rose-500">♥</span>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 2. SECTION 1 — COURSE INFORMATION & OVERVIEW (2-COLUMN SHOWCASE)          */}
        {/* ========================================================================= */}
        <section className="py-6 lg:py-8 relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-amber-50/70 via-white to-sky-50/60 border-2 border-amber-200/80 rounded-[32px] sm:rounded-[40px] p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_rgba(27,117,188,0.12)] overflow-hidden">
            
            {/* Soft Floating Organic Background Blobs */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-300/30 rounded-full blur-3xl pointer-events-none animate-soft-bob" />
            <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-sky-300/30 rounded-full blur-3xl pointer-events-none animate-soft-bob" style={{ animationDelay: '3s' }} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Asymmetric Intro Header */}
              <div className="lg:col-span-5 text-left space-y-4">
                
                {/* Header Pill Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-amber-100 border border-amber-300/80 text-amber-950 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  <span>Course Information & Overview</span>
                </div>

                {/* Section Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-[#0F2942] tracking-tight leading-[1.15]">
                  Program Details & <br className="hidden sm:inline" />
                  <span className="text-[#FF6600] relative inline-block">
                    At-a-Glance
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-amber-300/90" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="6" fill="none" />
                    </svg>
                  </span>
                </h2>

                {/* Description */}
                <p className="text-slate-700 font-normal text-sm sm:text-base leading-relaxed" style={{color:'black'}}>
                  Everything you need to know about our program schedule, age suitability, group ratios, and operating days to give your child a warm, inspiring start.
                </p>

                {/* Reassurance Micro Cards */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-sky-100/90 text-[#1B75BC] border border-sky-200">
                    <ShieldCheck className="w-4 h-4 text-[#1B75BC]" />
                    100% Individual Care
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-emerald-100/90 text-emerald-800 border border-emerald-200">
                    Flexible Timings
                  </span>
                </div>

                {/* Action CTA Link */}
                <div className="pt-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#1B75BC] to-[#0F5A9C] hover:from-[#1565a8] hover:to-[#0d4f8a] text-white font-black text-sm sm:text-base shadow-md shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all cursor-pointer border border-blue-400/30"
                  >
                    <span>Enquire About This Course</span>
                    <ArrowRight className="w-4.5 h-4.5 text-white" />
                  </Link>
                </div>

              </div>

              {/* Right Column: 2x2 Staggered Course Info Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {courseInfoCards.map((item, idx) => {
                  const staggerShift = idx % 2 === 1 ? 'sm:mt-4 lg:mt-5' : '';

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      className={`group relative rounded-[28px] p-5 sm:p-6 bg-gradient-to-br ${item.cardTheme} border-2 shadow-[0_10px_30px_rgba(15,41,66,0.06)] hover:-translate-y-2.5 transition-all duration-300 overflow-hidden flex flex-col justify-between text-left ${staggerShift}`}
                    >
                      {/* Hover Glass Shimmer Beam */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

                      {/* Header Row: Icon */}
                      <div className="flex items-start justify-between gap-3 mb-4 z-0">
                        <div className={`w-13 h-13 rounded-2xl ${item.tagBg} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          {renderIcon(item.icon, "w-6 h-6")}
                        </div>
                      </div>

                      {/* Title & Main Value */}
                      <div className="space-y-1 z-0 my-1">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                          {item.label}
                        </span>
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl leading-snug group-hover:text-[#1B75BC] transition-colors">
                          {item.value}
                        </h3>
                        <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed pt-0.5">
                          {item.desc}
                        </p>
                      </div>

                      {/* Footer micro-label */}
                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-extrabold text-slate-600 group-hover:text-[#1B75BC] transition-colors z-0">
                        <span>Program Detail</span>
                      </div>

                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 3. WHAT YOUR CHILD WILL LEARN                                             */}
        {/* ========================================================================= */}
        <section className="py-6 lg:py-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-left">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-950 text-xs font-black tracking-wider uppercase">
                  <span>Curriculum Domains</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight leading-tight">
                  What Your Child <span className="text-[#FF6600]">Will Learn</span>
                </h2>
              </div>
              <p className="text-slate-800 font-semibold text-sm sm:text-base leading-relaxed max-w-lg">
                <span className="text-[#1B75BC] font-bold italic">"Give Your Seed To Us, We Will Give You The Tree of Life"</span> 
              </p>
            </div>

            {/* 6 Rich Learning Cards Grid with 3D Shadows & Light Sweep */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {course.learning.map((item, idx) => {
                // Dynamic theme hover shadow glow styles
                const shadowGlows = [
                  'hover:shadow-[0_20px_45px_rgba(251,191,36,0.25)] hover:border-amber-400',
                  'hover:shadow-[0_20px_45px_rgba(52,211,153,0.25)] hover:border-emerald-400',
                  'hover:shadow-[0_20px_45px_rgba(192,132,252,0.25)] hover:border-purple-400',
                  'hover:shadow-[0_20px_45px_rgba(251,113,133,0.25)] hover:border-rose-400',
                  'hover:shadow-[0_20px_45px_rgba(56,189,248,0.25)] hover:border-sky-400',
                  'hover:shadow-[0_20px_45px_rgba(244,114,182,0.25)] hover:border-pink-400',
                ];
                const hoverShadowStyle = shadowGlows[idx % shadowGlows.length];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className={`group relative rounded-3xl sm:rounded-[32px] p-6 border-2 ${item.borderColor} ${item.cardBg} bg-white shadow-[0_10px_30px_rgba(15,41,66,0.06)] ${hoverShadowStyle} hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer`}
                  >
                    {/* Glass Light Sweep / Shimmer Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/85 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

                    {/* Top Row: Icon */}
                    <div className="flex items-start justify-start mb-4 z-0">
                      <div className={`w-13 h-13 rounded-2xl ${item.iconBg} flex items-center justify-center font-extrabold shadow-md shadow-slate-900/10 group-hover:scale-115 group-hover:rotate-6 transition-all duration-300`}>
                        {renderIcon(item.icon, "w-6 h-6")}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2 z-0 my-1">
                      <h3 className="font-black text-slate-900 text-xl sm:text-2xl group-hover:text-[#1B75BC] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Row: Check Goal */}
                    <div className="mt-5 pt-3.5 border-t border-slate-200/70 flex items-center justify-between z-0">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Core Developmental Goal</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. SECTION 2 — DAILY ROUTINE & CARE (7-STEP CONNECTED TIMELINE)         */}
        {/* ========================================================================= */}


        {/* ========================================================================= */}
        {/* 5. FUN ACTIVITIES — ASYMMETRIC / RICH CARDS SHOWCASE                     */}
        {/* ========================================================================= */}
        <section className="py-6 lg:py-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            <div className="text-left space-y-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Fun <span className="text-[#F37023]">Activities</span>
              </h2>
              <p className="text-black font-normal text-sm sm:text-base">
                {course.activitiesSubtitle || "Play, explore, create and discover something new every day."}
              </p>
            </div>

            {/* 4 Activity Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {course.activities.map((act) => (
                <div
                  key={act.id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between h-full"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(act.image)}
                      alt={act.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getAssetUrl('/cta-child-hero.jpg');
                      }}
                    />
                  </div>

                  {/* Content Panel */}
                  <div className="p-4 sm:p-5 text-left space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg sm:text-xl group-hover:text-[#1B75BC] transition-colors leading-snug">
                        {act.name}
                      </h3>
                      <p className="text-slate-800 font-medium text-sm sm:text-[15px] leading-relaxed mt-1.5">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 6. NEW PARENT VALUE SECTION — "WHY PARENTS CHOOSE KIDWIN"                 */}
        {/* ========================================================================= */}
        <section className="py-6 lg:py-8 bg-gradient-to-b from-slate-50/70 via-sky-50/40 to-white border-y border-slate-100">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Why Parents Choose <span className="text-[#F37023]">Kidwin</span>
              </h2>
              <p className="text-black font-normal text-sm sm:text-base">
                Discover why families trust Kidwin Preschool for their child's foundational early learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* LEFT: Enhanced Preschool Photo Card with Frame and Motto Badge */}
              <div className="lg:col-span-5 relative">
                <div className="relative p-3 sm:p-4 rounded-[40px] bg-white border-4 border-amber-200/90 shadow-2xl group">
                  <div className="overflow-hidden rounded-[28px] aspect-[4/3] sm:aspect-[1.1/1] relative bg-sky-50">
                    <img
                      src={getAssetUrl(course.parentBenefitsImage || course.heroImage || '/cta-child-hero.jpg')}
                      alt="Happy children and parents"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getAssetUrl('/cta-child-hero.jpg');
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Keepsake Badge on Picture 2 */}
                  <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 z-20">
                    <div className="bg-white/95 backdrop-blur-md border-2 border-emerald-300 px-4 py-2 rounded-2xl shadow-xl text-center transform -rotate-2">
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700 leading-tight">
                        Give Your Seed To us, 
                      </div>
                      <div className="text-xs sm:text-[13px] font-black text-slate-900 italic mt-0.5 leading-tight">
                        We Will give You The "Tree of life"  <span className="text-rose-500 not-italic">♥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: 4 Parent Benefit Rows */}
              <div className="lg:col-span-7 space-y-4 text-left">
                {course.parentBenefits?.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-[0_15px_35px_rgba(27,117,188,0.12)] hover:-translate-y-1 hover:border-sky-300 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#1B75BC] text-white font-black text-base flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#FF6600] group-hover:scale-105 transition-all duration-300">
                      {p.num}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-[#1B75BC] transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>





        {/* ========================================================================= */}
        {/* 8. SECTION 3 — FINAL HIGH-CONVERSION CTA BANNER                          */}
        {/* ========================================================================= */}
        <CtaBanner />

      </motion.div>
    </AnimatePresence>
  );
};

export default CourseDetailPage;
