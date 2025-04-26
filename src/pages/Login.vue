<script lang="ts">
  import { toTypedSchema } from "@vee-validate/yup";
  import { Wifi } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  import { login } from "@/api/auth";
  import Button from "@/components/ui/button/Button.vue";
  import FormControl from "@/components/ui/form/FormControl.vue";
  import FormErrorMessage from "@/components/ui/form/FormErrorMessage.vue";
  import FormField from "@/components/ui/form/FormField.vue";
  import Input from "@/components/ui/input/Input.vue";
  import Label from "@/components/ui/label/Label.vue";
  import { useToast } from "@/composables/useToast";
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
  const { handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const { toast } = useToast();

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
        toast({
          icon: Wifi,
          title: "Uh Oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      }
    }
  });
</script>

<template>
  <form
    novalidate
    class="border-global-border m-auto mt-7 max-w-[450px] space-y-3 rounded-lg border p-5"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-center text-2xl font-bold">Welcome back 😄</h1>

    <FormField
      v-slot="{ componentField }"
      name="email"
      required
      class="flex flex-col gap-y-1"
    >
      <Label label="Email" />
      <FormControl
        :as="Input"
        v-bind="componentField"
        type="email"
        autocomplete="email"
        inputmode="email"
      />
      <FormErrorMessage />
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="password"
      required
      class="flex flex-col gap-y-1"
    >
      <Label label="Password" />
      <FormControl
        :as="Input"
        v-bind="componentField"
        type="password"
        autocomplete="current-password"
      />
      <FormErrorMessage />
    </FormField>

    <div class="flex flex-col gap-y-2">
      <Button>Sign in</Button>

      <Button to="/register" variant="outline">
        No account yet ? Sign up
      </Button>
    </div>
  </form>
</template>
