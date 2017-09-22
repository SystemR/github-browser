import axios from 'axios';

import RW from '../lib/rw';

const githubURL = 'https://api.github.com/search/users?q=';

const parseToQueryString = (string) => {
  let returnString = string.trim().replace(/\s\s+/g, '+');
  returnString = returnString.replace(/\s/g, '+');
  return returnString;
};

export default {
  name: 'hello',
  props: ['keyword'],
  data() {
    return {
      searchString: '',
      page: 1,
      results: null,
      hasError: false,
      onEl: false,
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    userDetail() {
      return this.$store.state.user;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  mounted() {
    this.$el.addEventListener('scroll', this.handleScroll);
    this.$el.addEventListener('mouseenter', this.preventDocumentScrolling);
    this.$el.addEventListener('mouseleave', this.allowDocumentScrolling);
  },
  destroyed() {
    this.$el.removeEventListener('scroll', this.handleScroll);
    this.$el.removeEventListener('mouseenter', this.preventDocumentScrolling);
    this.$el.removeEventListener('mouseleave', this.allowDocumentScrolling);
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.keyword) {
      next((vm) => {
        const query = parseToQueryString(to.params.keyword);
        if (query !== vm.searchString) {
          vm.reset();
          vm.searchString = query;
          vm.search(query).then(() => {
            next();
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.keyword) {
      const query = parseToQueryString(to.params.keyword);
      if (query !== this.searchString) {
        this.reset();
        this.searchString = query;
        this.search(query).then(() => {
          next();
        });
      } else {
        next();
      }
    } else {
      next();
    }
  },
  methods: {
    reset() {
      this.page = 1;
      this.$store.commit('resetItems');
      this.results = null;
    },
    preventDocumentScrolling() {
      document.body.style.overflow = 'hidden';
    },
    allowDocumentScrolling() {
      document.body.style.overflow = 'auto';
    },
    handleScroll() {
      const $el = this.$el;
      const isBottomPage = $el.scrollTop + $el.clientHeight >= $el.scrollHeight;
      const hasMore = this.results && this.items.length < this.results.total_count;
      if (isBottomPage && hasMore) {
        this.search(this.searchString);
      }

      return false;
    },
    show(user) {
      this.$store.commit('setUser', user);
      this.$router.push({
        name: 'SearchUserDetail',
        params: {
          username: user.login,
        },
      });
    },
    search(query) {
      if (query) {
        let url = githubURL + query;
        if (this.page > 1) {
          url += `&page=${this.page}`;
        }

        this.$store.commit('showLoading');
        this.hasError = false;
        return axios({
          method: 'get',
          url,
        }).then((res) => {
          this.$store.commit('hideLoading');
          this.results = res.data;
          if (this.page > 1) {
            this.$store.commit('appendItems', this.results.items);
          } else {
            this.$store.commit('setItems', this.results.items);
          }
          this.page += 1;
        }).catch((err) => {
          this.$store.commit('hideLoading');
          this.hasError = true;
          if (err.response && err.response.status === 403) {
            RW.Notify.showError('Github request limit has been reached. Please try again later');
          } else {
            RW.Notify.showError('Unable to retrieve Github data');
          }
        });
      }
      return Promise.resolve();
    },
  },
};
