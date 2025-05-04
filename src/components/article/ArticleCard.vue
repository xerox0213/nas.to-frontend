<script lang="ts">
  import { tv } from "tailwind-variants";

  export const articleCardTv = tv({
    slots: {
      root: "border-global-border overflow-hidden rounded-lg border",
      body: "bg-background space-y-2 px-4 py-5",
      metadata: "flex flex-col gap-y-1",
      header: "flex gap-x-2",
    },
  });
</script>

<script setup lang="ts">
  const { root, body, header, metadata } = articleCardTv();
</script>

<template>
  <div :class="root()">
    <slot name="cover"></slot>

    <div :class="body()">
      <div :class="header()">
        <slot name="avatar"></slot>

        <div :class="metadata()">
          <slot name="metadata"></slot>
        </div>
      </div>

      <slot name="content"></slot>
    </div>
  </div>
</template>
