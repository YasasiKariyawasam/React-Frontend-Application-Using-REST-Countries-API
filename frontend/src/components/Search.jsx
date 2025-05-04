import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { getCountryByName } from '../services/api';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const searchRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length >= 2) { // Show after 2 characters
        try {
          const response = await getCountryByName(searchTerm);
          setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
          setShowSuggestions(true);
        } catch (error) {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
      setIsTyping(false);
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && suggestions.length > 0) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (country) => {
    setSearchTerm(country.name.common);
    onSearch(country.name.common);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={searchRef} className="mb-6 relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Type 2+ characters to search..."
            className="w-full md:w-96 px-4 py-2 pl-10 rounded shadow"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('');
                setShowSuggestions(false);
              }}
              className="absolute right-10 top-2 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full md:w-96 bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
          {suggestions.map((country) => (
            <li 
              key={country.cca3}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center"
              onMouseDown={() => handleSuggestionClick(country)} // Use onMouseDown for faster response
            >
              <span className="mr-2">{country.flag}</span>
              <div>
                <p className="font-medium">{country.name.common}</p>
                <p className="text-xs text-gray-500">
                  {country.capital?.[0]}, {country.region}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Loading state */}
      {isTyping && searchTerm.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full md:w-96 bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
          Searching...
        </div>
      )}

      {/* No results */}
      {!isTyping && searchTerm.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full md:w-96 bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
          No countries found
        </div>
      )}
    </div>
  );
}