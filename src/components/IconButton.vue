<template>
  <Button
    :icon="icon"
    class="rounded-full border-2 border-portage-600 bg-portage-500 p-4 shadow-none hover:bg-portage-600 dark:border-portage-800 dark:bg-portage-950 dark:hover:bg-portage-800"
    iconClass="h-5 w-5 text-portage-100"
  />
</template>

<script setup>
  import Button from '@/components/ui/button/Button.vue';

  defineProps({
    icon: {
      type: String,
      required: true,
    },
  });
</script>
