<script lang="ts">
  import { toTypedSchema } from "@vee-validate/yup";
  import { configure, type SubmissionContext, useForm } from "vee-validate";
  import { computed, useTemplateRef } from "vue";
  import * as yup from "yup";

  import Button from "@/components/ui/button/Button.vue";
  import FormField from "@/components/ui/form/FormField.vue";
  import Input from "@/components/ui/input/Input.vue";
  import Textarea from "@/components/ui/textarea/Textarea.vue";

  import FormControl from "../ui/form/FormControl.vue";
  import FormErrorMessage from "../ui/form/FormErrorMessage.vue";
  import FormLabel from "../ui/form/FormLabel.vue";

  const SUPPORTED_IMAGE = [".jpg", ".jpeg", ".png", ".webp"];

  const ACCEPT = SUPPORTED_IMAGE.join(",");

  const MAX_IMAGE_SIZE = 2097152; // 2MB in bytes

  function validImageType(file: File) {
    const type = file.type.split("/").pop() ?? "";
    return SUPPORTED_IMAGE.includes(`.${type}`);
  }

  function validSize(file: File) {
    return file.size <= MAX_IMAGE_SIZE;
  }

  const articleSchema = yup.object({
    cover_image: yup.mixed(),
    title: yup.string().required("The article title is required."),
    content: yup.string().required("The article title is required."),
  });

  const validationSchema = toTypedSchema(articleSchema);

  export type ArticleValues = yup.InferType<typeof articleSchema>;

  export type Ctx = SubmissionContext<Partial<ArticleValues>>;

  export type Submitted = () => void;

  interface Props {
    initialValues?: Partial<ArticleValues>;
  }

  interface Emits {
    submit: [values: ArticleValues, ctx: Ctx, submitted: Submitted];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();

  const emits = defineEmits<Emits>();

  const {
    values,
    setFieldValue,
    resetField,
    setFieldError,
    handleSubmit,
    isSubmitting,
  } = useForm({
    validationSchema,
    initialValues: props.initialValues,
  });

  configure({
    validateOnBlur: false,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: false,
  });

  const fileInputComp = useTemplateRef<InstanceType<typeof Input>>("fileInput");

  const coverImageUrl = computed(() => {
    return values.cover_image ? URL.createObjectURL(values.cover_image) : "";
  });

  const onUploadCover = (e: Event) => {
    const inputFile = e.target as HTMLInputElement;
    const file = inputFile.files?.[0];

    if (file) {
      if (!validImageType(file)) {
        setFieldError(
          "cover_image",
          "Unsupported file type. Only JPG, JPEG, PNG and WEBP are allowed.",
        );
        return;
      }

      if (!validSize(file)) {
        setFieldError("cover_image", "Max allowed size is 2MB.");
        return;
      }

      setFieldValue("cover_image", file);
    }
  };

  const onRemoveCover = () => {
    resetField("cover_image");
    if (fileInputComp.value) {
      const fileInput = fileInputComp.value.$el as HTMLInputElement;
      fileInput.value = "";
    }
  };

  const onSubmit = handleSubmit((values, ctx) => {
    return new Promise((resolve) => {
      const submitted = () => resolve(null);
      emits("submit", values, ctx, submitted);
    });
  });
</script>

<template>
  <form @submit="onSubmit">
    <div class="space-y-5">
      <div
        class="flex"
        :class="{
          'flex-col gap-5 md:flex-row': coverImageUrl != undefined,
        }"
      >
        <img
          v-if="coverImageUrl"
          :src="coverImageUrl"
          class="block h-[200px] w-[350px] self-center rounded object-cover"
          alt="The cover image you have chosen."
        />
        <FormField name="cover_image" class="grow space-y-2 md:self-center">
          <Button type="button" variant="outline" class="w-full">
            <FormLabel>
              <span v-if="coverImageUrl">Modify cover image</span>
              <span v-else>Add a cover image</span>
            </FormLabel>
          </Button>
          <Button
            v-if="coverImageUrl"
            type="button"
            variant="destructive"
            class="w-full"
            @click="onRemoveCover"
          >
            Remove
          </Button>
          <FormControl
            ref="fileInput"
            :as="Input"
            type="file"
            :accept="ACCEPT"
            class="hidden"
            @input="onUploadCover"
          />
          <FormErrorMessage />
        </FormField>
      </div>

      <FormField
        v-slot="{ componentField }"
        name="title"
        required
        class="flex flex-col gap-y-1.5"
      >
        <FormLabel class="text-lg">Your article title</FormLabel>
        <FormControl
          :as="Input"
          v-bind="componentField"
          size="medium"
          placeholder="New post title here"
        />
        <FormErrorMessage />
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="content"
        required
        class="flex flex-col gap-y-1.5"
      >
        <FormLabel class="text-lg">
          Write your article content using Markdown
        </FormLabel>
        <FormControl
          :as="Textarea"
          v-bind="componentField"
          size="medium"
          placeholder="Write your article content here"
          class="min-h-[350px] resize-none"
        />
        <FormErrorMessage />
      </FormField>

      <Button
        type="submit"
        :loading="isSubmitting"
        class="mt-8 w-full font-semibold"
      >
        Publish
      </Button>
    </div>
  </form>
</template>
