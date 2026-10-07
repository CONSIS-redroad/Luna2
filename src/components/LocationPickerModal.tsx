// PATH: src/components/LocationPickerModal.tsx | VERSION: 1.6.1 | REQ-ID: UI-LOC-03
import React from 'react';
import { MapPin, X, Check } from 'lucide-react';
import { GeoLocation } from '../types/location';
import { GLOBAL_CITIES } from '../services/locationService';

interface LocModalProps {
  currentLocation: GeoLocation;
  onSelect: (loc: GeoLocation) => void;
  onClose: () => void;
}

export const LocationPickerModal: React.FC<LocModalProps> = ({ currentLocation, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1720] border border-white/20 rounded-2xl shadow-2xl max-w-sm w-full p-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#fbbf24]" />
            <h3 className="font-black text-sm">Wybierz lokalizację nieba</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-[#94a3b8] hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-3 space-y-1.5 max-h-60 overflow-y-auto pr-1">
          {GLOBAL_CITIES.map(city => {
            const isSelected = city.id === currentLocation.id;
            return (
              <button
                key={city.id}
                onClick={() => { onSelect(city); onClose(); }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected ? 'border-[#38bdf8] bg-[#38bdf8]/20 shadow-md' : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div>
                  <p className="font-black text-sm text-white">{city.name}</p>
                  <p className="text-[11px] text-[#94a3b8]">{city.country} · Śr. temp: {city.tempOffset > 0 ? `+${city.tempOffset}` : city.tempOffset}°C</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#38bdf8]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
