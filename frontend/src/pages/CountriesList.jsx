import { useState, useEffect } from 'react';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/api';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      const response = await getAllCountries();
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (name) => {
    if (!name) {
      fetchAllCountries();
      return;
    }
    try {
      const response = await getCountryByName(name);
      setCountries(response.data);
    } catch (error) {
      console.error("Error searching countries:", error);
      setCountries([]);
    }
  };

 const handleFilter = async (region) => {
    if (!region) {
      fetchAllCountries();
      return;
    }
    try {
      const response = await getCountriesByRegion(region);
      setCountries(response.data);
    } catch (error) {
      console.error("Error filtering countries:", error);
    setCountries([]);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  } 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <Search onSearch={handleSearch} />
       <Filter onFilter={handleFilter} /> 
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {countries.map(country => (
          <CountryCard 
            key={country.cca3} 
            country={country} 
            onClick={() => navigate(`/country/${country.cca3}`)}
          />
        ))}
      </div>
    </div>
  );
}