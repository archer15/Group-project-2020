<template>
  <v-card class="news-card">
    <a :href="url" target="_blank">
      <img v-if="img" :src="img" class="news-card-img" />
    </a>
    <v-card-subtitle class="published" :class="img ? 'pt-0': 'pt-3'">
      {{ publishedAt }}
    </v-card-subtitle>
    <a :href="url" target="_blank" class="news-card-title-link">
      <v-card-title class="news-card-title" v-text="title"></v-card-title>
    </a>

    <v-card-actions v-if="author">
      <v-card-subtitle class="author">
        {{ author }}
      </v-card-subtitle>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'NewsCard',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    title () {
      return this.article?.name
    },
    url () {
      return this.article?.url
    },
    img () {
      return this.article?.image?.contentUrl
    },
    publishedAt () {
      const time = this.article?.datePublished
      return time ? DateTime.fromISO(time).toFormat('ff') : undefined
    },
    author () {
      return this.article?.provider?.[0]?.name
    },
    authorImg () {
      return this.article?.provider?.[0]?.image?.thumbnail?.contentUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.news-card {
  .news-card-title-link {
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline black;
    }
  }

  .news-card-title {
    font-size: 1em;
    line-height: 1.2em;
    word-break: keep-all;
    padding-top: 0px;
  }

  .published {
    font-size: 0.8em;
    padding-bottom: 0.5rem;
  }

  .news-card-img {
    height: 240px;
    width: 100%;
    object-fit: cover;
  }

  .author {
    margin-left: 0.5rem;
    padding: 0;
    font-size: 0.7em;
  }
}
</style>