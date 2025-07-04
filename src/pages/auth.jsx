import Login from "@/components/login";
import Signup from "@/components/signup";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UrlState} from "@/context";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const redirectUrl = `/dashboard${longLink ? `?createNew=${longLink}` : ""}`;
      navigate(redirectUrl);
    }
  }, [isAuthenticated, loading, navigate, longLink]);

  // Show loading state
  if (loading) {
    return (
      <div className="mt-36 flex flex-col items-center gap-10">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first.."
          : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;