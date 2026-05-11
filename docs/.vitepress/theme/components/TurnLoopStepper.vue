<script setup lang="ts">
const steps = [
  {
    name: "Prepare",
    detail:
      "Resolve configuration, history, instructions, skills, plugins, and app mentions.",
  },
  {
    name: "Sample",
    detail:
      "Build a model request from the recorded conversation and stream response items back.",
  },
  {
    name: "Act",
    detail:
      "Convert model tool calls into routed, cancellable tool executions.",
  },
  {
    name: "Observe",
    detail:
      "Record tool outputs as structured response items and emit client-visible events.",
  },
  {
    name: "Continue or Stop",
    detail:
      "Run compaction or follow-up sampling when needed; otherwise complete the turn.",
  },
];
</script>

<template>
  <ol class="stepper">
    <li v-for="step in steps" :key="step.name">
      <span>{{ step.name }}</span>
      <p>{{ step.detail }}</p>
    </li>
  </ol>
</template>
