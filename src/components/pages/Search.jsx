import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { userService } from '@/services';
import ApperIcon from '@/components/ApperIcon';
import UserCard from '@/components/molecules/UserCard';
import SearchSkeleton from '@/components/atoms/SearchSkeleton';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingUsers, setTrendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadTrendingUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const delayedSearch = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);

      return () => clearTimeout(delayedSearch);
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [searchQuery]);

  const loadTrendingUsers = async () => {
    try {
      const users = await userService.getTrending();
      setTrendingUsers(users);
    } catch (err) {
      toast.error('Failed to load trending users');
    } finally {
      setInitialLoading(false);
    }
  };

  const performSearch = async (query) => {
    setLoading(true);
    try {
      const results = await userService.search(query);
      setSearchResults(results);
    } catch (err) {
      toast.error('Search failed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const updatedUser = await userService.toggleFollow(userId);
      
      // Update search results
      setSearchResults(prev => 
        prev.map(user => user.id === userId ? updatedUser : user)
      );
      
      // Update trending users
      setTrendingUsers(prev => 
        prev.map(user => user.id === userId ? updatedUser : user)
      );

      toast.success(updatedUser.isFollowing ? 'User followed' : 'User unfollowed');
    } catch (err) {
      toast.error('Failed to update follow status');
    }
  };

  const displayUsers = searchQuery.trim() ? searchResults : trendingUsers;
  const showLoading = searchQuery.trim() ? loading : initialLoading;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative">
          <ApperIcon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-xl font-display font-semibold text-gray-900">
          {searchQuery.trim() ? 'Search Results' : 'Trending Users'}
        </h2>
        {searchQuery.trim() && (
          <p className="text-gray-500 mt-1">
            {loading ? 'Searching...' : `${searchResults.length} users found`}
          </p>
        )}
      </div>

      {/* Results */}
      {showLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <SearchSkeleton key={i} />
          ))}
        </div>
      ) : displayUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery.trim() ? 'No users found' : 'No trending users'}
          </h3>
          <p className="text-gray-500">
            {searchQuery.trim() 
              ? `Try searching for something else` 
              : 'Check back later for trending users'
            }
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {displayUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <UserCard 
                user={user}
                onFollow={() => handleFollow(user.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Search;