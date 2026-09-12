import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetPath';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#00A859] text-slate-700 relative overflow-hidden select-none">

      {/* ========================================================================= */}
      {/* 1. FLUFFY HORIZONTAL CLOUDS (Moving Left to Right - Perfect 8:3 Aspect)    */}
      {/* ========================================================================= */}
      {/* Cloud 1 (Left / Fast) */}
      <motion.div
        animate={{ x: ['-20vw', '105vw'] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 left-0 opacity-95 pointer-events-none z-10 drop-shadow-md"
      >
        <svg width="260" height="98" viewBox="0 0 160 60" fill="none">
          <path
            d="M 25 50 H 135 C 148 50 155 38 148 26 C 142 14 124 14 116 22 C 106 8 86 8 74 18 C 64 8 46 8 36 20 C 26 12 12 18 10 32 C 4 40 10 50 25 50 Z"
            fill="#FFFFFF"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Cloud 2 (Middle Large / Medium Speed) */}
      <motion.div
        animate={{ x: ['-25vw', '105vw'] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear", delay: 10 }}
        className="absolute top-10 left-0 opacity-90 pointer-events-none z-10 drop-shadow-md"
      >
        <svg width="320" height="120" viewBox="0 0 160 60" fill="none">
          <path
            d="M 25 50 H 135 C 148 50 155 38 148 26 C 142 14 124 14 116 22 C 106 8 86 8 74 18 C 64 8 46 8 36 20 C 26 12 12 18 10 32 C 4 40 10 50 25 50 Z"
            fill="#FFFFFF"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Cloud 3 (Medium / Slow) */}
      <motion.div
        animate={{ x: ['-15vw', '105vw'] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear", delay: 18 }}
        className="absolute top-2 left-0 opacity-85 pointer-events-none z-10 drop-shadow-md"
      >
        <svg width="210" height="79" viewBox="0 0 160 60" fill="none">
          <path
            d="M 25 50 H 135 C 148 50 155 38 148 26 C 142 14 124 14 116 22 C 106 8 86 8 74 18 C 64 8 46 8 36 20 C 26 12 12 18 10 32 C 4 40 10 50 25 50 Z"
            fill="#FFFFFF"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>


      {/* ========================================================================= */}
      {/* 2. BUTTERFLIES NEAR GRASS — hovering, rising, flapping near the greenery  */}
      {/* ========================================================================= */}

      {/* Butterfly A — left side, slow rise and drift */}
      <div className="absolute z-20 pointer-events-none" style={{ bottom: '18%', left: '8%' }}>
        <motion.div
          animate={{ y: [0, -18, -8, -22, -4, -16, 0], x: [0, 6, -4, 8, -6, 4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            animate={{ scaleY: [1, 0.7, 1, 0.7, 1] }}
            transition={{ duration: 0.38, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block', fontSize: '1.3rem', lineHeight: 1, transformOrigin: 'center' }}
          >🦋</motion.span>
        </motion.div>
      </div>

      {/* Butterfly B — center-left, faster flutter */}
      <div className="absolute z-20 pointer-events-none" style={{ bottom: '22%', left: '22%' }}>
        <motion.div
          animate={{ y: [0, -14, -4, -20, -6, -12, 0], x: [0, -5, 7, -3, 6, -7, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <motion.span
            animate={{ scaleY: [1, 0.65, 1, 0.65, 1] }}
            transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            style={{ display: 'inline-block', fontSize: '1.1rem', lineHeight: 1, transformOrigin: 'center' }}
          >🦋</motion.span>
        </motion.div>
      </div>

      {/* Butterfly C — center, graceful wide arc */}
      <div className="absolute z-20 pointer-events-none" style={{ bottom: '20%', left: '45%' }}>
        <motion.div
          animate={{ y: [0, -24, -10, -28, -8, -18, 0], x: [0, 8, -6, 10, -8, 5, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <motion.span
            animate={{ scaleY: [1, 0.72, 1, 0.72, 1] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
            style={{ display: 'inline-block', fontSize: '1.4rem', lineHeight: 1, transformOrigin: 'center' }}
          >🦋</motion.span>
        </motion.div>
      </div>

      {/* Butterfly D — right side, small quick flap */}
      <div className="absolute z-20 pointer-events-none" style={{ bottom: '24%', left: '68%' }}>
        <motion.div
          animate={{ y: [0, -12, -5, -18, -3, -14, 0], x: [0, -7, 5, -9, 6, -4, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 2.0 }}
        >
          <motion.span
            animate={{ scaleY: [1, 0.6, 1, 0.6, 1] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            style={{ display: 'inline-block', fontSize: '1.0rem', lineHeight: 1, transformOrigin: 'center' }}
          >🦋</motion.span>
        </motion.div>
      </div>

      {/* Butterfly E — far right, gentle hover */}
      <div className="absolute z-20 pointer-events-none" style={{ bottom: '19%', left: '85%' }}>
        <motion.div
          animate={{ y: [0, -16, -6, -20, -4, -12, 0], x: [0, 5, -8, 4, -5, 8, 0] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <motion.span
            animate={{ scaleY: [1, 0.68, 1, 0.68, 1] }}
            transition={{ duration: 0.34, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            style={{ display: 'inline-block', fontSize: '1.2rem', lineHeight: 1, transformOrigin: 'center' }}
          >🦋</motion.span>
        </motion.div>
      </div>


      {/* ========================================================================= */}
      {/* 3. FOOTER COLUMNS & LINKS CONTENT                                         */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-8 relative z-20">
        {/* 
          Mobile:  1 col stacked
          sm 640:  2 col grid
          lg 1024: 2 col with brand spanning full + 4 links in 2×2
          xl 1280: 5 col — each section gets its own column
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Brand Logo & Tagline — spans 2 cols on sm, 3 cols on lg/xl */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 space-y-3 text-left">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <img
                src={getAssetUrl('/logo.png')}
                alt="Kidwin Preschool Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              />
              <div className="flex flex-col text-left min-w-0">
                <div className="text-lg sm:text-xl font-extrabold tracking-tight leading-none">
                  <span className="text-[#1B75BC]">KIDWIN</span>{' '}
                  <span className="text-[#F37023]">PRESCHOOL</span>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-black leading-relaxed font-normal max-w-xs">
              Providing a safe, joyful, and nurturing environment where children learn, play, and grow for a brighter future.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/90 border border-sky-300 text-xs font-bold text-[#1B75BC] shadow-2xs">
                Play • Learn • Grow
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2 space-y-3 text-left">
            <h3 className="text-xs sm:text-sm font-bold text-[#0F2942] uppercase tracking-widest border-l-4 border-[#1B75BC] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                { name: 'Course', path: '/courses/toddler' },
                { name: 'Day Care', path: '/daycare' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-900 hover:text-[#1B75BC] hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#F37023]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Programs */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2 space-y-3 text-left">
            <h3 className="text-xs sm:text-sm font-bold text-[#0F2942] uppercase tracking-widest border-l-4 border-[#0088FF] pl-3">
              Our Programs
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                { name: 'Playgroup (1.5 - 2.5 Yrs)', path: '/courses/playgroup' },
                { name: 'Nursery (2.5 - 3.5 Yrs)', path: '/courses/nursery' },
                { name: 'Lower KG (3.5 - 4.5 Yrs)', path: '/courses/lkg' },
                { name: 'Upper KG (4.5 - 5.5 Yrs)', path: '/courses/ukg' },
                { name: 'Day Care & Activities', path: '/daycare' }
              ].map((program) => (
                <li key={program.name}>
                  <Link
                    to={program.path}
                    className="text-slate-900 hover:text-[#1B75BC] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 space-y-3 text-left">
            <h3 className="text-xs sm:text-sm font-bold text-[#0F2942] uppercase tracking-widest border-l-4 border-[#F37023] pl-3">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-2 text-slate-900">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-100 text-[#1B75BC] flex items-center justify-center shrink-0 border border-sky-200 shadow-2xs mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold leading-relaxed text-xs sm:text-sm">
                  No.6, Brindhavan Nagar Extension, 6th Cross St, Adambakkam, Chennai - 600088
                </span>
              </li>
              <li className="flex items-center gap-2 text-slate-900">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-100 text-[#1B75BC] flex items-center justify-center shrink-0 border border-sky-200 shadow-2xs">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a href="tel:+917305145873" className="hover:text-[#F37023] transition-colors font-bold text-xs sm:text-sm">
                  +91 7305145873
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-900">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-100 text-[#0088FF] flex items-center justify-center shrink-0 border border-sky-200 shadow-2xs">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:kidwinpreschool@gmail.com" className="hover:text-[#1B75BC] transition-colors font-medium text-xs sm:text-[13px] xl:text-sm whitespace-nowrap">
                  kidwinpreschool@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2 space-y-3 text-left">
            <h3 className="text-xs sm:text-sm font-bold text-[#0F2942] uppercase tracking-widest border-l-4 border-purple-500 pl-3">
              Follow Us
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
              Stay connected with our daily kindergarten activities and updates on social media.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.facebook.com/share/1MzyQSKnAe/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-emerald-200 hover:bg-[#0088FF] hover:border-[#0088FF] flex items-center justify-center text-[#0088FF] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xs hover:shadow-md"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/kidwinpreschool?utm_source=qr&igsh=OTRhbHdmODY4Zmg0"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-emerald-200 hover:bg-pink-600 hover:border-pink-600 flex items-center justify-center text-pink-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xs hover:shadow-md"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
{/* 
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-emerald-200 hover:bg-rose-600 hover:border-rose-600 flex items-center justify-center text-rose-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xs hover:shadow-md"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a> */}
            </div>
          </div>

        </div>
      </div>



      {/* ========================================================================= */}
      {/* 4. EXPANSIVE SEAMLESS GREEN GRASS & FLOWERS LANDSCAPE                    */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden mt-4 select-none">

        {/* Layer 1: Back Light Green Curved Hill */}
        <div className="relative w-full">
          <svg
            className="w-full h-24 sm:h-36 md:h-44 text-[#05A357] block"
            viewBox="0 0 1200 140"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C200,100 400,20 600,70 C800,120 1000,25 1200,55 L1200,140 L0,140 Z"
              fill="currentColor"
            />
          </svg>

          {/* Layer 2: Front Rich Solid Green Base */}
          <div className="bg-[#00A859] w-full relative pt-2 pb-6 px-4">
            <svg
              className="absolute -top-12 sm:-top-16 left-0 w-full h-16 sm:h-20 text-[#00A859] block pointer-events-none"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C250,10 450,90 700,25 C900,105 1050,15 1200,55 L1200,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>

            {/* ========================================================================= */}
            {/* 5. PLANT ANIMATED VECTOR FLOWERS & GRASS BLADES                          */}
            {/* ========================================================================= */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 -mt-20 sm:-mt-32 md:-mt-40 mb-6 flex justify-between items-end pointer-events-none">

              {/* FLOWER 1 (Left): Pink 5-petal Daisy */}
              <motion.div
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "bottom center" }}
                className="flex flex-col items-center"
              >
                <svg width="60" height="95" viewBox="0 0 70 110">
                  <path d="M 35 48 L 35 105" stroke="#02562D" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 35 75 Q 12 62 10 78 Q 28 86 35 75" fill="#047857" />
                  <path d="M 35 82 Q 58 68 60 84 Q 42 92 35 82" fill="#10B981" />
                  <circle cx="35" cy="22" r="14" fill="#FF3B7B" />
                  <circle cx="20" cy="35" r="14" fill="#FF3B7B" />
                  <circle cx="21" cy="54" r="14" fill="#FF3B7B" />
                  <circle cx="35" cy="62" r="14" fill="#FF3B7B" />
                  <circle cx="49" cy="54" r="14" fill="#FF3B7B" />
                  <circle cx="50" cy="35" r="14" fill="#FF3B7B" />
                  <circle cx="35" cy="42" r="13" fill="#FFD100" />
                </svg>
              </motion.div>

              {/* Grass Blade Clump 1 */}
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "bottom center" }}
                className="hidden sm:block"
              >
                <svg width="42" height="38" viewBox="0 0 45 40">
                  <path d="M 5 40 Q 2 18 0 5 Q 14 20 22 40 Q 26 12 32 0 Q 36 18 45 40 Z" fill="#009E49" />
                </svg>
              </motion.div>

              {/* FLOWER 2 (Mid-Left): Pure White Daisy */}
              <motion.div
                animate={{ rotate: [6, -6, 6] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                style={{ transformOrigin: "bottom center" }}
                className="flex flex-col items-center"
              >
                <svg width="54" height="88" viewBox="0 0 70 110">
                  <path d="M 35 48 L 35 105" stroke="#02562D" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 35 78 Q 12 68 14 82 Q 30 88 35 78" fill="#10B981" />
                  <circle cx="35" cy="20" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="21" cy="31" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="21" cy="49" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="35" cy="58" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="49" cy="49" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="49" cy="31" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="35" cy="39" r="11" fill="#FF9800" />
                </svg>
              </motion.div>

              {/* Grass Blade Clump 2 */}
              <motion.div
                animate={{ rotate: [12, -12, 12] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                style={{ transformOrigin: "bottom center" }}
              >
                <svg width="38" height="34" viewBox="0 0 45 40">
                  <path d="M 5 40 Q 2 18 0 5 Q 14 20 22 40 Q 26 12 32 0 Q 36 18 45 40 Z" fill="#00C853" />
                </svg>
              </motion.div>

              {/* FLOWER 3 (Center): Sunburst Sunflower */}
              <motion.div
                animate={{ rotate: [-9, 9, -9] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                style={{ transformOrigin: "bottom center" }}
                className="flex flex-col items-center"
              >
                <svg width="68" height="108" viewBox="0 0 80 120">
                  <path d="M 40 52 L 40 115" stroke="#02562D" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 40 78 Q 12 60 8 78 Q 28 92 40 78" fill="#026838" />
                  <path d="M 40 85 Q 68 68 72 85 Q 52 98 40 85" fill="#059669" />
                  <circle cx="40" cy="18" r="12" fill="#FFB300" />
                  <circle cx="23" cy="27" r="12" fill="#FFB300" />
                  <circle cx="19" cy="46" r="12" fill="#FFB300" />
                  <circle cx="29" cy="62" r="12" fill="#FFB300" />
                  <circle cx="51" cy="62" r="12" fill="#FFB300" />
                  <circle cx="61" cy="46" r="12" fill="#FFB300" />
                  <circle cx="57" cy="27" r="12" fill="#FFB300" />
                  <circle cx="40" cy="40" r="15" fill="#4A2E1A" />
                  <circle cx="40" cy="40" r="11" fill="#6D4C41" />
                </svg>
              </motion.div>

              {/* Grass Blade Clump 3 */}
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                style={{ transformOrigin: "bottom center" }}
                className="hidden md:block"
              >
                <svg width="40" height="36" viewBox="0 0 45 40">
                  <path d="M 5 40 Q 2 18 0 5 Q 14 20 22 40 Q 26 12 32 0 Q 36 18 45 40 Z" fill="#009E49" />
                </svg>
              </motion.div>

              {/* FLOWER 4 (Mid-Right): Bright Pink Tulip */}
              <motion.div
                animate={{ rotate: [7, -7, 7] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                style={{ transformOrigin: "bottom center" }}
                className="flex flex-col items-center"
              >
                <svg width="52" height="88" viewBox="0 0 70 110">
                  <path d="M 35 48 L 35 105" stroke="#02562D" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 35 80 Q 58 64 54 82 Q 42 92 35 80" fill="#10B981" />
                  <path d="M 18 42 C 14 18 35 12 35 42 Z" fill="#E11D48" />
                  <path d="M 52 42 C 56 18 35 12 35 42 Z" fill="#E11D48" />
                  <path d="M 22 48 C 16 24 54 24 48 48 C 35 62 22 58 22 48 Z" fill="#F43F5E" />
                </svg>
              </motion.div>

              {/* Grass Blade Clump 4 */}
              <motion.div
                animate={{ rotate: [-12, 12, -12] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                style={{ transformOrigin: "bottom center" }}
              >
                <svg width="42" height="38" viewBox="0 0 45 40">
                  <path d="M 5 40 Q 2 18 0 5 Q 14 20 22 40 Q 26 12 32 0 Q 36 18 45 40 Z" fill="#00C853" />
                </svg>
              </motion.div>

              {/* FLOWER 5 (Right): Pink 5-petal Daisy */}
              <motion.div
                animate={{ rotate: [-7, 7, -7] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                style={{ transformOrigin: "bottom center" }}
                className="flex flex-col items-center"
              >
                <svg width="60" height="95" viewBox="0 0 70 110">
                  <path d="M 35 48 L 35 105" stroke="#02562D" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 35 75 Q 12 62 10 78 Q 28 86 35 75" fill="#059669" />
                  <circle cx="35" cy="22" r="14" fill="#FF3B7B" />
                  <circle cx="20" cy="35" r="14" fill="#FF3B7B" />
                  <circle cx="21" cy="54" r="14" fill="#FF3B7B" />
                  <circle cx="35" cy="62" r="14" fill="#FF3B7B" />
                  <circle cx="49" cy="54" r="14" fill="#FF3B7B" />
                  <circle cx="50" cy="35" r="14" fill="#FF3B7B" />
                  <circle cx="35" cy="42" r="13" fill="#FFD100" />
                </svg>
              </motion.div>

            </div>

            {/* Horizontal White Line Across Footer Width */}
            <div className="w-full max-w-7xl mx-auto border-t border-white/60 mb-3 relative z-30" />

            {/* Bottom Copyright Text - Clean Centered Layout on Mobile & Split on Desktop */}
            <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 text-xs text-white drop-shadow-xs font-semibold pt-4 pb-24 sm:pb-6 text-center sm:text-left">
              <div className="text-center sm:text-left text-white text-xs sm:text-sm tracking-wide font-medium">
                © {new Date().getFullYear()} Kidwin Preschool. All rights reserved.
              </div>
              <div className="text-center sm:text-right text-white text-xs sm:text-sm font-semibold">
                <a
                  href="https://www.niftysoft.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors underline decoration-white/80 underline-offset-4 font-semibold"
                >
                  Developed by Niftysoft Solution Private Limited
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
