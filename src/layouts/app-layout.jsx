import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout=()=>{
    return <div>
        <main className="min-h-screen container mx-auto">
            <Header/>
            <Outlet/>
           
        </main>
        <div className="p-10 mt-10 text-center bg-gray-800">
            <p className="text-emerald-400 text-lg font-medium mb-2">
              💫 Shrink it. Share it. Track it.
    </p>
     <p className="text-gray-300 text-sm">
      © 2025 Your URL Shortener. Made with ❤️
    </p>
        </div>
    </div>
};

export default AppLayout;