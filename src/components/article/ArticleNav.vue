<script setup lang="ts">
  import { useId } from "vue";

  import Button from "../ui/button/Button.vue";

  const navAccName = useId();
</script>

<template>
  <nav :aria-labelledby="navAccName" class="flex gap-x-2">
    <Button variant="outline" size="medium" to="/">Discover</Button>

    <Button variant="outline" size="medium" to="/following">Following</Button>
    <span :id="navAccName" hidden>Home content navigation</span>
  </nav>
</template>
