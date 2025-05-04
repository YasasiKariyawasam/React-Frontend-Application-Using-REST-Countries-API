import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

export default function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await getCountryByCode(code);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country:", error);
        setError("Failed to load country data");
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !country) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || "Country not found"}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Two-tone header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
            <h1 className="text-3xl font-bold">{country.name.common}</h1>
            <p className="text-green-100">{country.region}</p>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            {/* Flag section - blue background */}
            <div className="lg:w-1/2 bg-blue-50 p-6 flex items-center justify-center">
              <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                className="max-h-80 w-auto object-contain border-4 border-white shadow-md"
              />
            </div>
            
            {/* Details section - white background */}
            <div className="lg:w-1/2 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm font-medium">Native Name</p>
                    <p className="font-semibold">{Object.values(country.name.nativeName)[0]?.common || 'N/A'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm font-medium">Population</p>
                    <p className="font-semibold">{country.population.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm font-medium">Region</p>
                    <p className="font-semibold">{country.region}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm font-medium">Capital</p>
                    <p className="font-semibold">{country.capital?.[0] || 'N/A'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm font-medium">Currencies</p>
                    <p className="font-semibold">
                      {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm font-medium">Languages</p>
                    <p className="font-semibold">
                      {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              {country.borders && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Border Countries</h3>
                  <div className="flex flex-wrap gap-3">
                    {country.borders.map(border => (
                      <button 
                        key={border}
                        className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition shadow-sm"
                        onClick={() => navigate(`/country/${border}`)}
                      >
                        {border}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}