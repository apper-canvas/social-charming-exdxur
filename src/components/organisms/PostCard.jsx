import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import CommentModal from '@/components/organisms/CommentModal';

const PostCard = ({ post, onLike, onSave }) => {
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    onLike();
  };

  const handleSave = () => {
    onSave();
  };

  const handleUserClick = () => {
    navigate(`/profile/${post.user?.username}`);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-surface rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleUserClick}
            className="flex items-center gap-3 flex-1"
          >
            {post.user?.avatar ? (
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={16} className="text-gray-600" />
              </div>
            )}
            <div className="text-left">
              <p className="font-semibold text-gray-900 break-words">
                {post.user?.displayName || post.user?.username}
              </p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ApperIcon name="MoreHorizontal" size={20} className="text-gray-500" />
          </motion.button>
        </div>

        {/* Image */}
        {post.imageUrl && (
          <div className="relative">
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="flex items-center gap-2 group"
              >
                <motion.div
                  animate={post.isLiked ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ApperIcon 
                    name="Heart" 
                    size={24} 
                    className={`transition-colors ${
                      post.isLiked 
                        ? 'text-accent fill-accent' 
                        : 'text-gray-700 group-hover:text-accent'
                    }`}
                  />
                </motion.div>
                <span className="text-sm font-medium text-gray-700">
                  {post.likes}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowComments(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <ApperIcon name="MessageCircle" size={24} />
                <span className="text-sm font-medium">{post.comments}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <ApperIcon name="Share" size={24} />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className="transition-colors"
            >
              <ApperIcon 
                name="Bookmark" 
                size={24} 
                className={
                  post.isSaved 
                    ? 'text-primary fill-primary' 
                    : 'text-gray-700 hover:text-primary'
                }
              />
            </motion.button>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="text-gray-900 break-words">
              <span className="font-semibold">{post.user?.username}</span>{' '}
              <span>{post.caption}</span>
            </div>
          )}

          {/* Comments Preview */}
          {post.comments > 0 && (
            <motion.button
              whileHover={{ opacity: 0.7 }}
              onClick={() => setShowComments(true)}
              className="text-gray-500 text-sm mt-2 block"
            >
              View all {post.comments} comments
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Comments Modal */}
      <AnimatePresence>
        {showComments && (
          <CommentModal
            post={post}
            onClose={() => setShowComments(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PostCard;