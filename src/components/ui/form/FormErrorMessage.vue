<script setup lang="ts">
  import { ErrorMessage } from "vee-validate";
  import { inject } from "vue";

  import { type FormFieldCtx, FormFieldCtxKey } from "./FormField.vue";

  const { errorMsgId, name } = inject(FormFieldCtxKey) as FormFieldCtx;
</script>

<template>
  <ErrorMessage :id="errorMsgId" :name class="text-destructive text-sm" />
</template>
