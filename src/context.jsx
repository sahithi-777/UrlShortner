import { createContext, useEffect, useContext, useCallback } from "react";
import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/use-fetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUserFn, error } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role === "authenticated";
  
  // Use useCallback to prevent recreation of fetchUser function on every render
  const fetchUser = useCallback(() => {
    return fetchUserFn();
  }, [fetchUserFn]);
 
  // Only fetch user on initial mount
  useEffect(() => {
    fetchUser().catch(err => {
      console.error('Failed to fetch user:', err);
    });
  }, []); // Empty dependency array means this runs once on mount

  const contextValue = {
    user,
    loading,
    fetchUser, 
    isAuthenticated,
    error
  };

  return (
    <UrlContext.Provider value={contextValue}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  const context = useContext(UrlContext);
  if (context === undefined) {
    throw new Error('UrlState must be used within a UrlProvider');
  }
  return context;
};

export default UrlProvider;
