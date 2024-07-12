<template>
  <div
    class="font-sans container flex flex-col items-center justify-center mx-auto"
  >
    <div class="flex flex-col w-[80vw] items-center my-10">
      <div class="flex items-center justify-between my-10 w-[80vw]">
        <p class="text-2xl font-semibold">
          {{ title }}
        </p>
        <NuxtLink to="/">
          <button
            class="p-2 bg-white w-[35px] h-[35px] shadow-lg rounded-[50%]"
          >
            <img src="../assets/closeIcon.svg" alt="Close Icon" />
          </button>
        </NuxtLink>
      </div>

      <div class="bg-white w-[100vw] lg:w-[80vw] rounded-[55px] shadow-lg p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
