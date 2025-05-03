<script setup lang="ts">
  import Header from "@/components/structure/Header.vue";
  import Main from "@/components/structure/Main.vue";
</script>

<template>
  <Header />
  <Main>
    <slot></slot>
  </Main>
</template>
