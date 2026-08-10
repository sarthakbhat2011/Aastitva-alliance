import React, { useState } from 'react';
import { X, Clock, Video, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedTime, setSelectedTime] = useState<string>('Tomorrow (04:00 PM)');
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0B1120] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#B8A9C9] hover:text-white p-2 rounded-full bg-[#050811] border border-[#D4AF37]/30 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!booked ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#E8A53E]/20 text-[#E8A53E] text-xs font-semibold uppercase tracking-wider border border-[#E8A53E]/30">
                15-Minute Direct Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                Book a Free Consultation Call
              </h3>
              <p className="text-sm text-[#D3C5E5]">
                Speak directly with Aastitva’s founding team to discuss your school’s academic summit requirements.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#D3C5E5] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white placeholder-[#8E8570] focus:border-[#E8A53E] focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#D3C5E5] mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="principal@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white placeholder-[#8E8570] focus:border-[#E8A53E] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#D3C5E5] mb-1">School / Organisation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heritage School Jammu"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-[#D4AF37]/30 text-white placeholder-[#8E8570] focus:border-[#E8A53E] focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D3C5E5] mb-1">Select Preferred Slot</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Tomorrow (04:00 PM)', 'Tomorrow (06:30 PM)', 'This Saturday (11:00 AM)', 'This Sunday (03:00 PM)'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        selectedTime === slot
                          ? 'bg-[#E8A53E]/20 border-[#E8A53E] text-[#EAE0C8]'
                          : 'bg-[#050811] border-[#D4AF37]/20 text-[#cecece] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 inline mr-1 text-[#E8A53E]" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#050811] border border-[#D4AF37]/20 text-xs text-[#D3C5E5] flex items-center gap-2.5">
                <Video className="w-5 h-5 text-[#E8A53E] shrink-0" />
                <span>Call will be hosted over Google Meet / Zoom with calendar invite sent to your inbox.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl shimmer-btn text-[#050811] font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm 15-Minute Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E8A53E]/20 text-[#E8A53E] flex items-center justify-center mx-auto border border-[#E8A53E]/40 animate-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-white">Consultation Requested!</h3>
            <p className="text-sm text-[#D3C5E5] max-w-md mx-auto">
              Thank you, <strong>{name}</strong> ({institution}). Our director will send a calendar invitation for <strong>{selectedTime}</strong> to <strong>{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#E8A53E] text-[#050811] font-bold text-xs hover:bg-[#D4AF37] transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
