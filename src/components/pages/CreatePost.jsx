import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { postService } from '@/services';
import ApperIcon from '@/components/ApperIcon';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage && !caption.trim()) {
      toast.error('Please add an image or caption');
      return;
    }

    setLoading(true);
    try {
      const postData = {
        caption: caption.trim(),
        imageUrl: imagePreview // In a real app, you'd upload to a server
      };
      
      await postService.create(postData);
      toast.success('Post created successfully!');
      navigate('/home');
    } catch (err) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ApperIcon name="ArrowLeft" size={20} />
            </motion.button>
            <h1 className="text-xl font-display font-semibold">Create Post</h1>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={loading || (!selectedImage && !caption.trim())}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              loading || (!selectedImage && !caption.trim())
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'gradient-button text-white hover:shadow-lg'
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting...
              </div>
            ) : (
              'Share'
            )}
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload Area */}
          <div className="mb-6">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ApperIcon name="X" size={16} />
                </motion.button>
              </div>
            ) : (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <ApperIcon name="Camera" size={32} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Click to add photo</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </motion.div>
              </label>
            )}
          </div>

          {/* Caption Input */}
          <div className="mb-6">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              maxLength={2200}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-400">
                Share your thoughts...
              </p>
              <span className="text-sm text-gray-400">
                {caption.length}/2200
              </span>
            </div>
          </div>

          {/* Post Options */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Post Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700">Hide like and view counts</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700">Turn off commenting</span>
              </label>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;