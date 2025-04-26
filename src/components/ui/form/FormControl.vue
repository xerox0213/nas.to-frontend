<script setup lang="ts">
  import { type Component, computed, inject } from "vue";

  import { type FormFieldCtx, FormFieldCtxKey } from "./FormField.vue";

  const props = defineProps<{
    as: string | Component;
  }>();

  const { inputId, required, errorMsgId, invalid } = inject(
    FormFieldCtxKey,
  ) as FormFieldCtx;

  const a11y = computed(() => {
    return {
      id: inputId,
      "aria-required": required.value,
      "aria-describedby": errorMsgId,
      "aria-invalid": invalid.value,
    };
  });
</script>

<template>
  <component :is="props.as" v-bind="a11y"></component>
</template>
