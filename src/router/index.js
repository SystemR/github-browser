import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Search from '@/components/Search';
import UserDetail from '@/components/UserDetail';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    components: {
      searchResults: Hello,
      userDetail: UserDetail,
    },
    props: {
      searchResults: false,
      userDetail: false,
    },
  }, {
    path: '/search/:keyword',
    name: 'Search',
    components: {
      searchResults: Search,
      userDetail: UserDetail,
    },
    props: {
      searchResults: true,
      userDetail: false,
    },
  }, {
    path: '/search/:keyword/:username',
    name: 'SearchUserDetail',
    components: {
      searchResults: Search,
      userDetail: UserDetail,
    },
    props: {
      searchResults: true,
      userDetail: true,
    },
  }],
});
