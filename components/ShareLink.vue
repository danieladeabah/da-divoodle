<template>
  <div class="w-full lg:w-1/2">
    <div class="flex flex-col gap-4">
      <span class="font-bold">{{ title }}</span>
      <div class="flex items-center">
        <div
          class="flex gap-2 rounded-2xl border-[1px] border-green-100 pr-2 hover:bg-green-400 items-center justify-center flex-grow"
        >
          <UInput
            size="sm"
            :class="{ 'w-full': true }"
            :value="inputValue"
            readonly
          />
          <img
            :src="copied ? checkIcon : copyIcon"
            alt="copy"
            class="cursor-pointer"
            @click="$emit('copy')"
          />
        </div>
      </div>
      <p class="text-gray-400">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import copyIcon from "@/assets/copyIcon.svg";
import checkIcon from "@/assets/checkIcon.svg";

const props = defineProps({
  title: String,
  inputValue: String,
  copied: Boolean,
  description: String,
});
</script>
