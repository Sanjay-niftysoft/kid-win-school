import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  GraduationCap,
  Heart,
  Users,
  Phone,
  FileText,
  MessageCircle,
  ShieldCheck,
  Star,
  User,
  X,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Smile,
  Baby
} from 'lucide-react';
import SignaturePad from '../../components/Admission/SignaturePad';
import { submitAdmissionForm } from '../../services/admissionApi';

const AdmissionRegistration = () => {
  // Current step (1 to 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Child & Admission
    childName: '',
    preferredName: '',
    childAge: '',
    dob: '',
    gender: '',
    address: '',
    academicYear: '2026-2027',
    program: '',
    otherProgram: '',
    startDate: '',

    // Step 2: Parents & Family
    parent1Name: '',
    parent1Occ: '',
    parent1Mobile: '',
    parent1Email: '',
    parent2Name: '',
    parent2Occ: '',
    parent2Mobile: '',
    relationship: 'Father',
    motherTongue: '',
    otherMotherTongue: '',
    hasSiblings: 'No',
    siblingDetails: '',

    // Step 3: Health & Emergency
    emergencyName: '',
    emergencyRel: '',
    emergencyMobile: '',
    hasAllergies: 'No',
    allergiesDetail: '',
    hasMedical: 'No',
    medicalDetail: '',
    dietary: '',

    // Step 4: Additional, Declaration & Signature
    howHeard: '',
    otherHowHeard: '',
    additionalInfo: '',
    declarationTrue: false,
    declarationPolicy: false,
    declarationContact: false,
    parentSignName: '',
    signatureData: '',
    signDate: new Date().toISOString().split('T')[0],
  });

  // Files State
  const [files, setFiles] = useState({
    childPhoto: null,
    birthCertificate: null,
    previousSchoolRecord: null,
    medicalRecord: null,
    signaturePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const fileInputRefs = {
    childPhoto: useRef(null),
    birthCertificate: useRef(null),
    previousSchoolRecord: useRef(null),
    medicalRecord: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [fieldName]: 'File size must be under 1 MB.' }));
      return;
    }

    const allowedExts = ['jpg', 'jpeg', 'png', 'pdf'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(ext)) {
      setErrors((prev) => ({ ...prev, [fieldName]: 'Allowed formats: JPG, PNG, PDF.' }));
      return;
    }

    setFiles((prev) => ({ ...prev, [fieldName]: file }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  const removeFile = (fieldName) => {
    setFiles((prev) => ({ ...prev, [fieldName]: null }));
    if (fileInputRefs[fieldName]?.current) {
      fileInputRefs[fieldName].current.value = '';
    }
  };

  // ---------------------------------------------------------------------------
  // Step Validation Handlers
  // ---------------------------------------------------------------------------
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.childName.trim()) newErrors.childName = "Child's full name is required.";
      if (!formData.dob) newErrors.dob = 'Date of birth is required.';
      if (!formData.gender) newErrors.gender = 'Gender is required.';
      if (!formData.address.trim()) newErrors.address = 'Child home address is required.';
      if (!formData.program) newErrors.program = 'Program selection is required.';
      if (formData.program === 'Other' && !formData.otherProgram.trim()) {
        newErrors.otherProgram = 'Please specify the program.';
      }
      if (!files.childPhoto) newErrors.childPhoto = "Child's photo is required.";
    }

    if (step === 2) {
      if (!formData.parent1Name.trim()) newErrors.parent1Name = 'Father / Parent 1 name is required.';
      if (!formData.parent1Mobile.trim()) newErrors.parent1Mobile = 'Mobile number is required.';
      if (!formData.parent1Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parent1Email.trim())) {
        newErrors.parent1Email = 'Valid email address is required.';
      }
      if (!formData.parent2Name.trim()) newErrors.parent2Name = 'Mother / Parent 2 name is required.';
      if (!formData.parent2Mobile.trim()) newErrors.parent2Mobile = 'Mobile number is required.';
      if (formData.motherTongue === 'Other' && !formData.otherMotherTongue.trim()) {
        newErrors.otherMotherTongue = 'Please specify mother tongue.';
      }
    }

    if (step === 3) {
      if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Emergency contact name is required.';
      if (!formData.emergencyRel.trim()) newErrors.emergencyRel = 'Relationship is required.';
      if (!formData.emergencyMobile.trim()) newErrors.emergencyMobile = 'Emergency mobile is required.';
      if (!files.birthCertificate) newErrors.birthCertificate = 'Birth certificate is required.';
    }

    if (step === 4) {
      if (!formData.declarationTrue) newErrors.declarationTrue = 'Must confirm information is true.';
      if (!formData.declarationPolicy) newErrors.declarationPolicy = 'Must agree to policies.';
      if (!formData.declarationContact) newErrors.declarationContact = 'Must authorize school contact.';
      if (!formData.parentSignName.trim()) newErrors.parentSignName = 'Parent/Guardian name is required.';
      if (!formData.signatureData) newErrors.signatureData = 'Signature is required.';
      if (!formData.signDate) newErrors.signDate = 'Date is required.';
      if (formData.howHeard === 'Other' && !formData.otherHowHeard.trim()) {
        newErrors.otherHowHeard = 'Please specify how you heard about us.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        // If "Other" was selected, pass the custom text
        if (key === 'program' && formData.program === 'Other') {
          payload.append('program', `Other: ${formData.otherProgram}`);
        } else if (key === 'motherTongue' && formData.motherTongue === 'Other') {
          payload.append('motherTongue', `Other: ${formData.otherMotherTongue}`);
        } else if (key === 'howHeard' && formData.howHeard === 'Other') {
          payload.append('howHeard', `Other: ${formData.otherHowHeard}`);
        } else {
          payload.append(key, formData[key]);
        }
      });

      if (files.childPhoto) payload.append('childPhoto', files.childPhoto);
      if (files.birthCertificate) payload.append('birthCertificate', files.birthCertificate);
      if (files.previousSchoolRecord) payload.append('previousSchoolRecord', files.previousSchoolRecord);
      if (files.medicalRecord) payload.append('medicalRecord', files.medicalRecord);
      if (files.signaturePhoto) payload.append('signaturePhoto', files.signaturePhoto);

      const result = await submitAdmissionForm(payload);
      if (result.success) {
        setSubmitSuccess(true);
        setApplicationId(result.application_id || 'KW' + Date.now());
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.message || 'Unable to submit registration.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wizardSteps = [
    { num: 1, title: 'Child & Program', subtitle: 'Basic information & course selection', icon: Baby, color: 'bg-rose-500' },
    { num: 2, title: 'Parents & Family', subtitle: 'Parent details & family background', icon: Users, color: 'bg-amber-500' },
    { num: 3, title: 'Health & Docs', subtitle: 'Emergency contact & document upload', icon: FileText, color: 'bg-emerald-500' },
    { num: 4, title: 'Declaration & Sign', subtitle: 'Review, signature & final submit', icon: ShieldCheck, color: 'bg-sky-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 pb-20 pt-2 select-none font-sans">
      
      {/* ========================================================================= */}
      {/* HERO BANNER - CHEERFUL PRESCHOOL DESIGN                                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF5FC] via-[#FFF9F2] to-slate-50/90 border-b border-sky-100/80 pt-6 pb-8 sm:pt-10 sm:pb-12">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-rose-100/90 border border-rose-200 text-rose-600 text-[10px] sm:text-xs font-black tracking-wide mb-3 shadow-2xs">
            <span>Kidwin Preschool Admission Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F2942] tracking-tight leading-tight mb-2">
            Online Admission <span className="text-[#FF1775]">Registration</span>
          </h1>

          <p className="text-slate-700 font-bold text-sm sm:text-base max-w-md sm:max-w-xl mx-auto px-2">
            Take the first step towards a brighter future for your child.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MULTI-STEP WIZARD PROGRESS BAR                                            */}
      {/* ========================================================================= */}
      {!submitSuccess && (
        <div className="max-w-[900px] mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200/90 shadow-sm mb-5 sm:mb-8">
            
            {/* Step Badges Row — responsive with full text (no truncation dots) */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:gap-3">
              {wizardSteps.map((s) => {
                const isActive = currentStep === s.num;
                const isCompleted = currentStep > s.num;
                const IconComponent = s.icon;

                return (
                  <div
                    key={s.num}
                    onClick={() => isCompleted && setCurrentStep(s.num)}
                    className={`flex flex-col sm:flex-row items-center sm:gap-2 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl transition-all text-center sm:text-left ${
                      isCompleted ? 'cursor-pointer hover:bg-slate-50' : ''
                    } ${
                      isActive
                        ? 'bg-sky-50/90 border-2 border-sky-400 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-50/60 border border-emerald-200'
                        : 'bg-slate-50 border border-slate-200/70 opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-white shrink-0 shadow-xs mx-auto sm:mx-0 ${
                      isCompleted ? 'bg-emerald-500' : isActive ? s.color : 'bg-slate-300'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" /> : <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />}
                    </div>

                    <div className="text-left min-w-0 flex-1 hidden sm:block">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider block text-slate-400 leading-none mb-0.5">
                        Step 0{s.num}
                      </span>
                      <h4 className={`text-[11px] md:text-xs font-black leading-tight sm:leading-snug break-words ${isActive ? 'text-sky-950' : 'text-slate-700'}`}>
                        {s.title}
                      </h4>
                    </div>

                    {/* Mobile: full step title with clean leading */}
                    <div className="sm:hidden mt-1 text-center w-full">
                      <span className={`text-[9px] font-black block leading-tight break-words ${isActive ? 'text-sky-700' : 'text-slate-500'}`}>
                        {s.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Percentage Line */}
            <div className="w-full bg-slate-100 h-1.5 sm:h-2 rounded-full mt-3 sm:mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-500 via-rose-500 to-amber-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WIZARD CARD & FORM                                                        */}
      {/* ========================================================================= */}
      <div className="max-w-[900px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* SUCCESS CARD OVERLAY */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-emerald-300 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 max-w-xl mx-auto my-8"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Registration Submitted Successfully!</h2>
                <p className="text-slate-600 text-sm font-medium">
                  Thank you for choosing Kidwin Preschool. We have received your admission registration and will contact you soon.
                </p>
              </div>
              <div className="inline-block bg-sky-50 border border-sky-200 px-6 py-3.5 rounded-2xl">
                <span className="text-xs font-bold text-slate-500 uppercase block">Application Reference ID</span>
                <span className="text-2xl font-black text-[#1B75BC] tracking-wider">{applicationId}</span>
              </div>
              <div>
                <Link to="/" className="inline-block px-8 py-3.5 rounded-2xl bg-[#1B75BC] hover:bg-sky-700 text-white font-black text-sm shadow-md">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {submitError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
            <p className="text-sm font-bold">{submitError}</p>
          </div>
        )}

        {!submitSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl sm:rounded-[32px] border border-slate-200/90 shadow-lg p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
              
              {/* STEP 1: CHILD & PROGRAM INFORMATION */}
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  
                  <div className="flex items-center gap-3 bg-rose-50/80 p-4 rounded-2xl border border-rose-100">
                    <div className="w-9 h-9 rounded-full bg-[#FF1775] text-white font-black text-base flex items-center justify-center">1</div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Child & Admission Details</h2>
                      <p className="text-xs font-semibold text-slate-500">Tell us about your child and select program</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Child Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Child's Full Name *</label>
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        placeholder="Enter child's full name"
                        className={`w-full px-4 py-3 rounded-2xl border ${errors.childName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium focus:outline-none focus:border-sky-500`}
                      />
                      {errors.childName && <p className="text-xs font-bold text-rose-500">{errors.childName}</p>}
                    </div>

                    {/* Nickname */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Preferred Name / Nickname</label>
                      <input
                        type="text"
                        name="preferredName"
                        value={formData.preferredName}
                        onChange={handleChange}
                        placeholder="Enter nickname (optional)"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    {/* DOB */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-2xl border ${errors.dob ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium focus:outline-none focus:border-sky-500`}
                      />
                      {errors.dob && <p className="text-xs font-bold text-rose-500">{errors.dob}</p>}
                    </div>

                    {/* Child's Age */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Child's Age (e.g. 3 Years 6 Months)</label>
                      <input
                        type="text"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        placeholder="Enter child's age"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Gender *</label>
                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                          <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} className="w-4 h-4 text-sky-600 focus:ring-sky-500" />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                          <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} className="w-4 h-4 text-rose-600 focus:ring-rose-500" />
                          <span>Female</span>
                        </label>
                      </div>
                      {errors.gender && <p className="text-xs font-bold text-rose-500">{errors.gender}</p>}
                    </div>

                    {/* Home Address */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-xs font-black text-slate-800">Child's Home Address *</label>
                      <textarea
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter full home address"
                        className={`w-full px-4 py-2.5 rounded-2xl border ${errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium resize-none focus:outline-none focus:border-sky-500`}
                      />
                      {errors.address && <p className="text-xs font-bold text-rose-500">{errors.address}</p>}
                    </div>

                    {/* Academic Year */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Academic Year *</label>
                      <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:border-sky-500">
                        <option value="2026-2027">2026 – 2027</option>
                        <option value="2027-2028">2027 – 2028</option>
                      </select>
                    </div>

                    {/* Program Dropdown with "Other" */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Program / Class Applying For *</label>
                      <select name="program" value={formData.program} onChange={handleChange} className={`w-full px-4 py-3 rounded-2xl border ${errors.program ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium bg-white focus:outline-none focus:border-sky-500`}>
                        <option value="">Select program</option>
                        <option value="Toddler / Little Learners">Toddler / Little Learners</option>
                        <option value="Playgroup">Playgroup</option>
                        <option value="Nursery / Pre-KG">Nursery / Pre-KG</option>
                        <option value="LKG / Junior KG">LKG / Junior KG</option>
                        <option value="UKG / Senior KG">UKG / Senior KG</option>
                        <option value="Other">Other (Please specify)</option>
                      </select>
                      {errors.program && <p className="text-xs font-bold text-rose-500">{errors.program}</p>}
                    </div>

                    {/* Dynamic "Other Program" Text Input */}
                    {formData.program === 'Other' && (
                      <div className="sm:col-span-2 space-y-1 pt-1">
                        <label className="block text-xs font-black text-rose-600">Please specify program name *</label>
                        <input
                          type="text"
                          name="otherProgram"
                          value={formData.otherProgram}
                          onChange={handleChange}
                          placeholder="Type custom program name"
                          className={`w-full px-4 py-3 rounded-2xl border ${errors.otherProgram ? 'border-rose-400 bg-rose-50/30' : 'border-rose-200 bg-rose-50/20'} text-sm font-medium focus:outline-none focus:border-rose-500`}
                        />
                        {errors.otherProgram && <p className="text-xs font-bold text-rose-500">{errors.otherProgram}</p>}
                      </div>
                    )}

                    {/* Start Date */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Preferred Start Date</label>
                      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-sky-500" />
                    </div>

                    {/* Child Photo Upload */}
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Child's Photo *</label>
                      <div
                        onClick={() => fileInputRefs.childPhoto.current?.click()}
                        className={`h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
                          files.childPhoto ? 'border-emerald-400 bg-emerald-50/40' : errors.childPhoto ? 'border-rose-400 bg-rose-50/30' : 'border-sky-200 bg-sky-50/40 hover:border-sky-400'
                        }`}
                      >
                        <input type="file" ref={fileInputRefs.childPhoto} onChange={(e) => handleFileChange(e, 'childPhoto')} accept="image/png, image/jpeg, image/jpg" className="hidden" />
                        {files.childPhoto ? (
                          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="truncate max-w-[150px]">{files.childPhoto.name}</span>
                            <button type="button" onClick={(e) => { e.stopPropagation(); removeFile('childPhoto'); }} className="text-rose-500 hover:text-rose-700 ml-1"><X className="w-3.5 h-3.5" /></button>
                          </div>
                        ) : (
                          <>
                            <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-1"><Upload className="w-3.5 h-3.5" /></div>
                            <span className="text-xs font-bold text-sky-700">Upload Photo (JPG/PNG max 1MB)</span>
                          </>
                        )}
                      </div>
                      {errors.childPhoto && <p className="text-xs font-bold text-rose-500">{errors.childPhoto}</p>}
                    </div>

                  </div>

                </motion.div>
              )}

              {/* STEP 2: PARENTS & FAMILY */}
              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  
                  <div className="flex items-center gap-3 bg-amber-50/80 p-4 rounded-2xl border border-amber-100">
                    <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-white font-black text-base flex items-center justify-center">2</div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Parent & Family Details</h2>
                      <p className="text-xs font-semibold text-slate-500">Provide parent contact and background details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Father / Parent 1 Sub-Card */}
                    <div className="space-y-3 p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                      <span className="text-xs font-black text-sky-800 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-sky-600" />
                        Father / Parent 1
                      </span>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Full Name *</label>
                        <input type="text" name="parent1Name" value={formData.parent1Name} onChange={handleChange} placeholder="Enter full name" className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.parent1Name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-xs font-medium bg-white focus:outline-none focus:border-sky-500`} />
                        {errors.parent1Name && <p className="text-[10px] font-bold text-rose-500">{errors.parent1Name}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Occupation</label>
                        <input type="text" name="parent1Occ" value={formData.parent1Occ} onChange={handleChange} placeholder="Enter occupation" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:border-sky-500" />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Mobile Number *</label>
                        <input type="tel" name="parent1Mobile" value={formData.parent1Mobile} onChange={handleChange} placeholder="Enter mobile number" className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.parent1Mobile ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-xs font-medium bg-white focus:outline-none focus:border-sky-500`} />
                        {errors.parent1Mobile && <p className="text-[10px] font-bold text-rose-500">{errors.parent1Mobile}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Email Address *</label>
                        <input type="email" name="parent1Email" value={formData.parent1Email} onChange={handleChange} placeholder="Enter email address" className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.parent1Email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-xs font-medium bg-white focus:outline-none focus:border-sky-500`} />
                        {errors.parent1Email && <p className="text-[10px] font-bold text-rose-500">{errors.parent1Email}</p>}
                      </div>
                    </div>

                    {/* Mother / Parent 2 Sub-Card */}
                    <div className="space-y-3 p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                      <span className="text-xs font-black text-rose-800 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-rose-500" />
                        Mother / Parent 2
                      </span>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Full Name *</label>
                        <input type="text" name="parent2Name" value={formData.parent2Name} onChange={handleChange} placeholder="Enter full name" className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.parent2Name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-xs font-medium bg-white focus:outline-none focus:border-sky-500`} />
                        {errors.parent2Name && <p className="text-[10px] font-bold text-rose-500">{errors.parent2Name}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Occupation</label>
                        <input type="text" name="parent2Occ" value={formData.parent2Occ} onChange={handleChange} placeholder="Enter occupation" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:border-sky-500" />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Mobile Number *</label>
                        <input type="tel" name="parent2Mobile" value={formData.parent2Mobile} onChange={handleChange} placeholder="Enter mobile number" className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.parent2Mobile ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-xs font-medium bg-white focus:outline-none focus:border-sky-500`} />
                        {errors.parent2Mobile && <p className="text-[10px] font-bold text-rose-500">{errors.parent2Mobile}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-black text-slate-700">Relationship to Child</label>
                        <select name="relationship" value={formData.relationship} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:border-sky-500">
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Mother Tongue & Siblings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Mother Tongue</label>
                      <select name="motherTongue" value={formData.motherTongue} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:border-sky-500">
                        <option value="">Select mother tongue</option>
                        <option value="English">English</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Other">Other (Please specify)</option>
                      </select>
                    </div>

                    {formData.motherTongue === 'Other' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-black text-rose-600">Specify Mother Tongue *</label>
                        <input
                          type="text"
                          name="otherMotherTongue"
                          value={formData.otherMotherTongue}
                          onChange={handleChange}
                          placeholder="Type mother tongue"
                          className={`w-full px-4 py-3 rounded-2xl border ${errors.otherMotherTongue ? 'border-rose-400 bg-rose-50/30' : 'border-rose-200 bg-rose-50/20'} text-sm font-medium focus:outline-none focus:border-rose-500`}
                        />
                        {errors.otherMotherTongue && <p className="text-xs font-bold text-rose-500">{errors.otherMotherTongue}</p>}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Does the child have any siblings?</label>
                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                          <input type="radio" name="hasSiblings" value="Yes" checked={formData.hasSiblings === 'Yes'} onChange={handleChange} className="w-4 h-4 text-emerald-600" />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                          <input type="radio" name="hasSiblings" value="No" checked={formData.hasSiblings === 'No'} onChange={handleChange} className="w-4 h-4 text-emerald-600" />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {formData.hasSiblings === 'Yes' && (
                      <div className="sm:col-span-2 space-y-1">
                        <label className="block text-xs font-black text-slate-800">If yes, Sibling Name & Age</label>
                        <input type="text" name="siblingDetails" value={formData.siblingDetails} onChange={handleChange} placeholder="Enter name and age" className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium" />
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

              {/* STEP 3: HEALTH, EMERGENCY & DOCUMENTS */}
              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  
                  <div className="flex items-center gap-3 bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100">
                    <div className="w-9 h-9 rounded-full bg-[#10B981] text-white font-black text-base flex items-center justify-center">3</div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Emergency & Documents</h2>
                      <p className="text-xs font-semibold text-slate-500">Provide emergency contact and upload documents</p>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Emergency Contact Name *</label>
                      <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Enter contact name" className={`w-full px-4 py-3 rounded-2xl border ${errors.emergencyName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium focus:outline-none focus:border-sky-500`} />
                      {errors.emergencyName && <p className="text-xs font-bold text-rose-500">{errors.emergencyName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Relationship *</label>
                      <input type="text" name="emergencyRel" value={formData.emergencyRel} onChange={handleChange} placeholder="Enter relationship" className={`w-full px-4 py-3 rounded-2xl border ${errors.emergencyRel ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium focus:outline-none focus:border-sky-500`} />
                      {errors.emergencyRel && <p className="text-xs font-bold text-rose-500">{errors.emergencyRel}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Mobile Number *</label>
                      <input type="tel" name="emergencyMobile" value={formData.emergencyMobile} onChange={handleChange} placeholder="Enter mobile number" className={`w-full px-4 py-3 rounded-2xl border ${errors.emergencyMobile ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium focus:outline-none focus:border-sky-500`} />
                      {errors.emergencyMobile && <p className="text-xs font-bold text-rose-500">{errors.emergencyMobile}</p>}
                    </div>
                  </div>

                  {/* Health Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Any Allergies?</label>
                      <div className="flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                          <input type="radio" name="hasAllergies" value="Yes" checked={formData.hasAllergies === 'Yes'} onChange={handleChange} className="w-4 h-4 text-rose-600" />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-700">
                          <input type="radio" name="hasAllergies" value="No" checked={formData.hasAllergies === 'No'} onChange={handleChange} className="w-4 h-4 text-rose-600" />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {formData.hasAllergies === 'Yes' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-black text-slate-800">Specify Allergies</label>
                        <input type="text" name="allergiesDetail" value={formData.allergiesDetail} onChange={handleChange} placeholder="Enter allergy details" className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium" />
                      </div>
                    )}
                  </div>

                  {/* Documents Upload Grid */}
                  <div className="pt-3">
                    <label className="block text-xs font-black text-slate-800 mb-2">Upload Required Documents</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { key: 'birthCertificate', label: "Birth Certificate *", accept: "PDF, JPG, PNG (Max 1MB)" },
                        { key: 'previousSchoolRecord', label: "Previous School Record", accept: "PDF, JPG, PNG (Max 1MB)" },
                        { key: 'medicalRecord', label: "Medical Record", accept: "PDF, JPG, PNG (Max 1MB)" },
                      ].map((doc) => (
                        <div
                          key={doc.key}
                          onClick={() => fileInputRefs[doc.key].current?.click()}
                          className={`h-28 rounded-2xl border-2 border-dashed p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                            files[doc.key] ? 'border-emerald-400 bg-emerald-50/40' : errors[doc.key] ? 'border-rose-400 bg-rose-50/30' : 'border-sky-200 bg-sky-50/30 hover:border-sky-400'
                          }`}
                        >
                          <input type="file" ref={fileInputRefs[doc.key]} onChange={(e) => handleFileChange(e, doc.key)} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                          <span className="text-xs font-black text-slate-800 mb-1">{doc.label}</span>

                          {files[doc.key] ? (
                            <div className="flex items-center gap-1.5 text-emerald-700">
                              <FileCheck className="w-4 h-4 text-emerald-500" />
                              <span className="text-[11px] font-bold truncate max-w-[120px]">{files[doc.key].name}</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-sky-600 mb-1" />
                              <span className="text-[11px] font-extrabold text-sky-700">Upload File</span>
                              <span className="text-[9px] font-semibold text-slate-400">{doc.accept}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.birthCertificate && <p className="text-xs font-bold text-rose-500 mt-1">{errors.birthCertificate}</p>}
                  </div>

                </motion.div>
              )}

              {/* STEP 4: ADDITIONAL, DECLARATION & SIGNATURE */}
              {currentStep === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  
                  <div className="flex items-center gap-3 bg-sky-50/80 p-4 rounded-2xl border border-sky-100">
                    <div className="w-9 h-9 rounded-full bg-[#06B6D4] text-white font-black text-base flex items-center justify-center">4</div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Declaration & Signature</h2>
                      <p className="text-xs font-semibold text-slate-500">Confirm details and sign application</p>
                    </div>
                  </div>

                  {/* How heard with "Other" */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">How did you hear about Kidwin Preschool?</label>
                      <select name="howHeard" value={formData.howHeard} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:border-sky-500">
                        <option value="">Select option</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Google Maps">Google Maps</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Friend / Family">Friend / Family</option>
                        <option value="Existing Parent">Existing Parent</option>
                        <option value="Other">Other (Please specify)</option>
                      </select>
                    </div>

                    {formData.howHeard === 'Other' && (
                      <div className="space-y-1">
                        <label className="block text-xs font-black text-rose-600">Please specify *</label>
                        <input
                          type="text"
                          name="otherHowHeard"
                          value={formData.otherHowHeard}
                          onChange={handleChange}
                          placeholder="Type details"
                          className={`w-full px-4 py-3 rounded-2xl border ${errors.otherHowHeard ? 'border-rose-400 bg-rose-50/30' : 'border-rose-200 bg-rose-50/20'} text-sm font-medium focus:outline-none focus:border-rose-500`}
                        />
                        {errors.otherHowHeard && <p className="text-xs font-bold text-rose-500">{errors.otherHowHeard}</p>}
                      </div>
                    )}
                  </div>

                  {/* Declarations Checkboxes */}
                  <div className="space-y-3 bg-slate-50/90 p-4.5 rounded-2xl border border-slate-200/80">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="declarationTrue" checked={formData.declarationTrue} onChange={handleChange} className="mt-1 w-4.5 h-4.5 text-rose-600 rounded" />
                      <span className="text-xs font-bold text-slate-800">I confirm that the information provided is true and complete. *</span>
                    </label>
                    {errors.declarationTrue && <p className="text-xs font-bold text-rose-500 ml-7">{errors.declarationTrue}</p>}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="declarationPolicy" checked={formData.declarationPolicy} onChange={handleChange} className="mt-1 w-4.5 h-4.5 text-rose-600 rounded" />
                      <span className="text-xs font-bold text-slate-800">I agree to the school's admission policies and guidelines. *</span>
                    </label>
                    {errors.declarationPolicy && <p className="text-xs font-bold text-rose-500 ml-7">{errors.declarationPolicy}</p>}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="declarationContact" checked={formData.declarationContact} onChange={handleChange} className="mt-1 w-4.5 h-4.5 text-rose-600 rounded" />
                      <span className="text-xs font-bold text-slate-800">I authorize the school to contact me regarding the admission. *</span>
                    </label>
                    {errors.declarationContact && <p className="text-xs font-bold text-rose-500 ml-7">{errors.declarationContact}</p>}
                  </div>

                  {/* Signature Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Parent / Guardian Name *</label>
                      <input type="text" name="parentSignName" value={formData.parentSignName} onChange={handleChange} placeholder="Enter full name" className={`w-full px-4 py-3 rounded-2xl border ${errors.parentSignName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'} text-sm font-medium focus:outline-none focus:border-sky-500`} />
                      {errors.parentSignName && <p className="text-xs font-bold text-rose-500">{errors.parentSignName}</p>}
                    </div>

                    <div className="space-y-1">
                      <SignaturePad
                        isSigned={!!formData.signatureData || !!files.signaturePhoto}
                        error={errors.signatureData}
                        onSaveFile={(file) => {
                          setFiles((prev) => ({ ...prev, signaturePhoto: file }));
                        }}
                        onSave={(dataUrl) => {
                          setFormData((prev) => ({ ...prev, signatureData: dataUrl }));
                          if (errors.signatureData) {
                            setErrors((prev) => {
                              const updated = { ...prev };
                              delete updated.signatureData;
                              return updated;
                            });
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-black text-slate-800">Date *</label>
                      <input type="date" name="signDate" value={formData.signDate} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-sky-500" />
                    </div>
                  </div>

                </motion.div>
              )}

              {/* STEP NAVIGATION CONTROLS */}
              <div className="pt-5 sm:pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div className="hidden sm:block" />}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-[#1B75BC] hover:bg-sky-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-[#FF1775] via-[#F37023] to-[#FF4500] hover:from-rose-600 hover:to-orange-600 text-white font-black text-sm shadow-xl hover:scale-105 transition-all cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                  >
                    <Send className="w-4.5 h-4.5 text-white" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Registration'}</span>
                  </button>
                )}
              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AdmissionRegistration;
