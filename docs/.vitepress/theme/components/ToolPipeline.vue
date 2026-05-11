<script setup lang="ts">
const stages = [
  ["Register", "A handler advertises its name, spec, mutability, and hooks."],
  ["Route", "The router matches a model tool call to the correct handler."],
  [
    "Gate",
    "Approval policy, permission hooks, and sandbox preferences are resolved.",
  ],
  [
    "Run",
    "The runtime executes the side effect under cancellation and sandbox rules.",
  ],
  [
    "Report",
    "Outputs become protocol items, UI events, metrics, and optional diffs.",
  ],
];
</script>

<template>
  <div class="tool-pipeline">
    <div v-for="[stage, detail] in stages" :key="stage">
      <strong>{{ stage }}</strong>
      <p>{{ detail }}</p>
    </div>
  </div>
</template>
