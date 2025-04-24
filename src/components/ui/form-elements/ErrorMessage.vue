<script setup lang="ts">
  import { useFieldError } from "vee-validate";
  import { inject } from "vue";

  import { type FormFieldCtx, FormFieldCtxKey } from "./FormField.vue";

  const { errorMsgId, name } = inject(FormFieldCtxKey) as FormFieldCtx;

  const error = useFieldError(name);
</script>

<template>
  <span
    v-if="error"
    :id="errorMsgId"
    class="text-destructive text-sm"
    aria-live="assertive"
  >
    {{ error }}
  </span>
</template>
