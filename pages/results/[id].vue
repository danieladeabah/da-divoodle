<template>
  <ViewBox :title="'Survey Results'">
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 p-4 lg:p-10">
      <div class="flex flex-col gap-4 w-full lg:w-1/2">
        <span class="font-bold">{{ survey?.title }}</span>
        <span>{{ survey?.description }}</span>
      </div>

      <div class="w-full lg:w-[24.5rem]">
        <h1 class="text-xl font-bold mb-2">
          {{ texts.previewOptionTitle }}
          <span class="text-gray-400 font-extralight">{{
            texts.previewOptionMaxText
          }}</span>
        </h1>
        <div>
          <div
            v-for="(option, index) in survey?.options"
            :key="option.id"
            class="flex items-center gap-4 lg:gap-5 mb-2"
          >
            <div class="relative flex items-center gap-4 lg:gap-5 w-full">
              <span>{{ index + 1 }}.</span>
              <div
                :style="{ width: `${calculatePercentage(option.votes)}%` }"
                :class="{
                  'h-[30px] bg-[#7FD3AF]': true,
                  'rounded-xl': calculatePercentage(option.votes) === 100,
                  'rounded-l-xl': calculatePercentage(option.votes) !== 100,
                }"
              ></div>
              <span class="absolute left-4 lg:left-10 text-sm">{{
                option.text
              }}</span>
              <span class="absolute right-4 lg:right-[8rem] text-sm"
                >{{ calculatePercentage(option.votes) }}%</span
              >
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between my-4">
          <span class="text-gray-400 font-extralight">{{
            texts.resultsTotalVotesPlural
          }}</span>
          <span class="text-gray-400 font-extralight"
            >{{ totalVotes }} {{ texts.resultsVotes }}</span
          >
        </div>
      </div>
    </div>
  </ViewBox>
</template>

<script setup>
import { useSurveyStore } from "@/store/survey";
import texts from "../texts/texts.json";

const route = useRoute();
const surveyId = route.params.id;
const surveyStore = useSurveyStore();

onMounted(() => {
  surveyStore.loadSurveys();
});

const survey = computed(() => {
  return surveyStore.getSurveyById(surveyId);
});

const totalVotes = computed(() => {
  if (survey.value) {
    return survey.value.options.reduce((acc, option) => acc + option.votes, 0);
  }
  return 0;
});

const calculatePercentage = (votes) => {
  return totalVotes.value > 0
    ? Math.round((votes / totalVotes.value) * 100)
    : 0;
};

useHead({
  title: "Survey Results",
});
</script>
