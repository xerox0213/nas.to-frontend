<script lang="ts">
  import {
    computed,
    type ComputedRef,
    type InjectionKey,
    provide,
    useId,
  } from "vue";

  interface Props {
    name: string;
    required?: boolean;
  }

  export interface FormFieldCtx {
    inputId: string;
    errorMsgId: string;
    name: ComputedRef<string>;
    required: ComputedRef<boolean>;
  }

  export const FormFieldCtxKey = Symbol() as InjectionKey<FormFieldCtx>;
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<Props>(), {
    required: false,
  });

  const name = computed(() => props.name);

  const required = computed(() => props.required);

  const inputId = useId();

  const errorMsgId = useId();

  provide(FormFieldCtxKey, {
    inputId,
    errorMsgId,
    name,
    required,
  });
</script>

<template>
  <div>
    <slot />
  </div>
</template>
