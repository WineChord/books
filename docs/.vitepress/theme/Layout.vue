<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import FocusToggle from "./components/FocusToggle.vue";
import ReadingProgress from "./components/ReadingProgress.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <ReadingProgress />
  <Layout>
    <template #nav-bar-content-after>
      <FocusToggle />
    </template>
  </Layout>
</template>
