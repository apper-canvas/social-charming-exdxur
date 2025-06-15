import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { userService } from '@/services';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await userService.getCurrentUser();
      setCurrentUser(user);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSearchPage = location.pathname === '/search';

  return (
    <header className="flex-shrink-0 h-16 bg-surface border-b border-gray-200 z-40">
      <div className="max-w-full mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="hidden sm:block font-display font-bold text-xl text-gray-900">
              Pulse
            </span>
          </motion.button>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          {!isSearchPage && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/search')}
              className="w-full flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <ApperIcon name="Search" size={20} />
              <span>Search users, posts...</span>
            </motion.button>
          )}
</div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-2">
          {/* Chat Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/chat')}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Messages"
          >
            <ApperIcon name="MessageCircle" size={20} className="text-gray-600" />
          </motion.button>

          {/* Notifications Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Notifications"
          >
            <ApperIcon name="Bell" size={20} className="text-gray-600" />
          </motion.button>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={menuRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={16} className="text-gray-600" />
                </div>
              )}
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <ApperIcon name="User" size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <ApperIcon name="Settings" size={16} />
                    Settings
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      console.log('Logout clicked');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-error"
                  >
                    <ApperIcon name="LogOut" size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;