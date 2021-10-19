<template>
  <v-container class="news-container">
    <div class="search-container">
      <v-text-field
        v-model="search"
        label="Search Headlines"
        append-icon="mdi-magnify"
        @click:append="handleSearch"
      >
      </v-text-field>
      <v-chip
        v-if="q"
        close
        class="mb-3"
        @click:close="intialNews"
      >
        {{ q }}
      </v-chip>
    </div>

    <h1 v-if="!articles.length && !loading" class="text-center my-5">We couldn't find anything!</h1>
    <stack
      v-if="articles.length"
      :column-min-width="240"
      :gutter-width="15"
      :gutter-height="15"
      monitor-images-loaded
    >
      <stack-item v-for="article in articles" :key="article.title">
        <NewsCard :article="article" />
      </stack-item>
    </stack>
    <v-card v-intersect="infiniteScrolling"></v-card>
    <h1 v-if="reachedMax" class="text-center my-5">That's it for now!</h1>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Stack, StackItem } from 'vue-stack-grid'
import NewsCard from './NewsCard'

export default {
  name: 'News',
  components: {
    Stack,
    StackItem,
    NewsCard
  },
  data: () => ({
    loading: false,
    search: '',
    q: '',
    articles: [],
    page: 1,
    reachedMax: false,
    endpoint: undefined
  }),
  computed: {
    ...mapGetters({
      pageSize: 'news/pageSize'
    })
  },
  mounted () {
    this.intialNews()
  },
  methods: {
    ...mapActions({
      newsCategory: 'news/newsCategory',
      searchNews: 'news/search'
    }),
    intialNews () {
      this.q = ''
      this.page = 1
      this.endpoint = this.newsCategory
      this.getNews()
        .then(res => {
          this.articles = res.value
          if (res.value.length < this.pageSize) {
            this.reachedMax = true
          }
        })
    },
    async getNews (page = 1) {
      if (this.loading) return
      this.loading = true
      return await this.endpoint({
        offset: this.offset(page),
        ...(this.q && { q: this. q })
      })
      .finally(() => this.loading = false)
    },
    formatTime (time) {
      return DateTime.fromISO(time).toFormat('ff')
    },
    infiniteScrolling (entries, observer, isIntersecting) {
      if (!isIntersecting || this.reachedMax) return
      this.getNews(this.page + 1)
        .then(res => {
          this.articles = this.articles.concat(res.value)
          this.page += 1
          if (res.value.length < this.pageSize) {
            this.reachedMax = true
          }
        })
    },
    handleSearch () {
      this.endpoint = this.searchNews
      this.page = 1
      this.q = this.search
      this.getNews()
        .then(res => {
          this.articles = res.value
          this.search = ''
          if (res.value.length < this.pageSize) {
            this.reachedMax = true
          }
        })
    },
    offset (page) {
      return this.pageSize * (page - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.news-container {
  background-color: white;
}
</style>