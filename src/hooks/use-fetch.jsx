// hooks/use-fetch.js
import { useState, useCallback } from 'react';

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use useCallback to prevent recreation of fn on every render
  const fn = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      // Only pass options if it's not an empty object
      const hasOptions = Object.keys(options).length > 0;
      const response = hasOptions 
        ? await cb(options, ...args)
        : await cb(...args);
      
      setData(response);
      return response;
    } catch (error) {
      console.error('useFetch error:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cb, options]);

  return { data, loading, error, fn };
};

export default useFetch;
