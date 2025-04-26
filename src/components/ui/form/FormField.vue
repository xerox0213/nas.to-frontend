<script lang="ts">
  import { Field, useFieldError } from "vee-validate";
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
    invalid: ComputedRef<boolean>;
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

  const errorMsg = useFieldError(props.name);

  const invalid = computed(() => errorMsg.value != "");

  provide(FormFieldCtxKey, {
    inputId,
    errorMsgId,
    name,
    required,
    invalid,
  });
</script>

<template>
  <div>
    <Field v-slot="slotProps" :name>
      <slot v-bind="slotProps" />
    </Field>
  </div>
</template>
