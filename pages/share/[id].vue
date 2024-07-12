<template>
  <ViewBox :title="'Share your Survey'">
    <p class="px-4 lg:px-20 py-5 text-gray-400 text-lg">
      {{ texts.shareTitle }}
    </p>
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 lg:px-20 w-full">
      <div class="w-full lg:w-1/2">
        <div class="flex flex-col gap-4">
          <span class="font-bold">{{ texts.editLinkTitle }}</span>
          <div class="flex items-center">
            <div
              class="flex gap-2 rounded-2xl border-[1px] border-green-100 pr-2 hover:bg-green-400 items-center justify-center flex-grow"
            >
              <UInput
                size="sm"
                :class="{ 'w-full': true }"
                v-model="editLink"
                readonly
              />
              <img
                src="/assets/copyIcon.svg"
                alt="copy"
                class="cursor-pointer"
                @click="copyToClipboard(editLink)"
              />
            </div>
          </div>
          <p class="text-gray-400">
            {{ texts.shareEditLinkText }}
          </p>
        </div>
      </div>

      <div class="w-full lg:w-1/2">
        <div class="flex flex-col gap-4">
          <span class="font-bold">{{ texts.participationLinkTitle }}</span>
          <div class="flex items-center">
            <div
              class="flex gap-2 rounded-2xl border-[1px] border-green-100 pr-2 hover:bg-green-400 items-center justify-center flex-grow"
            >
              <UInput
                size="sm"
                :class="{ 'w-full': true }"
                v-model="shareLink"
                readonly
              />
              <img
                src="/assets/copyIcon.svg"
                alt="copy"
                class="cursor-pointer"
                @click="copyToClipboard(shareLink)"
              />
            </div>
          </div>
          <p class="text-gray-400">
            {{ texts.shareParticipationLinkText }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col lg:flex-row items-center justify-end gap-6 lg:gap-10 p-4 lg:p-10"
    >
      <div></div>
      <NuxtLink :to="'/edit/' + surveyId">
        <UButton
          size="sm"
          label="Edit"
          color="primary"
          variant="outline"
          class="rounded-2xl px-6 lg:px-8 my-2 lg:my-10"
        />
      </NuxtLink>
      <NuxtLink :to="'/vote/' + surveyId">
        <UButton
          size="sm"
          label="Participate"
          class="flex justify-end bg-[#00A860] rounded-2xl shadow-md px-6 lg:px-8 my-2 lg:my-10"
        />
      </NuxtLink>
    </div>
  </ViewBox>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSurveyStore } from "@/store/survey";
import texts from "../texts/texts.json";

const route = useRoute();
const surveyId = route.params.id;
const surveyStore = useSurveyStore();
const editLink = ref("");
const shareLink = ref("");

const loadSurveyLinks = () => {
  surveyStore.loadSurveys();
  const survey = surveyStore.getSurveyById(surveyId);
  if (survey) {
    editLink.value = `${window.location.origin}/edit/${survey.id}`;
    shareLink.value = `${window.location.origin}/vote/${survey.id}`;
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Link copied to clipboard");
    },
    () => {
      alert("Failed to copy link");
    }
  );
};

onMounted(() => {
  loadSurveyLinks();
});

useHead({
  title: "Share survey",
});
</script>
