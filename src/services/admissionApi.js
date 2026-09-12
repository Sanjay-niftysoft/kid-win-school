/**
 * Admission Registration API Service
 * Handles posting FormData (multipart/form-data) to PHP backend endpoint.
 * 
 * In development: Vite proxy forwards /api/* -> PHP backend (see vite.config.js)
 * In production: Ensure VITE_API_ADMISSION_URL is set to your PHP backend URL
 */

export const submitAdmissionForm = async (formData) => {
  // Relative API endpoint path - can be configured via environment variable
  const apiEndpoint = import.meta.env.VITE_API_ADMISSION_URL || '/api/admission.php';

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    body: formData, // Browser automatically sets Content-Type to multipart/form-data with boundary
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      // Not JSON, use raw text
    }
    throw new Error(errorJson?.message || `Server error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
};
