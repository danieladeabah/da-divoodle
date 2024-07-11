<template>
  <ViewBox :title="'Vote on Survey'">
    <div class="flex flex-col lg:flex-row gap-10 p-10">
      <div class="flex flex-col gap-4 w-full lg:w-1/2">
        <span class="font-bold">{{ survey?.title }}</span>
        <span>{{ survey?.description }}</span>
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
            v-for="(option, index) in survey?.options"
            :key="option.id"
            class="flex flex-row items-center cursor-pointer"
          >
            {{ index + 1 }}.
            <div
              :class="{ 'selected-option': selectedOption === option.text }"
              class="ml-2 flex flex-row items-center justify-between gap-40 hover:bg-[#7FD3AF] p-2 rounded-2xl w-[300px] option-container"
            >
              {{ option.text }}
              <input
                type="radio"
                :name="'framework'"
                :value="option.text"
                v-model="selectedOption"
                class="option-input"
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
import { useSurveyStore } from "@/store/survey";
import texts from "../texts/texts.json";

const route = useRoute();
const router = useRouter();
const surveyStore = useSurveyStore();
const surveyId = route.params.id;

const selectedOption = ref(null);

onMounted(() => {
  surveyStore.loadSurveys();
});

const survey = computed(() => {
  return surveyStore.getSurveyById(surveyId);
});

const submitVote = () => {
  if (selectedOption.value) {
    surveyStore.addVote(surveyId, selectedOption.value);
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
.option-input {
  display: none;
}
.option-container:hover .option-input,
.option-container.selected-option .option-input {
  display: block;
}
</style>
