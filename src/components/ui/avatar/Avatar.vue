<script lang="ts">
  import { CircleUserRound } from "lucide-vue-next";
  import { tv, type VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  const avatar = tv({
    slots: {
      image: "rounded-full object-cover",
      icon: "text-foreground",
    },
    variants: {
      size: {
        small: {},
        medium: {},
        large: {},
      },
    },
    defaultVariants: {
      size: "small", // Bug dans TV => il ne s'appliquera pas si on passe explicitement undefined donc faut utiliser withDefaults
    },
    compoundSlots: [
      {
        slots: ["image", "icon"],
        size: "small",
        class: "size-8",
      },
      {
        slots: ["image", "icon"],
        size: "medium",
        class: "size-9",
      },
      {
        slots: ["image", "icon"],
        size: "large",
        class: "size-10",
      },
    ],
  });

  type AvatarVariants = VariantProps<typeof avatar>;

  interface Props {
    src?: string;
    alt?: string;
    size?: AvatarVariants["size"];
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<Props>(), {
    src: "",
    alt: "",
    size: "small",
    class: "",
  });

  const { image, icon } = avatar();
</script>

<template>
  <img v-if="src" :src :alt :class="image({ size, class: props.class })" />

  <CircleUserRound v-else :class="icon({ size, class: props.class })" />
</template>
