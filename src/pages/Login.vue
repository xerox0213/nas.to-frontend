<script lang="ts">
  import { toTypedSchema } from "@vee-validate/yup";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  import Button from "@/components/atoms/button/Button.vue";
  import ErrorMessage from "@/components/atoms/error-message/ErrorMessage.vue";
  import Input from "@/components/atoms/input/Input.vue";
  import Label from "@/components/atoms/label/Label.vue";

  const validationSchema = toTypedSchema(
    yup.object({
      email: yup
        .string()
        .required("The email field is required")
        .email("Invalid email"),
      password: yup.string().required("The password field is required"),
    }),
  );
</script>

<script setup lang="ts">
  const { errors, defineField, handleSubmit } = useForm({ validationSchema });

  const [email, emailProps] = defineField("email");

  const [password, passwordProps] = defineField("password");

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });
</script>

<template>
  <form
    class="border-global-border m-auto mt-7 max-w-[450px] space-y-3 rounded-lg border p-5"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-center text-2xl font-bold">Welcome back 😄</h1>

    <div class="flex flex-col gap-y-1">
      <Label for="email" label="Email" />
      <Input id="email" v-model="email" type="email" v-bind="emailProps" />
      <ErrorMessage :error="errors.email" />
    </div>

    <div class="flex flex-col gap-y-1">
      <Label for="password" label="Password" />
      <Input
        id="password"
        v-model="password"
        type="password"
        v-bind="passwordProps"
      />
      <ErrorMessage :error="errors.password" />
    </div>

    <div class="flex flex-col gap-y-2">
      <Button>Sign in</Button>

      <Button to="/register" variant="outline">
        No account yet ? Sign up
      </Button>
    </div>
  </form>
</template>
