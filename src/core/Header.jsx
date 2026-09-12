import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { getAssetUrl } from '../utils/assetPath';

const getAdmissionYears = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startYear = month >= 4 ? year : year - 1;
  const endYear = startYear + 1;
  return `${startYear} - ${endYear}`;
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setMobileCourseOpen(false);
    setCourseDropdownOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const admissionYears = getAdmissionYears();

  const courseSubItems = [
    { name: 'Little Learners', path: '/courses/toddler' },
    { name: 'Playgroup', path: '/courses/playgroup' },
    { name: 'Nursery / Pre-KG', path: '/courses/nursery' },
    { name: 'LKG / Junior KG', path: '/courses/lkg' },
    { name: 'UKG / Senior KG', path: '/courses/ukg' },
  ];

  const navItems = [
    { name: 'Course', path: '/courses/toddler', hasDropdown: true },
    { name: 'Day Care', path: '/daycare' },
    { name: 'After School', path: '/afterschool' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleSubItemClick = (subItem, e) => {
    e.preventDefault();
    setCourseDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileCourseOpen(false);
    navigate(subItem.path);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleNavClick = (item, e) => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const checkIsActive = (item) => {
    const currentPath = location.pathname;
    if (item.path.startsWith('/courses/') && currentPath.startsWith('/courses/')) return true;
    return currentPath === item.path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shadow-xs select-none">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 xl:h-20 gap-2 xl:gap-6">

          {/* Brand Logo */}
          {/* Brand Logo */}
<Link
  to="/"
  onClick={handleLogoClick}
  className="flex items-center gap-1.5 xl:gap-2 group flex-shrink-0"
>
  <img
    src={getAssetUrl('/logo.png')}
    alt="Kidwin Preschool Logo"
    className="h-9 sm:h-10 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
  />
  <div className="flex flex-col text-left">
    <div className="font-black tracking-tight leading-none text-sm sm:text-base xl:text-xl">
      <span className="text-[#1B75BC]">KIDWIN</span>
      <span className="text-[#F37023]"> PRESCHOOL</span>
    </div>
    <span className="text-[8px] sm:text-[9px] xl:text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mt-0.5">
      PLAY • LEARN • GROW
    </span>
  </div>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = checkIsActive(item);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative group py-5"
                    onMouseEnter={() => setCourseDropdownOpen(true)}
                    onMouseLeave={() => setCourseDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`relative text-sm font-extrabold transition-colors py-2 whitespace-nowrap cursor-pointer inline-flex items-center gap-1 ${
                        isActive ? 'text-[#1B75BC] font-black' : 'text-slate-700 hover:text-[#1B75BC]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      {isActive && (
                        <motion.div
                          layoutId="activeNavbarLight"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B75BC] to-[#0088FF] rounded-full shadow-xs"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Course Dropdown Menu Card */}
                    <AnimatePresence>
                      {courseDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-sky-100 p-2 space-y-1 z-50 overflow-hidden"
                        >
                          <div className="px-3 py-1.5 text-[10px] font-black text-[#1B75BC] uppercase tracking-wider border-b border-sky-50 mb-1">
                            Our Programs & Courses
                          </div>
                          {courseSubItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          onClick={(e) => handleSubItemClick(subItem, e)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-sky-50 hover:text-[#1B75BC] transition-all group/sub cursor-pointer"
                        >
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-300 group-hover/sub:bg-[#1B75BC] group-hover/sub:scale-125 transition-all"></div>
                              <span>{subItem.name}</span>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`relative text-sm font-extrabold transition-colors py-2 whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-[#1B75BC] font-black' : 'text-slate-700 hover:text-[#1B75BC]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarLight"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B75BC] to-[#0088FF] rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side: Admission button + hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Admission button */}
            <Link
              to="/admission"
              className="hidden sm:inline-flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF1775] to-[#E0125F] hover:from-[#e0125f] hover:to-[#c00f52] text-white shadow-md shadow-rose-500/30 hover:shadow-lg hover:scale-[1.02] transition-all border border-rose-400/40 cursor-pointer whitespace-nowrap"
            >
              <span className="xl:hidden text-[11px] font-black tracking-tight uppercase text-white leading-none">
                Admission
              </span>
              <div className="hidden xl:flex flex-col text-left leading-tight">
                <span className="text-xs font-black tracking-tight uppercase text-white">Admission Open</span>
                <span className="text-[11px] font-extrabold text-white/90 tracking-wide">{admissionYears}</span>
              </div>
              <ArrowRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-white flex-shrink-0" />
            </Link>

            {/* Hamburger */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Dropdown Menu — visible on mobile, tablet, and 1024px */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-1 shadow-xl max-h-[85vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = checkIsActive(item);

            if (item.hasDropdown) {
              return (
                <div key={item.name} className="space-y-1">
                  {/* Entire row is a toggle button — no navigation on mobile */}
                  <button
                    type="button"
                    onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      mobileCourseOpen ? 'bg-sky-50 text-[#1B75BC]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Course</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCourseOpen ? 'rotate-180 text-[#1B75BC]' : 'text-slate-400'}`} />
                  </button>

                  {mobileCourseOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-sky-50/60 rounded-xl border border-sky-100 mx-1">
                      <div className="px-3 py-1 text-[10px] font-black text-[#1B75BC] uppercase tracking-wider border-b border-sky-100/80 mb-1">
                        Our Programs & Courses
                      </div>
                      {courseSubItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          onClick={(e) => handleSubItemClick(subItem, e)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#1B75BC] hover:bg-white transition-all cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-300 flex-shrink-0"></div>
                          <span>{subItem.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(item, e)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#1B75BC] text-white font-black shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
