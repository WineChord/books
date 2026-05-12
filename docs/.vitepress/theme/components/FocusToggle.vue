<script setup lang="ts">
import { onMounted, ref } from "vue";

const storageKey = "codex-book-focus-mode";
const enabled = ref(false);

function apply(next: boolean) {
  enabled.value = next;
  document.documentElement.classList.toggle("book-focus", next);
  localStorage.setItem(storageKey, next ? "1" : "0");
}

function toggle() {
  apply(!enabled.value);
}

onMounted(() => {
  apply(localStorage.getItem(storageKey) === "1");
});
</script>

<template>
  <button
    class="book-focus-toggle"
    type="button"
    :aria-pressed="String(enabled)"
    aria-label="Toggle focus reading mode"
    title="Focus mode"
    @click="toggle"
  >
    <svg
      v-if="!enabled"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8V4h4" />
      <path d="M4 4l5 5" />
      <path d="M20 8V4h-4" />
      <path d="M20 4l-5 5" />
      <path d="M4 16v4h4" />
      <path d="M4 20l5-5" />
      <path d="M20 16v4h-4" />
      <path d="M20 20l-5-5" />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M9 4v5H4" />
      <path d="M15 4v5h5" />
      <path d="M9 20v-5H4" />
      <path d="M15 20v-5h5" />
    </svg>
  </button>
</template>
