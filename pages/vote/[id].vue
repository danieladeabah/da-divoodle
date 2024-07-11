<template>
  <ViewBox :title="'Vote on Survey'">
    <div class="flex flex-col lg:flex-row gap-10 p-10">
      <div class="flex flex-col gap-4 w-full lg:w-1/2">
        <span class="font-bold">{{ survey.title }}</span>
        <span>{{ survey.description }}</span>
      </div>

      <div class="flex flex-col w-full lg:w-1/2">
        <h1 class="text-xl font-bold mb-2">
          {{ texts.previewOptionTitle }}
          <span class="text-gray-400 font-extralight">{{
            texts.previewOptionMaxText
          }}</span>
        </h1>
        <div class="flex flex-col gap-2">
          <label
            v-for="(option, index) in survey.options"
            :key="option.id"
            class="flex flex-row items-center cursor-pointer"
          >
            {{ index + 1 }}.
            <div
              :class="{ 'selected-option': selectedOption === option.text }"
              class="ml-2 flex flex-row items-center justify-between gap-40 hover:bg-[#7FD3AF] p-2 rounded-2xl w-[300px]"
            >
              {{ option.text }}
              <input
                type="radio"
                :name="'framework'"
                :value="option.text"
                v-model="selectedOption"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center justify-center gap-10 p-10">
      <UButton
        size="sm"
        label="Submit"
        class="bg-[#00A860] rounded-2xl shadow-md px-40 my-10"
        @click="submitVote"
        :disabled="!selectedOption"
      />
    </div>
  </ViewBox>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import texts from "../texts/texts.json";

const route = useRoute();
const router = useRouter();
const surveyId = route.params.id;

const selectedOption = ref(null);

// Fetching survey data from localStorage
const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {
  surveys: [],
};
const survey = computed(() => {
  return surveyData.surveys.find((s) => s.id === surveyId);
});

const submitVote = () => {
  if (selectedOption.value) {
    // Simulate updating vote count
    const updatedSurvey = { ...survey.value };
    updatedSurvey.options.forEach((option) => {
      if (option.text === selectedOption.value) {
        option.votes++;
      }
    });

    // Save updated survey data back to localStorage
    const index = surveyData.surveys.findIndex((s) => s.id === surveyId);
    surveyData.surveys[index] = updatedSurvey;
    localStorage.setItem("surveyData", JSON.stringify(surveyData));

    // Redirect to results page after submitting vote
    router.push(`/results/${surveyId}`);
  } else {
    alert("Please select an option before submitting.");
  }
};

useHead({
  title: "Vote on survey",
});
</script>

<style scoped>
.selected-option {
  background-color: #00a860;
}
</style>
