import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface FacilityCardProps {
  facility: {
    id: number;
    name: string;
    type: string;
    description: string;
    services: string[];
  };
  onSelect: (id: number) => void;
}

export function FacilityCard({ facility, onSelect }: FacilityCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  return (
    <div
      onClick={() => onSelect(facility.id)}
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{facility.name}</h3>
        <button
          onClick={toggleFavorite}
          className={`p-1 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          <Star className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">{facility.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {facility.services.slice(0, 3).map((service, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
          >
            {service}
          </span>
        ))}
        {facility.services.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            +{facility.services.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}