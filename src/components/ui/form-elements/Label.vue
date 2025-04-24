<script lang="ts">
  import { inject } from "vue";

  import { type FormFieldCtx, FormFieldCtxKey } from "./FormField.vue";

  interface Props {
    label?: string;
  }
</script>

<script setup lang="ts">
  const { inputId, required } = inject(FormFieldCtxKey) as FormFieldCtx;
  defineProps<Props>();
</script>

<template>
  <label :for="inputId" class="text-sm font-medium">
    <slot>{{ label }}</slot>
    <span v-if="required"> *</span>
  </label>
</template>
