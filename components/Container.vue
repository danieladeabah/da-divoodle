<template>
  <div class="font-sans relative shapes-container">
    <header class="p-4">
      <NuxtLink to="/">
        <img src="~/assets/divoodle_Logo_neu.svg" alt="Logo" class="logo" />
      </NuxtLink>
    </header>

    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>
