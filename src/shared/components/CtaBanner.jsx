import React from 'react';
import { Link } from 'react-router-dom';

const CtaBanner = ({
  title = "See Our Kindergarten Special Features & Activities!",
  subtitle = "Admissions are now open! Let your child grow, learn and create beautiful memories with us.",
  buttonText = "ENQUIRE NOW →",
  buttonLink = "/admission"
}) => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#00A8EE] to-[#1B75BC] shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 border-2 border-sky-300/40">
        
        {/* Left Text */}
        <div className="text-center sm:text-left space-y-1.5">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug tracking-tight drop-shadow-sm">
            {title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white font-bold tracking-wide drop-shadow-xs">
            {subtitle}
          </p>
        </div>

        {/* Right Yellow Action Button with High Contrast Dark Navy Text */}
        <Link
          to={buttonLink}
          className="flex-shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-[#FFB800] hover:bg-amber-300 text-[#0F2942] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border border-amber-300"
        >
          {buttonText}
        </Link>

      </div>
    </section>
  );
};

export default CtaBanner;
