import posts from '../mockData/posts.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PostService {
  constructor() {
    this.posts = [...posts];
  }

  async getAll() {
    await delay(400);
    return this.posts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(post => ({ ...post }));
  }

  async getById(id) {
    await delay(200);
    const post = this.posts.find(p => p.id === id);
    if (!post) throw new Error('Post not found');
    return { ...post };
  }

  async getByUserId(userId) {
    await delay(300);
    return this.posts
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(post => ({ ...post }));
  }

  async getSaved() {
    await delay(300);
    return this.posts
      .filter(post => post.isSaved)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(post => ({ ...post }));
  }

  async toggleLike(postId) {
    await delay(200);
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) throw new Error('Post not found');

    const post = this.posts[postIndex];
    const wasLiked = post.isLiked || false;
    
    this.posts[postIndex] = {
      ...post,
      isLiked: !wasLiked,
      likes: (post.likes || 0) + (wasLiked ? -1 : 1)
    };

    return { ...this.posts[postIndex] };
  }

  async toggleSave(postId) {
    await delay(200);
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) throw new Error('Post not found');

    const post = this.posts[postIndex];
    
    this.posts[postIndex] = {
      ...post,
      isSaved: !post.isSaved
    };

    return { ...this.posts[postIndex] };
  }

  async create(postData) {
    await delay(500);
    const newPost = {
      id: `post_${Date.now()}`,
      userId: 'user1', // Current user
      imageUrl: postData.imageUrl || null,
      caption: postData.caption || '',
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date().toISOString(),
      user: {
        id: 'user1',
        username: 'you',
        displayName: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      ...postData
    };
    
    this.posts.unshift(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await delay(400);
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error('Post not found');

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...postData
    };

    return { ...this.posts[postIndex] };
  }

  async delete(id) {
    await delay(300);
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error('Post not found');

    this.posts.splice(postIndex, 1);
    return true;
  }
}

export default new PostService();