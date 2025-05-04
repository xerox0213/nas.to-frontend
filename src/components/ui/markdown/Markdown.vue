<script lang="ts">
  import { marked } from "marked";

  interface Props {
    source: string;
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();

  const html = marked(props.source);
</script>

<template>
  <div v-html="html" />
</template>
