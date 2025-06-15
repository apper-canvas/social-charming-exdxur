import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: 'Home', label: 'Home' },
    { path: '/search', icon: 'Search', label: 'Search' },
    { path: '/create', icon: 'Plus', label: 'Create', isSpecial: true },
    { path: '/profile', icon: 'User', label: 'Profile' },
  ];

  return (
    <div className="lg:hidden flex-shrink-0 bg-surface border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                item.isSpecial
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : isActive
                  ? 'text-primary'
                  : 'text-gray-600'
              }`}
            >
              <ApperIcon 
                name={item.icon} 
                size={22} 
                className={item.isSpecial ? 'text-white' : ''}
              />
              <span className={`text-xs font-medium ${
                item.isSpecial ? 'text-white' : ''
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;