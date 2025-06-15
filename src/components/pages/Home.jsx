import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { postService } from '@/services';
import PostCard from '@/components/organisms/PostCard';
import PostSkeleton from '@/components/atoms/PostSkeleton';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await postService.getAll();
      setPosts(result);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const updatedPost = await postService.toggleLike(postId);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
    } catch (err) {
      toast.error('Failed to update like');
    }
  };

  const handleSave = async (postId) => {
    try {
      const updatedPost = await postService.toggleSave(postId);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
      toast.success(updatedPost.isSaved ? 'Post saved' : 'Post removed from saved');
    } catch (err) {
      toast.error('Failed to save post');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <ErrorState 
          message={error}
          onRetry={loadPosts}
        />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <EmptyState 
          title="No posts yet"
          description="Follow some users or create your first post to see content here"
          actionLabel="Create Post"
          onAction={() => navigate('/create')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <PostCard 
              post={post}
              onLike={() => handleLike(post.id)}
              onSave={() => handleSave(post.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;