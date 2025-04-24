<script lang="ts">
  import { type InjectionKey, provide, useId } from "vue";

  interface Props {
    name: string;
    required?: boolean;
  }

  export interface FormFieldCtx {
    inputId: string;
    errorMsgId: string;
    name: string;
    required: boolean;
  }

  export const FormFieldCtxKey = Symbol() as InjectionKey<FormFieldCtx>;
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<Props>(), {
    required: false,
  });

  const inputId = useId();

  const errorMsgId = useId();

  provide(FormFieldCtxKey, {
    inputId,
    errorMsgId,
    name: props.name,
    required: props.required,
  });
</script>

<template>
  <slot />
</template>
