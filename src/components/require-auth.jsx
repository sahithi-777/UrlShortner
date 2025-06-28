import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {UrlState} from "@/context";
import {BarLoader} from "react-spinners";

function RequireAuth({children}) {
  const navigate = useNavigate();
  const {loading, isAuthenticated} = UrlState();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Only redirect if we've finished loading and the user is not authenticated
    if (!loading) {
      setHasCheckedAuth(true);
      if (!isAuthenticated) {
        navigate("/auth");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  // Show loading indicator only during initial auth check
  if (loading && !hasCheckedAuth) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
}

export default RequireAuth;
