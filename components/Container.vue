<template>
  <div class="font-sans relative shapes-container">
    <nav class="p-4">
      <NuxtLink to="/">
        <img src="../assets/divoodle_Logo_neu.svg" alt="Logo" />
      </NuxtLink>
    </nav>

    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style>
body {
  font-family: "MyFont", sans-serif;
  background-color: #f4f0e5;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 0;
}

*::-webkit-scrollbar-track {
  display: none;
}

.shapes-container {
  position: relative;
  min-height: 100vh;
  padding: 16px;
}

.shapes-container::before,
.shapes-container::after {
  content: "";
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: -1;
}

.shapes-container::before {
  top: 5rem;
  right: 0;
  width: 300px;
  height: 300px;
  background-image: url("../assets/shape01_neu.svg");
}

.shapes-container::after {
  bottom: 5rem;
  left: 0;
  width: 300px;
  height: 300px;
  background-image: url("../assets/shape02_neu.svg");
}

/* Responsive design */
@media (max-width: 768px) {
  .shapes-container::before,
  .shapes-container::after {
    width: 120px;
    height: 120px;
  }

  .shapes-container::before {
    top: 5px;
  }

  .shapes-container::after {
    bottom: 5px;
  }

  .logo {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .shapes-container::before,
  .shapes-container::after {
    width: 100px;
    height: 100px;
  }

  .shapes-container::before {
    top: 0;
  }

  .shapes-container::after {
    bottom: 0;
  }

  .logo {
    width: 100px;
  }
}

.content-container {
  padding: 16px;
}
</style>
