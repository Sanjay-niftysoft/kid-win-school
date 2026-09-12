import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Palette, 
  Search, 
  Sprout, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Award, 
  Smile, 
  Star,
  Cloud,
  Heart,
  Calendar,
  Check,
  GraduationCap,
  Sparkle,
  Trophy,
  Compass,
  Lightbulb,
  Target
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetPath';
import CtaBanner from './CtaBanner';

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

// Animated Count-up Counter Component (0 -> Target)
const AnimatedCounter = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const end = parseInt(target, 10);
          if (isNaN(end) || end <= 0) {
            setCount(target);
            return;
          }

          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Smooth decelerating ease-out curve
            const currentCount = Math.floor((1 - Math.pow(1 - progress, 3)) * end);
            setCount(currentCount);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const [weeklyStartIndex, setWeeklyStartIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const maxWeeklyIndex = isMobile ? weeklyClassesData.length - 1 : weeklyClassesData.length - 3;

  const handlePrevWeekly = () => {
    setWeeklyStartIndex((prev) => (prev === 0 ? maxWeeklyIndex : prev - 1));
  };

  const handleNextWeekly = () => {
    setWeeklyStartIndex((prev) => (prev >= maxWeeklyIndex ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans select-none overflow-x-hidden relative">

      {/* =========================================================================
          SECTION 1 — HERO SECTION (With Background Photo Overlay)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12 flex items-center justify-center bg-slate-900 border-b border-slate-200">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('/about-banner-hero-bg.jpg')}
            alt="Kidwin Preschool About Us Background"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-95 opacity-80"
          />
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B75BC]/60 via-[#0088FF]/40 to-sky-600/50 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Centered Content */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-3"
        >
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-widest uppercase drop-shadow-md">
            ABOUT US
          </h1>

          {/* Pure White Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
            <Link to="/" className="text-white hover:text-sky-200 transition-colors">HOME</Link>
            <span className="text-white/70 font-bold">/</span>
            <span className="text-white font-black">ABOUT US</span>
          </div>

          {/* Subparagraph */}
          <p className="text-xs sm:text-sm lg:text-base text-white font-medium leading-relaxed max-w-xl mx-auto drop-shadow-xs">
            Providing a safe, joyful, and nurturing environment where children learn, play, and grow every single day.
          </p>
        </motion.div>

      </section>

      {/* =========================================================================
          SECTION 2 — OUR STORY (Big Cloud-Framed Photo & High Contrast Story)
         ========================================================================= */}
      <section className="py-14 sm:py-18 lg:py-22 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: BIG ORGANIC CLOUD SHAPED PHOTO FRAME (Nurturing Environment div REMOVED) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl aspect-[1.15/1]">
              
              {/* Layered Background Cloud Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-300/40 via-rose-200/50 to-amber-200/50 rounded-[65%_35%_60%_40%/50%_60%_40%_50%] blur-xl opacity-80 animate-pulse pointer-events-none" />

              {/* Main Big Cloud Shaped Photo Container */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-[70px_25px_80px_35px] sm:rounded-[90px_35px_100px_45px] overflow-hidden border-4 border-white shadow-2xl bg-white p-2.5 group"
              >
                <div className="w-full h-full rounded-[60px_18px_70px_28px] sm:rounded-[78px_25px_88px_35px] overflow-hidden bg-sky-50">
                  <img
                    src={getAssetUrl('/about-story.jpg')}
                    alt="Children Learning in Classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Text & Official Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-4 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-[#F37023] text-xs font-black tracking-widest uppercase">
              <span>ABOUT US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              More Than a School. <br />
              <span className="text-[#1B75BC]">A Second Home.</span>
            </h2>

            {/* Official KIDWIN Story Text */}
            <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
              KIDWIN is a fusion of a world class curriculum and knowledgeable child development professionals that meet the needs of children at every stage. At KIDWIN, our endeavour is to provide your child a comfortable atmosphere where learning is full of fun.
            </p>
            <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
              Children learn in an eco-friendly environment in consonance with an innovative methodology specially evolved by us. KIDWIN is committed to provide a stable, caring and supportive family-like environment, where students receive mature guidance through daily interaction with able faculty.
            </p>

            {/* Two Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-sky-50 p-4 rounded-2xl border border-sky-200 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#1B75BC] text-white flex items-center justify-center shrink-0 shadow-md mt-0.5">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Safe & Secure Environment</h4>
                  <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-snug mt-1">
                    A warm and secure space where every child feels comfortable and happy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">Creative Learning Programs</h4>
                  <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-snug mt-1">
                    Engaging activities designed to inspire curiosity, creativity and confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Action Button (Rounded Rectangle rounded-2xl) */}
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1B75BC] hover:bg-[#0055AA] text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-sky-300 hover:scale-105 cursor-pointer"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
              </Link>
            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — TRUST STATS (Animated Counter 0 to Target)
         ========================================================================= */}
      <section className="py-12 bg-white border-y-2 border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x-2 divide-slate-200 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-1.5 py-2 px-3">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B75BC] tracking-tight">
                <AnimatedCounter target={25} suffix="+" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                Years of Experience
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5 py-2 px-3">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F37023] tracking-tight">
                <AnimatedCounter target={450} suffix="+" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                Happy Students
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5 py-2 px-3">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#00A859] tracking-tight">
                <AnimatedCounter target={50} suffix="+" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                Caring Professionals
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1.5 py-2 px-3">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-rose-500 tracking-tight">
                <AnimatedCounter target={100} suffix="%" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                Parent Satisfaction
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — WHY PARENTS CHOOSE KIDWIN (High Contrast Feature Cards)
         ========================================================================= */}
      <section className="py-14 sm:py-18 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Cream Container */}
        <div className="rounded-[36px] bg-[#FAF7F2] p-6 sm:p-10 lg:p-14 border-2 border-amber-200/80 shadow-md relative overflow-hidden text-center">
          

          {/* Section Header */}
          <div className="space-y-2 mb-10 max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 text-[#F37023] text-xs font-black tracking-widest uppercase shadow-xs">
              <span>WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Why Families Choose <br />
              <span className="text-[#1B75BC]">Kidwin Preschool</span>
            </h2>
          </div>

          {/* Central Oval Composition with 4 Surrounding Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 max-w-5xl mx-auto">
            
            {/* Left 2 Feature Blocks */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Block 1: Safe Environment */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-sky-200 text-left space-y-2 shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#1B75BC] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#1B75BC]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">SAFE ENVIRONMENT</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  A secure, welcoming environment where children feel safe and supported every day.
                </p>
              </motion.div>

              {/* Block 2: Caring Educators */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-amber-200 text-left space-y-2 shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#F37023] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5 text-[#F37023]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">CARING EDUCATORS</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  Experienced teachers who guide every child with patience, warmth, and genuine care.
                </p>
              </motion.div>

            </div>

            {/* Center Oval Image */}
            <div className="lg:col-span-4 flex justify-center py-4 lg:py-0">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-[50%] overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src={getAssetUrl('/about-mission.jpg')}
                  alt="Happy Children Playing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right 2 Feature Blocks */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Block 3: Creative Activities */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-amber-200 text-left space-y-2 shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">CREATIVE ACTIVITIES</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  Art, music, storytelling and hands-on activities that encourage imagination.
                </p>
              </motion.div>

              {/* Block 4: Happy Children */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-emerald-200 text-left space-y-2 shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Smile className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">HAPPY CHILDREN</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  A joyful learning environment where children build confidence and lasting friendships.
                </p>
              </motion.div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 6 — OUR CURRICULUM (Big Cloud-Framed Photo & Integrated Subjects)
         ========================================================================= */}
      <section className="py-14 sm:py-18 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: BIG CLOUD-FRAMED PHOTO CONTAINER */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[1.15/1]">
              <div className="absolute -inset-3 bg-gradient-to-tr from-amber-200/50 via-sky-200/50 to-emerald-200/50 rounded-[45%_55%_60%_40%/50%_60%_40%_50%] blur-lg opacity-70 pointer-events-none" />
              
              <div className="relative w-full h-full rounded-[35px_80px_25px_70px] overflow-hidden border-4 border-white shadow-2xl bg-white p-2">
                <div className="w-full h-full rounded-[28px_72px_18px_62px] overflow-hidden bg-amber-50">
                  <img
                    src={getAssetUrl('/about-hero.jpg')}
                    alt="Multisensory Preschool Curriculum"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Official Curriculum Content & Subject Pills (Rounded Rectangle rounded-xl) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-100 border border-sky-200 text-[#1B75BC] text-xs font-black tracking-widest uppercase">
              <span>OUR CURRICULUM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Integrated Multi-Sensory <br />
              <span className="text-[#1B75BC]">Curriculum</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
              The curriculum has been designed for an all-round development of the child, taking into account their cognitive, physical, social, emotional and sensorial abilities. Our curriculum goes beyond reading, writing and counting numbers. A major part of your child’s day would include singing, dancing and exploring play activities encouraging them to learn, grow & discover at their own pace.
            </p>
            <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
              The entire curriculum encompasses highly systematic and step-by-step procedures ensuring learning by doing. Developed on the basis of International standards that focus on building Integrated Multi-Sensory Skills in your child.
            </p>

            {/* Curriculum Subject Tags (Rounded Rectangle rounded-xl) */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-4 py-2 rounded-xl bg-sky-100 text-[#1B75BC] text-xs sm:text-sm font-black border border-sky-200 shadow-2xs">
                Language & Phonics
              </span>
              <span className="px-4 py-2 rounded-xl bg-amber-100 text-[#F37023] text-xs sm:text-sm font-black border border-amber-200 shadow-2xs">
                Early Numbers
              </span>
              <span className="px-4 py-2 rounded-xl bg-pink-100 text-pink-700 text-xs sm:text-sm font-black border border-pink-200 shadow-2xs">
                Art & Creative Expression
              </span>
              <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black border border-emerald-200 shadow-2xs">
                Nature & Science
              </span>
              <span className="px-4 py-2 rounded-xl bg-purple-100 text-purple-800 text-xs sm:text-sm font-black border border-purple-200 shadow-2xs">
                Sensory & Life Skills
              </span>
            </div>

            {/* Prominent CTA (Rounded Rectangle rounded-2xl) */}
            <div className="pt-3">
              <Link
                to="/courses/toddler"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1B75BC] hover:bg-[#0055AA] text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-sky-300 hover:scale-105 cursor-pointer"
              >
                <span>Explore Our Curriculum</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — OUR EDUCATORS (Whimsical Preschool Educator Showcase)
         ========================================================================= */}
         
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
        {/* =========================================================================
          SECTION 10 — FINAL SIGNATURE CTA BANNER
         ========================================================================= */}
      <CtaBanner />

    </div>
  );
};

export default About;
