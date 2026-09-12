import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Smile, ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetPath';
import CtaBanner from './CtaBanner';

const testimonialsData = [
  {
    id: 1,
    name: 'Parent of Utkarsh',
    child: 'Utkarsh',
    program: 'Playgroup Student',
    rating: 5,
    quote: 'Utkarsh has improved his vocabulary and basic sentence formation with the help of Kidwin Preschool. He enjoys learning a lot now and looks forward to every class.'
  },
  {
    id: 2,
    name: 'Parent of Vihan',
    child: 'Vihan',
    program: 'Nursery Student',
    rating: 5,
    quote: 'Vihan has improved his speaking and pronunciation after attending classes at Kidwin Preschool. The teachers are very supportive and give regular updates on his progress.'
  },
  {
    id: 3,
    name: 'Parent of Anushka',
    child: 'Anushka',
    program: 'LKG Student',
    rating: 5,
    quote: 'My child has become more confident in speaking and social interactions. Classes are fun, interactive, and very helpful for early childhood development.'
  },
  {
    id: 4,
    name: 'Parent of Aarav',
    child: 'Aarav',
    program: 'Toddler Student',
    rating: 5,
    quote: 'The warmth, care, and individual attention Kidwin Preschool provides is amazing. My son loves going to school every morning with a big smile!'
  },
  {
    id: 5,
    name: 'Parent of Diya',
    child: 'Diya',
    program: 'UKG Student',
    rating: 5,
    quote: 'The activity-based learning approach helped Diya develop creativity, phonics skills, and confidence early on. We are extremely grateful to the entire team.'
  },
  {
    id: 6,
    name: 'Parent of Kaviya',
    child: 'Kaviya',
    program: 'Day Care & Playgroup',
    rating: 5,
    quote: 'Kidwin Preschool provides the perfect balance of fun, foundational learning, and safety. Highly recommended for every parent looking for a quality preschool.'
  }
];

const Testimonials = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans select-none overflow-x-hidden">

      {/* =========================================================================
          1. HERO SECTION (With Background Photo Overlay like Gallery Page)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12 flex items-center justify-center bg-slate-900 border-b border-slate-200">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('/testimonials-hero-bg.jpg')}
            alt="Kidwin Preschool Parents and Happy Children"
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
            TESTIMONIALS
          </h1>

          {/* Pure White Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
            <Link to="/" className="text-white hover:text-sky-200 transition-colors">HOME</Link>
            <span className="text-white/70 font-bold">/</span>
            <span className="text-white font-black">TESTIMONIALS</span>
          </div>

          {/* Subparagraph */}
          <p className="text-xs sm:text-sm lg:text-base text-white font-medium leading-relaxed max-w-xl mx-auto drop-shadow-xs">
            Real stories from real parents. Discover why Chennai parents trust Kidwin Preschool for their child's early education.
          </p>
        </motion.div>

      </section>

      {/* =========================================================================
          2. TESTIMONIAL CARDS GRID SECTION (Blue Accent Palette)
         ========================================================================= */}
      <section className="py-10 sm:py-14 lg:py-18 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Header & Title */}
        <div className="relative z-10 text-center space-y-2 mb-10 sm:mb-14">
          
          {/* Top Subtitle Text (Clean Uppercase, No Pill, No Sparkles Icon) */}
          <div className="text-xs sm:text-sm font-extrabold text-[#1B75BC] uppercase tracking-widest">
            TESTIMONIALS
          </div>

          {/* Main Title */}
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              What <span className="text-[#1B75BC]">Parents</span> Say
            </h2>

            {/* Paper Airplane Doodle */}
            <div className="absolute -top-6 -right-12 sm:-right-16 hidden sm:block pointer-events-none opacity-80">
              <svg className="w-10 h-10 text-[#1B75BC]" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10,35 Q25,20 38,12" strokeDasharray="3 3" />
                <polygon points="38,8 46,12 36,20 38,14" fill="#1B75BC" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3-Column Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-6 sm:p-7 shadow-md hover:shadow-xl hover:shadow-sky-100/70 border border-slate-100 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="space-y-4 relative z-10">
                
                {/* Blue Double Quote Icon */}
                <div className="text-4xl font-serif text-[#1B75BC] leading-none select-none font-bold">
                  ““
                </div>

                {/* Parent Quote Text */}
                <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Card Footer: Parent Name & Stars */}
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#1B75BC] tracking-tight">
                      — {item.name}
                    </h4>
                    <span className="text-[11px] font-bold text-black">
                      {item.program}
                    </span>
                  </div>
                </div>

                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* =========================================================================
            3. CALL TO ACTION SECTION (Signature Blue Gradient CTA Banner)
           ========================================================================= */}
        <CtaBanner />

      </section>

    </div>
  );
};

export default Testimonials;
