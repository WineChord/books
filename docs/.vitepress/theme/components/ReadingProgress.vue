<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const progress = ref(0);

function updateProgress() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  progress.value = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
}

onMounted(() => {
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateProgress);
  window.removeEventListener("resize", updateProgress);
});
</script>

<template>
  <div class="book-progress" aria-hidden="true">
    <div class="book-progress__bar" :style="{ width: `${progress}%` }" />
  </div>
</template>
