import { useState } from 'react';
import { Phone } from 'lucide-react';
import { EMERGENCY_NUMBERS } from '@/lib/constants';
import { toast } from 'react-hot-toast';

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
    toast.success(`Ligando para ${number}...`);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors"
      >
        <Phone className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-48">
          <div className="space-y-2">
            <button
              onClick={() => handleEmergencyCall(EMERGENCY_NUMBERS.SAMU)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              SAMU (192)
            </button>
            <button
              onClick={() => handleEmergencyCall(EMERGENCY_NUMBERS.BOMBEIROS)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              Bombeiros (193)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}