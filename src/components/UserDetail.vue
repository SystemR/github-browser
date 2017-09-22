<template>
  <div class="detail" v-if='username'>
    <div class='close-button' v-on:click='close()'>&times;</div>
    <div class='repos-count' v-if='repos.length'>{{ repos.length }}</div>
    <h1>{{username}} <i class='loading' v-if='isLoading'></i></h1>
    <div v-if='hasError'>Unable to retrieve repo(s) for this user</div>
    <div class='cleared'>
      <div v-for="(repo, index) in repos" class='repo' v-on:click='openLink(repo.html_url)'>
        <div class='title'><a v-bind:href='repo.html_url'>{{repo.name}}</a></div>
        <div class='lang ellipsis'>{{repo.language}}</div>
        <div class='watchers' title='Watchers'>
          <span class='count'>{{repo.watchers}} | <i class='fa fa-eye'></i></span>
        </div>
      </div>
      <div class='cleared load-more'>
        <button class='btn btn-primary btn-block btn-lg' v-on:click='show(username)' v-if='hasMore'>Load More...</button>
      </div>
    </div>
  </div>
</template>

<script src='./UserDetailController.js'></script>
<style scoped lang='scss' src='./UserDetail.scss'></style>
