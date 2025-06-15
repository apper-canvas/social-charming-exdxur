import Home from '@/components/pages/Home';
import Search from '@/components/pages/Search';
import Profile from '@/components/pages/Profile';
import CreatePost from '@/components/pages/CreatePost';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  search: {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'Search',
    component: Search
  },
  create: {
    id: 'create',
    label: 'Create',
    path: '/create',
    icon: 'Plus',
    component: CreatePost
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile/:username?',
    icon: 'User',
    component: Profile
  }
};

export const routeArray = Object.values(routes);
export default routes;