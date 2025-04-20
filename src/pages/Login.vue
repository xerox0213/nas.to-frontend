<script lang="ts">
  import { toTypedSchema } from "@vee-validate/yup";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  import { login } from "@/api/auth";
  import Button from "@/components/atoms/button/Button.vue";
  import ErrorMessage from "@/components/atoms/error-message/ErrorMessage.vue";
  import Input from "@/components/atoms/input/Input.vue";
  import Label from "@/components/atoms/label/Label.vue";
  import { UnauthorizedError, ValidationError } from "@/errors";
  import type { ValidationErrors } from "@/types";

  const loginSchema = yup.object({
    email: yup
      .string()
      .required("The email field is required")
      .email("Invalid email"),
    password: yup.string().required("The password field is required"),
  });

  const validationSchema = toTypedSchema(loginSchema);

  export type LoginCredentials = yup.InferType<typeof loginSchema>;

  type LoginValidationErrors = ValidationErrors<LoginCredentials>;
</script>

<script setup lang="ts">
  const { errors, defineField, handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const [email, emailProps] = defineField("email");

  const [password, passwordProps] = defineField("password");

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values);
    } catch (e) {
      if (e instanceof ValidationError) {
        const error = e as ValidationError<LoginValidationErrors>;
        setErrors(error.errors);
      } else if (e instanceof UnauthorizedError) {
        console.log(e.message);
      } else {
        console.log(e);
      }
    }
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
      <Input
        id="email"
        v-model="email"
        type="email"
        v-bind="emailProps"
        aria-required="true"
        aria-describedby="error-email"
        :aria-invalid="errors.email != undefined"
      />
      <ErrorMessage
        id="error-email"
        :error="errors.email"
        aria-live="assertive"
      />
    </div>

    <div class="flex flex-col gap-y-1">
      <Label for="password" label="Password" />
      <Input
        id="password"
        v-model="password"
        type="password"
        v-bind="passwordProps"
        aria-required="true"
        aria-describedby="error-password"
        :aria-invalid="errors.password != undefined"
      />
      <ErrorMessage
        id="error-password"
        :error="errors.password"
        aria-live="assertive"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <Button>Sign in</Button>

      <Button to="/register" variant="outline">
        No account yet ? Sign up
      </Button>
    </div>
  </form>
</template>
