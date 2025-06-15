import users from '../mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserService {
  constructor() {
    this.users = [...users];
    this.currentUserId = 'user1'; // Simulated current user
  }

  async getAll() {
    await delay(300);
    return [...this.users];
  }

  async getById(id) {
    await delay(200);
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return { ...user };
  }

  async getByUsername(username) {
    await delay(200);
    const user = this.users.find(u => u.username === username);
    if (!user) throw new Error('User not found');
    return { 
      ...user, 
      isCurrentUser: user.id === this.currentUserId 
    };
  }

  async getCurrentUser() {
    await delay(200);
    const user = this.users.find(u => u.id === this.currentUserId);
    if (!user) throw new Error('Current user not found');
    return { 
      ...user, 
      isCurrentUser: true 
    };
  }

  async search(query) {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    return this.users
      .filter(user => 
        user.username.toLowerCase().includes(lowerQuery) ||
        user.displayName.toLowerCase().includes(lowerQuery)
      )
      .map(user => ({ ...user }));
  }

  async getTrending() {
    await delay(300);
    return this.users
      .sort((a, b) => (b.followersCount || 0) - (a.followersCount || 0))
      .slice(0, 8)
      .map(user => ({ ...user }));
  }

  async toggleFollow(userId) {
    await delay(300);
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');

    const user = this.users[userIndex];
    const wasFollowing = user.isFollowing || false;
    
    this.users[userIndex] = {
      ...user,
      isFollowing: !wasFollowing,
      followersCount: (user.followersCount || 0) + (wasFollowing ? -1 : 1)
    };

    return { ...this.users[userIndex] };
  }

  async create(userData) {
    await delay(400);
    const newUser = {
      id: `user_${Date.now()}`,
      username: userData.username,
      displayName: userData.displayName,
      avatar: userData.avatar || null,
      bio: userData.bio || '',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isFollowing: false,
      ...userData
    };
    
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await delay(400);
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('User not found');

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData
    };

    return { ...this.users[userIndex] };
  }

  async delete(id) {
    await delay(300);
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('User not found');

    this.users.splice(userIndex, 1);
    return true;
  }
}

export default new UserService();