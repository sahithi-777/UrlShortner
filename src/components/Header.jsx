import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { BarLoader } from 'react-spinners';
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";
import { logout } from '@/db/apiAuth';
import { LinkIcon, LogOut, ChevronDown } from 'lucide-react';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link to="/">
          <img src="/logo.png" alt="URLite logo" className='h-16 object-contain'/>
        </Link>
        <div className='flex items-center gap-4'>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-800"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.user_metadata?.profilepic} />
                  <AvatarFallback>
                    {user?.user_metadata?.name ? user.user_metadata.name.charAt(0) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">
                    {user?.user_metadata?.name}
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                  <button
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                        setDropdownOpen(false);
                      });
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;