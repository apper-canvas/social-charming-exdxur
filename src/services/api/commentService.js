import comments from '../mockData/comments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CommentService {
  constructor() {
    this.comments = [...comments];
  }

  async getAll() {
    await delay(300);
    return [...this.comments];
  }

  async getById(id) {
    await delay(200);
    const comment = this.comments.find(c => c.id === id);
    if (!comment) throw new Error('Comment not found');
    return { ...comment };
  }

  async getByPostId(postId) {
    await delay(300);
    return this.comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(comment => ({ ...comment }));
  }

  async create(commentData) {
    await delay(400);
    const newComment = {
      id: `comment_${Date.now()}`,
      postId: commentData.postId,
      userId: 'user1', // Current user
      text: commentData.text,
      createdAt: new Date().toISOString(),
      user: {
        id: 'user1',
        username: 'you',
        displayName: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      ...commentData
    };
    
    this.comments.push(newComment);
    return { ...newComment };
  }

  async update(id, commentData) {
    await delay(400);
    const commentIndex = this.comments.findIndex(c => c.id === id);
    if (commentIndex === -1) throw new Error('Comment not found');

    this.comments[commentIndex] = {
      ...this.comments[commentIndex],
      ...commentData
    };

    return { ...this.comments[commentIndex] };
  }

  async delete(id) {
    await delay(300);
    const commentIndex = this.comments.findIndex(c => c.id === id);
    if (commentIndex === -1) throw new Error('Comment not found');

    this.comments.splice(commentIndex, 1);
    return true;
  }
}

export default new CommentService();