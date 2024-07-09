<template>
  <div
    class="font-sans container flex flex-col items-center justify-center mx-auto min-h-[90vh]"
  >
    <div class="flex flex-col items-center my-10">
      <h1 class="font-bold text-4xl">Hej!</h1>
      <p class="text-2xl font-light w-[170px] text-center">
        What would you like to do?
      </p>
    </div>
    <div class="flex gap-5">
      <UButton
        size="sm"
        label="Find a date"
        class="flex bg-gray-400 rounded-2xl hover:bg-[#868686] px-6"
      />
      <NuxtLink to="/create">
        <UButton
          size="sm"
          label="Do a survey"
          class="bg-[#00A860] rounded-2xl shadow-md px-6"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Divoodle!",
});
</script>
