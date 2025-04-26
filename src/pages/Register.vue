<script lang="ts">
  import { toTypedSchema } from "@vee-validate/yup";
  import { Wifi } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  import { register } from "@/api/auth";
  import Button from "@/components/ui/button/Button.vue";
  import FormControl from "@/components/ui/form/FormControl.vue";
  import FormErrorMessage from "@/components/ui/form/FormErrorMessage.vue";
  import FormField from "@/components/ui/form/FormField.vue";
  import Input from "@/components/ui/input/Input.vue";
  import Label from "@/components/ui/label/Label.vue";
  import { useToast } from "@/composables/useToast";
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
  const { handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const { toast } = useToast();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await register(values);
    } catch (e) {
      if (e instanceof ValidationError) {
        const error = e as ValidationError<RegistrationValidationErrors>;
        setErrors(error.errors);
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
    <h1 class="text-center text-2xl font-bold">Join the community 😄</h1>

    <FormField
      v-slot="{ componentField }"
      name="name"
      required
      class="flex flex-col gap-y-1"
    >
      <Label label="Name" />
      <FormControl :as="Input" v-bind="componentField" autocomplete="name" />
      <FormErrorMessage />
    </FormField>

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
        autocomplete="new-password"
      />
      <FormErrorMessage />
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="password_confirmation"
      required
      class="flex flex-col gap-y-1"
    >
      <Label label="Confirm password" />
      <FormControl
        :as="Input"
        v-bind="componentField"
        type="password"
        autocomplete="new-password"
      />
      <FormErrorMessage />
    </FormField>

    <div class="flex flex-col gap-y-2">
      <Button>Sign up</Button>

      <Button to="/login" variant="outline">
        Already have an account ? Sign In
      </Button>
    </div>
  </form>
</template>
