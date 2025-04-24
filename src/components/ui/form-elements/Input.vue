<script lang="ts">
  import { tv } from "tailwind-variants";
  import { useFieldError } from "vee-validate";
  import { computed, type HTMLAttributes, inject } from "vue";

  import { type FormFieldCtx, FormFieldCtxKey } from "./FormField.vue";

  const input = tv({
    base: "border-global-border rounded-sm border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
  });

  interface Props {
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const { errorMsgId, inputId, name, required } = inject(
    FormFieldCtxKey,
  ) as FormFieldCtx;

  const props = defineProps<Props>();

  const model = defineModel<string>();

  const error = useFieldError(name);

  const invalid = computed(() => error.value != undefined);
</script>

<template>
  <input
    :id="inputId"
    v-model="model"
    :name="name"
    :aria-describedby="errorMsgId"
    :aria-invalid="invalid"
    :aria-required="required"
    :class="input({ class: props.class })"
  />
</template>
