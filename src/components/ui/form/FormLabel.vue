<script lang="ts">
  import { inject } from "vue";

  import { type FormFieldCtx, FormFieldCtxKey } from "../form/FormField.vue";
  import Label from "../label/Label.vue";
</script>

<script setup lang="ts">
  const { inputId, required } = inject(FormFieldCtxKey) as FormFieldCtx;
</script>

<template>
  <Label :for="inputId" :required>
    <slot></slot>
  </Label>
</template>
