import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../core/Main';
import Home from '../Component/Home';
import About from '../Component/About';
import CourseDetailPage from '../Component/CourseDetailPage';
import Gallery from '../Component/Gallery';
import Contact from '../Component/Contact';
import Testimonials from '../Component/Testimonials';
import AdmissionRegistration from '../Component/AdmissionRegistration';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<CourseDetailPage />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="course" element={<CourseDetailPage />} />
        <Route path="programs" element={<CourseDetailPage />} />
        <Route path="daycare" element={<CourseDetailPage />} />
        <Route path="afterschool" element={<CourseDetailPage />} />
        <Route path="after-school" element={<CourseDetailPage />} />
        <Route path="tuition" element={<CourseDetailPage />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="activities" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admission" element={<AdmissionRegistration />} />
        <Route path="admission-registration" element={<AdmissionRegistration />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
