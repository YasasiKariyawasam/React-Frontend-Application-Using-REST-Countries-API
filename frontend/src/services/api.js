import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  return axios.get(`${API_BASE}/all`);
};

export const getCountryByName = async (name) => {
  return axios.get(`${API_BASE}/name/${name}`);
};

export const getCountriesByRegion = async (region) => {
  return axios.get(`${API_BASE}/region/${region}`);
};

export const getCountryByCode = async (code) => {
  return axios.get(`${API_BASE}/alpha/${code}`);
};