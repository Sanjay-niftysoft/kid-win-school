import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, PenTool, CheckCircle2, Upload, Image, Trash2 } from 'lucide-react';

const SignaturePad = ({ onSave, onSaveFile, isSigned, error }) => {
  const [mode, setMode] = useState('draw'); // 'draw' or 'upload'
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  useEffect(() => {
    if (mode !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions matching container display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2; // High DPI resolution
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.strokeStyle = '#0F2942'; // Dark Navy signature stroke
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [mode]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasContent(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas && hasContent) {
      const dataUrl = canvas.toDataURL('image/png');
      if (onSave) {
        onSave(dataUrl);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasContent(false);
    setUploadedPreview(null);
    setUploadedFileName('');
    if (onSave) {
      onSave('');
    }
    if (onSaveFile) {
      onSaveFile(null);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExts = ['jpg', 'jpeg', 'png', 'pdf'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(ext)) {
      alert('Please upload a valid signature image (PNG, JPG, JPEG).');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert('File size must be less than 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setUploadedPreview(dataUrl);
      setUploadedFileName(file.name);
      setHasContent(true);
      if (onSave) {
        onSave(dataUrl);
      }
      if (onSaveFile) {
        onSaveFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-[#1B75BC]" />
          <span>Parent / Guardian Signature *</span>
        </label>
        
        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setMode('draw');
              clearCanvas();
            }}
            className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              mode === 'draw' ? 'bg-[#1B75BC] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3 h-3" />
            <span>Draw</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('upload');
              clearCanvas();
            }}
            className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              mode === 'upload' ? 'bg-[#1B75BC] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {mode === 'draw' ? (
        <div
          className={`relative w-full h-36 rounded-2xl border-2 border-dashed bg-sky-50/40 transition-all overflow-hidden ${
            error
              ? 'border-rose-400 bg-rose-50/30'
              : isSigned || hasContent
              ? 'border-emerald-400 bg-emerald-50/20'
              : 'border-slate-300 hover:border-sky-400'
          }`}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none"
          />

          {!hasContent && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 gap-1 select-none">
              <PenTool className="w-6 h-6 text-sky-400 opacity-60" />
              <span className="text-xs font-semibold text-slate-400">Draw or sign your signature here</span>
            </div>
          )}

          {hasContent && (
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-white/90 hover:bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Signed</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* UPLOAD SIGNATURE PHOTO MODE */
        <div
          onClick={() => !uploadedPreview && fileInputRef.current?.click()}
          className={`relative w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 transition-all overflow-hidden text-center ${
            uploadedPreview
              ? 'border-emerald-400 bg-emerald-50/20'
              : error
              ? 'border-rose-400 bg-rose-50/30'
              : 'border-sky-300 bg-sky-50/40 hover:border-sky-500 cursor-pointer'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />

          {uploadedPreview ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img
                src={uploadedPreview}
                alt="Signature Uploaded Preview"
                className="max-h-24 max-w-full object-contain filter drop-shadow-sm mb-1"
              />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-700 truncate max-w-[150px]">
                  {uploadedFileName}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearCanvas();
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-rose-600 hover:text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200 shadow-xs cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 select-none">
              <Image className="w-7 h-7 text-[#1B75BC] opacity-80" />
              <span className="text-xs font-black text-slate-800">Upload Signature Photo</span>
              <span className="text-[10px] font-semibold text-slate-400">PNG, JPG or JPEG (Max 1MB)</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs font-bold text-rose-500">{error}</p>}
    </div>
  );
};

export default SignaturePad;
