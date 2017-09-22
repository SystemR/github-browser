<template>
  <div id="app">
    <section class='search-box'>
      <div class='pull-right' v-if='isLoading'>
         <i class='loading'></i>
      </div>
      <h1>Search GitHub Username</h1>
      <div class='input-group'>
        <input type='text' class='form-input input-lg' autocomplete="off" v-model='keyword' @keyup.enter='search' placeholder='Enter github username...'>
        <button class="btn btn-primary input-group-btn btn-lg" v-on:click='search'>Search</button>
      </div>
    </section>
    <router-view class='search-results' name='searchResults'></router-view>
    <router-view class='user-detail' name='userDetail'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      keyword: '',
    };
  },
  created() {
    this.keyword = this.$route.params.keyword;
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    search() {
      this.$router.push({
        name: 'Search',
        params: {
          keyword: this.keyword,
        },
      });
    },
  },
};
</script>

<style lang='scss' src='./scss/app.scss'></style>