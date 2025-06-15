import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const PostGrid = ({ posts, emptyTitle, emptyDescription, showCreateButton }) => {
  const navigate = useNavigate();

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Grid3X3" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyTitle}
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {emptyDescription}
        </p>
        {showCreateButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create')}
            className="gradient-button text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Create Your First Post
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="aspect-square cursor-pointer group relative overflow-hidden rounded-lg"
        >
          {post.imageUrl ? (
            <>
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Heart" size={20} className="fill-white" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="MessageCircle" size={20} className="fill-white" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="FileText" size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 px-2 break-words">
                  {post.caption?.substring(0, 50)}...
                </p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PostGrid;