import axios from 'axios';

import RW from '../lib/rw';

const githubURL = 'https://api.github.com/users/';

export default {
  name: 'detail',
  props: ['username'],
  data() {
    return {
      userDetailCache: {},
      repos: [],
      page: 1,
      isLoading: false,
      hasError: false,
      hasMore: true,
    };
  },
  created() {
    if (this.username) {
      this.$store.commit('setUser', {
        login: this.username,
      });
    }
  },
  computed: {
    user() {
      this.show(this.username);
      return this.$store.state.user;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.username) {
      next((vm) => {
        vm.reset();
        vm.show(to.params.username).then(() => {
          next();
        });
      });
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.username) {
      this.reset();
      this.show(to.params.username).then(() => {
        next();
      });
    } else {
      next();
    }
  },
  methods: {
    reset() {
      this.page = 1;
      this.hasMore = true;
      this.repos = [];
    },
    handleScroll() {
      const $el = window;
      const isBottomPage = $el.innerHeight + $el.scrollY >= document.body.scrollHeight;
      if (this.page > 1 && isBottomPage && this.hasMore) {
        this.show(this.username);
      }
    },
    show(username) {
      if (username) {
        // Load from cache
        const cache = this.userDetailCache[username];
        if (cache && this.page === 1) {
          this.repos = cache.repos;
          this.page = cache.page;
          this.hasMore = cache.hasMore;
          return Promise.resolve(this.userDetailCache[username].repos);
        }

        // Ajax to GitHub
        let url = githubURL + username + '/repos';
        if (this.page > 1) {
          url += `?page=${this.page}`;
        }

        this.isLoading = true;
        this.hasError = false;
        return axios({
          method: 'get',
          url,
        }).then((res) => {
          this.isLoading = false;
          const data = res.data;

          if (this.page > 1) {
            this.repos = this.repos.concat(data);
          } else {
            this.repos = data;
          }

          if (data.length < 30) {
            this.hasMore = false;
          }

          this.page += 1;

          // Handle cache
          if (!this.userDetailCache[username]) {
            this.userDetailCache[username] = {};
          }
          const userDetailCache = this.userDetailCache[username];
          userDetailCache.repos = this.repos;
          userDetailCache.page = this.page;
          userDetailCache.hasMore = this.hasMore;

          return data;
        }).catch((err) => {
          this.isLoading = false;
          this.hasError = true;

          if (err.response && err.response.status === 403) {
            RW.Notify.showError('Github request limit has been reached. Please try again later');
          } else {
            RW.Notify.showError('Unable to retrieve Github data');
          }
        });
      }
      return Promise.reject();
    },
    openLink(link) {
      window.open(link, '_blank');
    },
    close() {
      this.$router.push({
        name: 'Search',
      });
    },
  },
};
