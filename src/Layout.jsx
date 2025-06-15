import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import MobileNavigation from '@/components/organisms/MobileNavigation';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Desktop Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile */}
        <aside className="hidden lg:flex w-20 xl:w-64 bg-surface border-r border-gray-200 flex-col">
          <div className="p-4">
            {/* Desktop Navigation Links */}
            <nav className="space-y-2">
              {[
                { path: '/home', icon: 'Home', label: 'Home' },
                { path: '/search', icon: 'Search', label: 'Search' },
                { path: '/create', icon: 'Plus', label: 'Create' },
                { path: '/profile', icon: 'User', label: 'Profile' }
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center ${
                    item.icon === 'Home' ? '🏠' :
                    item.icon === 'Search' ? '🔍' :
                    item.icon === 'Plus' ? '➕' :
                    '👤'
                  }`} />
                  <span className="hidden xl:block font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Layout;