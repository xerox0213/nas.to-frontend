<script lang="ts">
  import { toTypedSchema } from "@vee-validate/yup";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  import { register } from "@/api/auth";
  import Button from "@/components/ui/button/Button.vue";
  import ErrorMessage from "@/components/ui/error-message/ErrorMessage.vue";
  import Input from "@/components/ui/input/Input.vue";
  import Label from "@/components/ui/label/Label.vue";
  import { ValidationError } from "@/errors";
  import type { ValidationErrors } from "@/types";

  const registrationSchema = yup.object({
    name: yup.string().required("The name field is required"),
    email: yup
      .string()
      .required("The email field is required")
      .email("Invalid email"),
    password: yup
      .string()
      .required("The password field is required")
      .min(3, "The password must contains 3 characters"),
    password_confirmation: yup
      .string()
      .required("The confirm password field is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const validationSchema = toTypedSchema(registrationSchema);

  export type RegistrationCredentials = yup.InferType<
    typeof registrationSchema
  >;

  type RegistrationValidationErrors = ValidationErrors<RegistrationCredentials>;
</script>

<script setup lang="ts">
  const { errors, defineField, handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const [name, nameProps] = defineField("name");

  const [email, emailProps] = defineField("email");

  const [password, passwordProps] = defineField("password");

  const [confirm, confirmProps] = defineField("password_confirmation");

  const onSubmit = handleSubmit(async (values) => {
    try {
      await register(values);
    } catch (e) {
      if (e instanceof ValidationError) {
        const error = e as ValidationError<RegistrationValidationErrors>;
        setErrors(error.errors);
      } else {
        console.log("Type Error");
      }
    }
  });
</script>

<template>
  <form
    class="border-global-border m-auto mt-7 max-w-[450px] space-y-3 rounded-lg border p-5"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-center text-2xl font-bold">Join the community 😄</h1>

    <div class="flex flex-col gap-y-1">
      <Label for="name" label="Name" required />
      <Input
        id="name"
        v-model="name"
        v-bind="nameProps"
        aria-required="true"
        :aria-invalid="errors.name != undefined"
        aria-describedby="error-name"
      />
      <ErrorMessage
        id="error-name"
        :error="errors.name"
        aria-live="assertive"
      />
    </div>

    <div class="flex flex-col gap-y-1">
      <Label for="email" label="Email" required />
      <Input
        id="email"
        v-model="email"
        type="email"
        v-bind="emailProps"
        aria-required="true"
        :aria-invalid="errors.email != undefined"
        aria-describedby="error-email"
      />
      <ErrorMessage
        id="error-email"
        :error="errors.email"
        aria-live="assertive"
      />
    </div>

    <div class="flex flex-col gap-y-1">
      <Label for="password" label="Password" required />
      <Input
        id="password"
        v-model="password"
        type="password"
        v-bind="passwordProps"
        aria-required="true"
        :aria-invalid="errors.password != undefined"
        aria-describedby="error-password"
      />
      <ErrorMessage
        id="error-password"
        :error="errors.password"
        aria-live="assertive"
      />
    </div>

    <div class="flex flex-col gap-y-1">
      <Label for="password-confirmation" label="Confirm password" required />
      <Input
        id="password-confirmation"
        v-model="confirm"
        type="password"
        v-bind="confirmProps"
        aria-required="true"
        :aria-invalid="errors.password_confirmation != undefined"
        aria-describedby="error-password-confirmation"
      />
      <ErrorMessage
        id="error-password-confirmation"
        :error="errors.password_confirmation"
        aria-live="assertive"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <Button>Sign up</Button>

      <Button to="/login" variant="outline">
        Already have an account ? Sign In
      </Button>
    </div>
  </form>
</template>
