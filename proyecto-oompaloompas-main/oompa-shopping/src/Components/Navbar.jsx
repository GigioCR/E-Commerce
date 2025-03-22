import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ShoppingBag, User, LogOut, ChevronDown } from 'lucide-react';
import logo from '../assets/logo_oompas.png'
import { navItems } from '../constants';
import { useAuth } from '../Components/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [nav, setNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setNav(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed w-full top-0 bg-black shadow-lg z-50">
        <div className="container px-4 mx-auto relative text-md">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center flex-shrink-0">
              <img className="w-10 mr-2" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight font-bold text-white"><a href="/">WonkaTech</a></span>
            </div>

            <ul className="hidden lg:flex space-x-6">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                    <a href={item.href} className="block py-2 text-white hover:text-[#41d2f2]">
                      {item.label}
                      <span className="absolute left-0 bottom-0 block h-0.5 w-0 bg-[#41d2f2] rounded-full transition-all duration-200 group-hover:w-full"></span>
                    </a>
                </li>
              ))}
              <li>
                <form onSubmit={handleSearch} className="relative mt-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 px-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#41d2f2]"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Search size={16} className="text-gray-500" />
                  </button>
                </form>
              </li>
            </ul>

            <div className="hidden lg:flex justify-center space-x-3 items-center mr-4">
              <a href="/cart">
                <ShoppingBag color="white" />
              </a>
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    className="flex items-center text-white hover:text-[#41d2f2]"
                  >
                    <User size={20} className="mr-2" />
                    <span>{user.name}</span>
                    <ChevronDown size={20} className="ml-1" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-30 bg-white rounded-md shadow-lg py-1 z-10">
                      <button 
                        onClick={handleLogout} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut size={16} className="inline mr-2" />
                        Logout
                      </button>
                      <a href="/Profile">
                      <button 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <User size={16} className="inline mr-2" />
                        Profile
                      </button>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <a href="/login" className="text-white py-2 px-3 hover:text-[#41d2f2]">
                    Log in
                  </a>
                  <a href="/register" className="text-white hover:text-[#41d2f2]">
                    Sign Up
                  </a>
                </>
              )}
            </div>

            <div onClick={handleNav} className="block lg:hidden">
              {nav ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
            </div>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${nav ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="bg-black px-4 py-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-3 pr-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#41d2f2] bg-gray-800 text-white"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={16} className="text-gray-400" />
              </button>
            </form>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index} className="py-2">
                    <a href={item.href} className="block text-white hover:text-[#41d2f2] transition-colors duration-200">
                      {item.label}
                    </a>
                </li>
              ))}
            </ul>
            <div className='flex flex-row mt-1'>
              <p className='text-white mr-2 '>
                Your Cart
              </p>
              <a href="/cart" className='text-white'>
                <ShoppingBag color="white" />
              </a>
            </div>

            <div className="mt-4 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center justify-center text-white py-2">
                    <User size={20} className="mr-2" />
                    <span>{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-center py-2 px-3 border text-black rounded-full bg-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="block w-full text-center py-2 px-3 border text-black rounded-full bg-white transition-colors duration-200">
                    Log in
                  </a>
                  <a href="/register" className="block w-full text-center py-2 px-3 border text-black rounded-full bg-white transition-colors duration-200">
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className={`h-16 ${nav ? 'md:h-16' : ''}`}></div>
    </>
  );
}

export default NavBar;