import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const UserCard = ({ user, onFollow }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-surface rounded-xl shadow-sm border border-gray-200 p-4"
    >
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleUserClick}
          className="flex-shrink-0"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={20} className="text-gray-600" />
            </div>
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          <motion.button
            whileHover={{ opacity: 0.8 }}
            onClick={handleUserClick}
            className="text-left w-full"
          >
            <h3 className="font-semibold text-gray-900 break-words">
              {user.displayName}
            </h3>
            <p className="text-gray-500 text-sm break-words">
              @{user.username}
            </p>
            {user.bio && (
              <p className="text-gray-600 text-sm mt-1 break-words line-clamp-2">
                {user.bio}
              </p>
            )}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFollow}
          className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            user.isFollowing
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'gradient-button text-white hover:shadow-lg'
          }`}
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UserCard;