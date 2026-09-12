import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  X, 
  ChevronLeft, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetPath';
import CtaBanner from './CtaBanner';

// Comprehensive dataset with clean metadata
const galleryItems = [
  {
    id: 1,
    title: 'Interactive Classroom Learning',
    category: 'Classroom',
    tag: 'classroom learning',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.08 AM (1).jpeg',
    description: 'Little minds actively exploring concepts through engaging guided classroom activities.'
  },
  {
    id: 2,
    title: 'Creative Painting & Art Time',
    category: 'Art & Craft',
    tag: 'drawing / painting',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.08 AM (2).jpeg',
    description: 'Expressing imagination with vibrant colors, finger painting, and creative crafts.'
  },
  {
    id: 3,
    title: 'Building Blocks & Logic Play',
    category: 'Play Time',
    tag: 'building blocks',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.08 AM.jpeg',
    description: 'Developing spatial problem-solving skills and fine motor coordination with colored blocks.'
  },
  {
    id: 4,
    title: 'Outdoor Physical Play',
    category: 'Outdoor',
    tag: 'outdoor play',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.09 AM (1).jpeg',
    description: 'Joyful outdoor recreation, gross motor balance, and energetic games under teacher care.'
  },
  {
    id: 5,
    title: 'Collaborative Group Activity',
    category: 'Classroom',
    tag: 'group activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.09 AM.jpeg',
    description: 'Learning teamwork, sharing, and communication through structured peer tasks.'
  },
  {
    id: 6,
    title: 'Annual School Celebration',
    category: 'Events',
    tag: 'school events',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.10 AM (1).jpeg',
    description: 'Memorable stage presentations, festive costumes, and proud parent moments.'
  },
  {
    id: 7,
    title: 'Rhythm & Dance Performance',
    category: 'Activities',
    tag: 'dance/performance',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.10 AM.jpeg',
    description: 'Rhythmic movement, musical expression, and joyful dance performances.'
  },
  {
    id: 8,
    title: 'Early Friendship & Bond',
    category: 'Social',
    tag: 'friendships',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.11 AM (1).jpeg',
    description: 'Fostering empathy, lifelong social bonds, and genuine childhood laughter.'
  },
  {
    id: 9,
    title: 'Sensory & Creative Exploration',
    category: 'Art & Craft',
    tag: 'creative activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.11 AM.jpeg',
    description: 'Hands-on sensory exploration fostering curiosity, tactile discovery, and joy.'
  },
  {
    id: 10,
    title: 'Storytelling & Early Reading',
    category: 'Classroom',
    tag: 'classroom learning',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.12 AM (1).jpeg',
    description: 'Captivating picture book sessions building vocabulary and love for stories.'
  },
  {
    id: 11,
    title: 'Color Recognition Workshop',
    category: 'Art & Craft',
    tag: 'drawing / painting',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.12 AM.jpeg',
    description: 'Identifying patterns, shapes, and primary hues with fun hands-on materials.'
  },
  {
    id: 12,
    title: 'STEM Block Architecture',
    category: 'Play Time',
    tag: 'building blocks',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.13 AM (1).jpeg',
    description: 'Constructing mini bridges, towers, and houses with safe non-toxic toy blocks.'
  },
  {
    id: 13,
    title: 'Garden & Nature Walk',
    category: 'Outdoor',
    tag: 'outdoor play',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.13 AM.jpeg',
    description: 'Exploring green plants, flowers, and outdoor sunshine safely inside campus gardens.'
  },
  {
    id: 14,
    title: 'Team Puzzle Solving',
    category: 'Classroom',
    tag: 'group activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.14 AM.jpeg',
    description: 'Working together to solve jigsaw puzzles and cognitive brain teasers.'
  },
  {
    id: 15,
    title: 'Cultural Day Costumes',
    category: 'Events',
    tag: 'school events',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.15 AM (1).jpeg',
    description: 'Celebrating diversity and tradition with colorful heritage outfits.'
  },
  {
    id: 16,
    title: 'Music & Rhyme Circle',
    category: 'Activities',
    tag: 'dance/performance',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.15 AM.jpeg',
    description: 'Singing nursery rhymes with tambourines, xylophones, and hand clapping.'
  },
  {
    id: 17,
    title: 'Snack Time Friendship',
    category: 'Social',
    tag: 'friendships',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.16 AM.jpeg',
    description: 'Sharing healthy snacks and practicing etiquette in a warm social setting.'
  },
  {
    id: 18,
    title: 'Paper Origami & Crafting',
    category: 'Art & Craft',
    tag: 'creative activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.17 AM (1).jpeg',
    description: 'Folding, pasting, and crafting animal shapes with child-safe safety tools.'
  },
  {
    id: 19,
    title: 'Montessori Practical Life',
    category: 'Classroom',
    tag: 'classroom learning',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.17 AM.jpeg',
    description: 'Developing independence, coordination, and self-confidence through daily tasks.'
  },
  {
    id: 20,
    title: 'Clay & Playdough Sculpting',
    category: 'Art & Craft',
    tag: 'creative activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.18 AM.jpeg',
    description: 'Squeezing, rolling, and shaping organic clay into imaginative figures.'
  },
  {
    id: 21,
    title: 'Mini Sports Day Sprint',
    category: 'Outdoor',
    tag: 'outdoor play',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.19 AM (1).jpeg',
    description: 'Cheering friends and learning sportsmanship during cheerful mini races.'
  },
  {
    id: 22,
    title: 'Grandparents Day Festivity',
    category: 'Events',
    tag: 'school events',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.19 AM.jpeg',
    description: 'Special bond moments honoring loving grandparents on campus.'
  },
  {
    id: 23,
    title: 'Puppet Theater Session',
    category: 'Activities',
    tag: 'group activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.20 AM.jpeg',
    description: 'Watching captivating hand puppets spark moral values and giggles.'
  },
  {
    id: 24,
    title: 'Circle Time Conversation',
    category: 'Social',
    tag: 'friendships',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.21 AM.jpeg',
    description: 'Sharing daily thoughts, feelings, and weather updates during morning circle.'
  },
  {
    id: 25,
    title: 'Phonics & Alphabet fun',
    category: 'Classroom',
    tag: 'classroom learning',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.22 AM.jpeg',
    description: 'Interactive sound association and tactile letter matching activities.'
  },
  {
    id: 26,
    title: 'Finger Print Masterpiece',
    category: 'Art & Craft',
    tag: 'drawing / painting',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.23 AM.jpeg',
    description: 'Creating tree leaves and colorful animals using washable finger paint.'
  },
  {
    id: 27,
    title: 'Outdoor Tricycle Riding',
    category: 'Outdoor',
    tag: 'outdoor play',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.24 AM.jpeg',
    description: 'Pedaling safely along marked play tracks to build leg strength and coordination.'
  },
  // {
  //   id: 28,
  //   title: 'Science Discovery Corner',
  //   category: 'Classroom',
  //   tag: 'classroom learning',
  //   image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.25 AM (1).jpeg',
  //   description: 'Observing magnifying glasses, seeds, and floating objects in water play.'
  // },
  // {
  //   id: 29,
  //   title: 'Drama & Roleplay Studio',
  //   category: 'Activities',
  //   tag: 'dance/performance',
  //   image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.25 AM.jpeg',
  //   description: 'Dressing up as doctors, chefs, and firefighters in fun pretend plays.'
  // },
  // {
  //   id: 30,
  //   title: 'Fancy Dress Pageant',
  //   category: 'Events',
  //   tag: 'school events',
  //   image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.26 AM.jpeg',
  //   description: 'Showcasing cute creative characters during annual themed dress parades.'
  // },
  {
    id: 31,
    title: 'Indoor Soft Gym Fun',
    category: 'Play Time',
    tag: 'building blocks',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.27 AM.jpeg',
    description: 'Tumbling, climbing soft foam ramps, and safe physical agility exercises.'
  },
  {
    id: 32,
    title: 'Holiday Art Craft Display',
    category: 'Art & Craft',
    tag: 'creative activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.28 AM.jpeg',
    description: 'Exhibiting festive greeting cards and handmade student art galleries.'
  },
  {
    id: 33,
    title: 'Yoga & Mindfulness for Kids',
    category: 'Activities',
    tag: 'group activities',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.29 AM.jpeg',
    description: 'Gentle stretching poses, deep breathing, and calm focus exercises.'
  },
  {
    id: 34,
    title: 'Graduation Ceremony Joy',
    category: 'Events',
    tag: 'school events',
    image: '/gallery/WhatsApp Image 2026-09-09 at 11.41.30 AM.jpeg',
    description: 'Celebrating UKG graduates taking their big confident step toward primary school.'
  }
];

const categories = ['All', 'Classroom', 'Art & Craft', 'Play Time', 'Outdoor', 'Events', 'Activities'];

const Gallery = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter items based on active tab
  const filteredItems = galleryItems.filter(item => 
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  // Slice visible items (starts at 9)
  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, filteredItems.length));
  };

  const handleViewLess = () => {
    setVisibleCount(9);
    const gridEl = document.getElementById('gallery-grid-start');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayedItems.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayedItems.length) % displayedItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans select-none overflow-x-hidden">

      {/* =========================================================================
          1. HERO SECTION (Clean, Sleek Height, No Notch Wave Circles)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12 flex items-center justify-center bg-slate-900 border-b border-slate-200">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('/gallery-hero-bg.jpg')}
            alt="Preschool Children Learning & Playing"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-95 opacity-85"
          />
          
          {/* Soft Baby Pink -> Light Sky Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200/25 via-pink-100/15 to-sky-300/25 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Hero Centered Content - Fully Clean & White Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-3"
        >
          {/* Main Title: GALLERY */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-widest uppercase drop-shadow-md">
            GALLERY
          </h1>

          {/* Breadcrumb: HOME / GALLERY (100% Pure White Text) */}
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
            <Link to="/" className="text-white hover:text-sky-200 transition-colors">HOME</Link>
            <span className="text-white/70 font-bold">/</span>
            <span className="text-white font-black">GALLERY</span>
          </div>

          {/* Short 2-line Subparagraph */}
          <p className="text-xs sm:text-sm lg:text-base text-white font-medium leading-relaxed max-w-xl mx-auto drop-shadow-xs">
            A glimpse into our little learners’ big moments. Explore the joy, creativity and memories we create together.
          </p>
        </motion.div>

      </section>

      {/* =========================================================================
          2. GALLERY GRID SECTION (Responsive Viewports: 320px, 360px, 420px, 768px, 1024px, 1440px)
         ========================================================================= */}
      <section id="gallery-grid-start" className="py-8 sm:py-12 lg:py-16 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Category Heading & Title (Matching Testimonials Style with Paper Plane Doodle) */}
        <div className="relative z-10 text-center space-y-2 mb-10 sm:mb-14">
          
          {/* Top Subtitle Text */}
          <div className="text-xs sm:text-sm font-extrabold text-[#1B75BC] uppercase tracking-widest">
            OUR GALLERY
          </div>

          {/* Main Title */}
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Moments That <span className="text-[#1B75BC]">Warm</span> The Heart
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

        {/* 3-Column Responsive Grid (Initial 9 Images, Clean Card Design) */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: (idx % 9) * 0.05 }}
                onClick={() => openLightbox(idx)}
                className="group relative bg-white rounded-[22px] overflow-hidden shadow-md hover:shadow-2xl hover:shadow-slate-300 border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* 4:3 Aspect Ratio Card with Clean Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Hover Overlay in Black gradient with Pure White Text (NO 'Click to expand' text) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                    
                    {/* Bottom Info on Hover - Pure White Text */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1.5 text-white">
                      <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-xs">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-white line-clamp-2 font-semibold leading-snug drop-shadow-sm">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Sub-card label: Dark slate-900 title (100% visible) */}
                <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#1B75BC] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-xs font-bold text-[#1B75BC] capitalize">
                      {item.tag}
                    </span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-[#1B75BC] group-hover:text-white transition-colors flex-shrink-0 ml-2">
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {displayedItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Compass className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No photos found in this category</h3>
            <p className="text-sm text-slate-600">Select "All" to explore our full school gallery.</p>
          </div>
        )}

        {/* =========================================================================
            3. SEE MORE PHOTOS INTERACTION (Clean Button: NO left icon)
           ========================================================================= */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center space-y-4">
          
          {visibleCount < filteredItems.length ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSeeMore}
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-[#F37023] hover:bg-[#d95f17] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer border border-orange-400 w-full sm:w-auto"
            >
              <span>See More Photos</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.button>
          ) : filteredItems.length > 9 ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleViewLess}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 sm:py-3.5 rounded-2xl bg-slate-900 text-white font-black text-xs sm:text-sm shadow-md hover:bg-black cursor-pointer transition-all border border-slate-700 w-full sm:w-auto"
            >
              <span>View Less Photos</span>
              <ChevronRight className="w-4 h-4 transform -rotate-90 text-amber-400" />
            </motion.button>
          ) : null}

        </div>

      </section>

      {/* =========================================================================
          4. LIGHTBOX MODAL POPUP
         ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-red-600 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-[#1B75BC] text-white transition-colors cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-[#1B75BC] text-white transition-colors cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            >
              <div className="relative flex-1 bg-black flex items-center justify-center max-h-[65vh] sm:max-h-[70vh] overflow-hidden">
                <img
                  src={getAssetUrl(displayedItems[lightboxIndex].image)}
                  alt={displayedItems[lightboxIndex].title}
                  className="max-h-[65vh] sm:max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Lightbox Footer Info */}
              <div className="p-4 sm:p-6 bg-black border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#1B75BC] text-white rounded-md">
                    {displayedItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-white">
                    {displayedItems[lightboxIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                    {displayedItems[lightboxIndex].description}
                  </p>
                </div>
                <div className="text-xs font-extrabold text-amber-400 whitespace-nowrap">
                  Photo {lightboxIndex + 1} of {displayedItems.length}
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <CtaBanner />

    </div>
  );
};

export default Gallery;
