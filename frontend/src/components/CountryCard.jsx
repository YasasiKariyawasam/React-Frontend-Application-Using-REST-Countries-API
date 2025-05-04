import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function CountryCard({ country}) {
  const navigate = useNavigate();
    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => navigate(`/country/${country.cca3}`)}
      >
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{country.name.common}</h3>
          <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-semibold">Region:</span> {country.region}</p>
          <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    );
  }