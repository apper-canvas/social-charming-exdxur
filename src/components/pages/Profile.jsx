import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { userService, postService } from '@/services';
import ApperIcon from '@/components/ApperIcon';
import PostGrid from '@/components/organisms/PostGrid';
import ProfileSkeleton from '@/components/atoms/ProfileSkeleton';
import ErrorState from '@/components/molecules/ErrorState';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      // Load current user if no username provided
      const profileUser = username 
        ? await userService.getByUsername(username)
        : await userService.getCurrentUser();
      
      setUser(profileUser);
      
      // Load user's posts
      const userPosts = await postService.getByUserId(profileUser.id);
      setPosts(userPosts);
      
      // Load saved posts if viewing own profile
      if (!username || profileUser.isCurrentUser) {
        const saved = await postService.getSaved();
        setSavedPosts(saved);
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!user) return;
    
    try {
      const updatedUser = await userService.toggleFollow(user.id);
      setUser(updatedUser);
      toast.success(updatedUser.isFollowing ? 'User followed' : 'User unfollowed');
    } catch (err) {
      toast.error('Failed to update follow status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ProfileSkeleton />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState 
          message={error || 'User not found'}
          onRetry={loadProfile}
        />
      </div>
    );
  }

  const isOwnProfile = !username || user.isCurrentUser;
  const displayPosts = activeTab === 'posts' ? posts : savedPosts;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Profile Header */}
        <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={40} className="text-gray-600" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-display font-bold text-gray-900">
                    {user.displayName}
                  </h1>
                  <p className="text-gray-500">@{user.username}</p>
                </div>

                {!isOwnProfile && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFollow}
                    className={`px-6 py-2 rounded-xl font-medium transition-all ${
                      user.isFollowing
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'gradient-button text-white hover:shadow-lg'
                    }`}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </motion.button>
                )}

                {isOwnProfile && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/settings')}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Edit Profile
                  </motion.button>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="text-gray-700 mb-4 max-w-md break-words">
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="font-bold text-lg">{user.postsCount || 0}</div>
                  <div className="text-gray-500 text-sm">Posts</div>
                </div>
                <button className="text-center hover:opacity-75 transition-opacity">
                  <div className="font-bold text-lg">{user.followersCount || 0}</div>
                  <div className="text-gray-500 text-sm">Followers</div>
                </button>
                <button className="text-center hover:opacity-75 transition-opacity">
                  <div className="font-bold text-lg">{user.followingCount || 0}</div>
                  <div className="text-gray-500 text-sm">Following</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
              activeTab === 'posts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ApperIcon name="Grid3X3" size={16} />
            Posts
          </motion.button>
          
          {isOwnProfile && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'saved'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ApperIcon name="Bookmark" size={16} />
              Saved
            </motion.button>
          )}
        </div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <PostGrid 
              posts={displayPosts}
              emptyTitle={activeTab === 'posts' ? 'No posts yet' : 'No saved posts'}
              emptyDescription={
                activeTab === 'posts' 
                  ? isOwnProfile 
                    ? 'Share your first post to get started' 
                    : 'This user hasn\'t posted anything yet'
                  : 'Posts you save will appear here'
              }
              showCreateButton={activeTab === 'posts' && isOwnProfile}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Profile;