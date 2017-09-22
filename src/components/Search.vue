<template>
  <div class='search'>
    <h1>Results for: {{ keyword }}</h1>
    <div v-if='hasError'>Unable to retrieve search results from GitHub</div>
    <div v-for="(user, index) in items" class='user' v-bind:class='{ right: (index + 1) % 4 === 0, active: user && userDetail && user.login === userDetail.login }' v-on:click='show(user)'>
      <div class='avatar' v-bind:style="{ backgroundImage: 'url(' + user.avatar_url + ')' }"></div>
      <div class='info'>
        <div class='avatar' v-bind:style="{ backgroundImage: 'url(' + user.avatar_url + ')' }"></div>
        <div class='detail'>
          <div class='title ellipsis'>{{user.login}}</div>
          <div class='content ellipsis'>Score: {{user.score ? user.score.toFixed(2) : 0}}</div>
          <div class='content'><a v-bind:href='user.html_url' target='_blank'>Site &raquo;</a></div>
        </div>
      </div>
    </div>
    <div v-if='results && items.length === 0'>Please try a different keyword</div>
    <div class='cleared load-more'>
      <button class='btn btn-primary btn-block btn-lg' v-on:click='search(keyword)' v-if='results && items.length < results.total_count'>Load More...</button>
    </div>
  </div>
</template>

<script src='./SearchController.js'></script>
<style scoped lang='scss' src='./Search.scss'></style>
