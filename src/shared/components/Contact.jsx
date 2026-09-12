import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  User, 
  Calendar, 
  HelpCircle, 
  Pencil, 
  ChevronDown, 
  CheckCircle2, 
  Smile, 
  Heart, 
  Compass, 
  Clock, 
  Sun, 
  Cloud 
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetPath';

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childAge: '',
    helpTopic: 'General Enquiry',
    otherTopic: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.value ? e.target.name : e.target.name]: e.target.value
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    const effectiveTopic = formData.helpTopic === 'Other'
      ? `Other (${formData.otherTopic || 'Custom Inquiry'})`
      : (formData.helpTopic || 'General Enquiry');

    // Construct pre-filled WhatsApp message matching official details
    const phoneNumber = '917305145873';
    const textMessage = `Hello Kidwin Preschool! I would like to send a message:%0A%0A*Parent Name:* ${encodeURIComponent(formData.parentName || 'Not provided')}%0A*Phone:* ${encodeURIComponent(formData.phone || 'Not provided')}%0A*Email:* ${encodeURIComponent(formData.email || 'Not provided')}%0A*Child's Age:* ${encodeURIComponent(formData.childAge || 'Not specified')}%0A*Topic:* ${encodeURIComponent(effectiveTopic)}%0A*Details:* ${encodeURIComponent(formData.message || 'Interested in admissions')}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${textMessage}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans select-none overflow-x-hidden relative">

      {/* =========================================================================
          1. HERO SECTION (With Background Photo Overlay)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12 flex items-center justify-center bg-slate-900 border-b border-slate-200">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('/testimonials-hero-bg.jpg')}
            alt="Kidwin Preschool Contact Us Background"
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
            CONTACT US
          </h1>

          {/* Pure White Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
            <Link to="/" className="text-white hover:text-sky-200 transition-colors">HOME</Link>
            <span className="text-white/70 font-bold">/</span>
            <span className="text-white font-black">CONTACT US</span>
          </div>

          {/* Subparagraph */}
          <p className="text-xs sm:text-sm lg:text-base text-white font-medium leading-relaxed max-w-xl mx-auto drop-shadow-xs">
            We would love to hear from you! Reach out to us for admissions, campus tours, or any questions about Kidwin Preschool.
          </p>
        </motion.div>

      </section>

      {/* =========================================================================
          2. OFFICIAL CONTACT INFORMATION CARDS (4 Responsive Cards)
         ========================================================================= */}
      <section className="py-10 sm:py-12 lg:py-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Address */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white rounded-[20px] p-6 text-center border-2 border-dashed border-pink-300 shadow-sm hover:shadow-md transition-all flex flex-col items-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center shadow-xs border border-pink-100">
              <MapPin className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Address</h3>
            <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
              No.6, Brindhavan Nagar Extension, 6th Cross Street, Adambakkam, Chennai-600088
            </p>
          </motion.div>

          {/* Card 2: Phone */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white rounded-[20px] p-6 text-center border-2 border-dashed border-sky-300 shadow-sm hover:shadow-md transition-all flex flex-col items-center space-y-3"
          >
            <a 
              href="https://wa.me/917305145873?text=Hello%20Kidwin%20Preschool!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex flex-col items-center space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-xs border border-sky-100 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#1B75BC] transition-colors">Mobile</h3>
              <p className="text-xs sm:text-sm text-slate-900 font-bold group-hover:text-[#1B75BC] transition-colors">
                +91 7305145873
              </p>
            </a>
          </motion.div>

          {/* Card 3: Email */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white rounded-[20px] p-6 text-center border-2 border-dashed border-amber-300 shadow-sm hover:shadow-md transition-all flex flex-col items-center space-y-3"
          >
            <a 
              href="mailto:kidwinpreschool@gmail.com" 
              className="w-full flex flex-col items-center space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-xs border border-amber-100 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">Support Email</h3>
              <p className="text-xs sm:text-sm text-slate-900 font-bold group-hover:text-amber-600 transition-colors whitespace-nowrap">
                kidwinpreschool@gmail.com
              </p>
            </a>
          </motion.div>

          {/* Card 4: Opening Hours */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white rounded-[20px] p-6 text-center border-2 border-dashed border-purple-300 shadow-sm hover:shadow-md transition-all flex flex-col items-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shadow-xs border border-purple-100">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Opening Hours</h3>
            <div className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
              <div><span className="font-bold text-slate-900">Mon - Sat:</span> 10AM – 12PM</div>
              <div className="text-rose-600 font-bold"><span className="text-slate-900">Sun:</span> Closed</div>
            </div>
          </motion.div>

        </div>

      </section>

      {/* =========================================================================
          3. MAIN CONTACT AREA (Exact Map Location + WhatsApp Form)
         ========================================================================= */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: Organic Circular/Blob Map for Adambakkam, Chennai */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Hand-drawn Annotation */}
            <div className="absolute top-4 sm:top-10 -left-2 sm:left-4 z-20 flex flex-col items-center pointer-events-none">
              <span className="text-xs sm:text-sm font-black text-slate-900 rotate-[-12deg] tracking-wide" style={{ fontFamily: 'cursive, Poppins, sans-serif' }}>
                We are friendly!
              </span>
              <div className="flex gap-1 -mt-1 text-amber-400">
                <span className="rotate-[-20deg]">/</span>
                <span className="rotate-0">|</span>
                <span className="rotate-[20deg]">\</span>
              </div>
              <svg className="w-8 h-8 text-slate-700 transform rotate-[30deg] -mt-1" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M10,10 Q25,15 28,30" />
                <path d="M22,26 L28,30 L32,24" />
              </svg>
            </div>

            {/* Big Happy Sunflower Container */}
            <div className="relative w-full max-w-[320px] h-[400px] flex flex-col items-center justify-end overflow-visible group mt-8 lg:mt-0">
              
              {/* Floating Flower Head */}
              <div className="relative z-10 animate-[bounce_4s_ease-in-out_infinite] cursor-pointer">
                
                {/* Petals Wrapper - Spinning Slowly */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                  {/* Petals - Layer 1 */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={`petal-1-${i}`}
                      className="absolute top-1/2 left-1/2 w-10 sm:w-12 h-48 sm:h-56 bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-400 rounded-[50%] origin-center shadow-sm"
                      style={{ 
                        transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                      }}
                    />
                  ))}
                  
                  {/* Petals - Layer 2 (offset) */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={`petal-2-${i}`}
                      className="absolute top-1/2 left-1/2 w-10 sm:w-12 h-44 sm:h-52 bg-gradient-to-t from-amber-600 via-yellow-400 to-amber-500 rounded-[50%] origin-center shadow-sm opacity-90"
                      style={{ 
                        transform: `translate(-50%, -50%) rotate(${i * 30 + 15}deg)`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Brown Face Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 bg-[#5C3A21] rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-4 border-[#8B4513] flex flex-col items-center justify-center overflow-hidden z-20 group-hover:scale-105 transition-transform duration-300">
                  {/* Inner grid/seeds texture */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4a2511_2px,transparent_2px)] bg-[size:8px_8px]" />
                  
                  {/* Happy Face */}
                  <div className="relative z-10 flex flex-col items-center mt-2">
                    {/* Eyes */}
                    <div className="flex gap-4 sm:gap-5 mb-2">
                      <div className="w-3.5 h-5 sm:w-4 sm:h-6 bg-slate-900 rounded-full animate-pulse flex items-start justify-end p-0.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div className="w-3.5 h-5 sm:w-4 sm:h-6 bg-slate-900 rounded-full animate-pulse flex items-start justify-end p-0.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    </div>
                    {/* Blush */}
                    <div className="flex gap-10 sm:gap-12 absolute top-3">
                      <div className="w-4 h-2 sm:w-5 sm:h-2.5 bg-rose-400/80 rounded-full blur-[2px]" />
                      <div className="w-4 h-2 sm:w-5 sm:h-2.5 bg-rose-400/80 rounded-full blur-[2px]" />
                    </div>
                    {/* Smile */}
                    <div className="w-10 h-5 sm:w-12 sm:h-6 border-b-[5px] border-slate-900 rounded-b-full mt-1" />
                  </div>
                </div>
              </div>

              {/* Stem & Leaves */}
              <div className="w-4 sm:w-5 h-48 sm:h-56 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full -mt-24 sm:-mt-32 relative z-0 flex flex-col items-center">
                {/* Left Leaf */}
                <div className="absolute top-20 sm:top-24 -left-16 sm:-left-20 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-[0_100%_0_100%] shadow-sm transform -rotate-12 origin-bottom-right group-hover:rotate-12 transition-transform duration-700 ease-in-out" />
                {/* Right Leaf */}
                <div className="absolute top-28 sm:top-32 -right-16 sm:-right-20 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-green-500 to-green-700 rounded-[100%_0_100%_0] shadow-sm transform rotate-12 origin-bottom-left group-hover:-rotate-12 transition-transform duration-700 ease-in-out" />
              </div>

              {/* Ground Shadow/Base */}
              <div className="w-32 h-6 sm:w-40 sm:h-8 bg-emerald-100/50 rounded-[50%] blur-[4px] -mt-4 z-[-1]" />

            </div>

          </div>

          {/* RIGHT: Send a Message Form Card */}
          <div className="lg:col-span-7 relative">
            
            <div className="bg-[#FAF7F2] rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm border border-amber-200/80 relative">
              
              {/* Form Title */}
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Send a <span className="text-[#F37023]">Message</span>
                  </h2>
                  <div className="flex gap-1 text-amber-400 text-sm font-black -mt-4">
                    <span className="rotate-[-25deg]">/</span>
                    <span className="rotate-0">|</span>
                    <span className="rotate-[25deg]">\</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold">
                  Fill in the form and our team will get back to you shortly.
                </p>
              </div>

              {/* Form Grid */}
              <form onSubmit={handleSendMessage} className="space-y-4">
                
                {/* Row 1: Parent Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent / Guardian Name *"
                      required
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      required
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 2: Email + Child Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      placeholder="Child's Age (e.g. 3 Years)"
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 3: Topic Dropdown */}
                <div className="relative">
                  <HelpCircle className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    name="helpTopic"
                    value={formData.helpTopic}
                    onChange={handleChange}
                    className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-10 py-3.5 rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all appearance-none cursor-pointer"
                  >
                    <option value="General Enquiry">How Can We Help? *</option>
                    <option value="Admission Enquiry">Admission Enquiry</option>
                    <option value="Daycare & Playgroup">Daycare & Playgroup</option>
                    <option value="After School Programs">After School Programs</option>
                    <option value="Schedule Campus Tour">Schedule a Campus Tour</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Conditional Text Input when 'Other' is selected */}
                {formData.helpTopic === 'Other' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Pencil className="w-4 h-4 text-sky-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="otherTopic"
                      value={formData.otherTopic}
                      onChange={handleChange}
                      placeholder="Please specify your custom topic *"
                      required={formData.helpTopic === 'Other'}
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 rounded-xl border-2 border-sky-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-400"
                    />
                  </motion.div>
                )}

                {/* Row 4: Message */}
                <div className="relative">
                  <Pencil className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help... *"
                    required
                    className="w-full bg-white text-slate-900 text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Submit Button (Rounded Rectangle rounded-2xl) */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-[#1B75BC] hover:bg-[#0055AA] text-white font-black text-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-300 hover:scale-105 cursor-pointer min-w-[200px]"
                  >
                    <span>Send a Message</span>
                    <ArrowRight className="w-4 h-4 text-white stroke-[3] transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Feedback */}
                {submitted && (
                  <div className="pt-2 text-center text-xs font-bold text-emerald-600 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp chat opened! Form details pre-filled for sending.</span>
                  </div>
                )}

              </form>

            </div>

            {/* Doodles */}
            <div className="absolute top-12 -right-12 lg:-right-24 hidden xl:flex flex-col items-center space-y-4 pointer-events-none opacity-80">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-400 stroke-rose-600" />
              <div className="text-[11px] font-black text-slate-700 text-center max-w-[100px] leading-tight rotate-[6deg]" style={{ fontFamily: 'cursive, Poppins, sans-serif' }}>
                Together for a brighter childhood
              </div>
              <Smile className="w-6 h-6 text-amber-500" />
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;
