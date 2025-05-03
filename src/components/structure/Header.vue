<script setup lang="ts">
  import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <header class="border-global-border border-b">
    <div class="container flex items-center justify-between py-2">
      <RouterLink
        to="/"
        aria-label="home"
        class="bg-primary text-primary-foreground rounded px-2 py-1 text-lg font-bold"
      >
        NAS
      </RouterLink>
      <nav>
        <ul>
          <li>
            <Button :to="{ name: 'articles.store' }" variant="outline">
              Create Article
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
