import { createContext, useContext, useEffect, useState } from "react";
import { getCompletedUser } from "../services/api";

const CompletedUserContext = createContext(null);

export function CompletedUserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getCompletedUser();
      setUserProfile(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <CompletedUserContext.Provider
      value={{
        userProfile,
        loading,
        error,
        refetchUserProfile: fetchUserProfile,
      }}
    >
      {children}
    </CompletedUserContext.Provider>
  );
}

export const useCompletedUser = () => {
  const context = useContext(CompletedUserContext);
  if (!context) {
    throw new Error(
      "useCompletedUser must be used inside CompletedUserProvider"
    );
  }
  return context;
};
