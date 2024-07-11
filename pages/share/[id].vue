<template>
  <ViewBox :title="'Share your Survey'">
    <p class="px-20 py-5 text-gray-400 text-lg">
      {{ texts.shareTitle }}
    </p>
    <div class="flex flex-col lg:flex-row gap-10 px-20 w-[80vw]">
      <div class="w-[100%] lg:w-[50%]">
        <label for="editLink" class="font-bold">{{
          texts.editLinkTitle
        }}</label>
        <div class="flex flex-row gap-5 items-center justify-center">
          <div
            class="flex flex-row gap-2 rounded-2xl border-[1px] border-green-100 pr-2 hover:bg-green-400 items-center justify-center"
          >
            <UInput
              size="sm"
              class="w-[55vw] lg:w-[35vw]"
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
        <p class="text-gray-400 w-[60vw] lg:w-[30vw]">
          {{ texts.shareEditLinkText }}
        </p>
      </div>

      <div>
        <label for="shareLink" class="font-bold">{{
          texts.participationLinkTitle
        }}</label>
        <div class="flex flex-row gap-5 items-center justify-center">
          <div
            class="flex flex-row gap-2 rounded-2xl border-[1px] border-green-100 pr-2 hover:bg-green-400 items-center justify-center"
          >
            <UInput
              size="sm"
              class="w-[55vw] lg:w-[30vw]"
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
        <p class="text-gray-400 w-[60vw] lg:w-[30vw]">
          {{ texts.shareParticipationLinkText }}
        </p>
      </div>
    </div>
    <div class="flex flex-row items-center justify-end gap-10 p-10">
      <NuxtLink :to="'/edit/' + surveyId">
        <UButton
          size="sm"
          label="Edit"
          color="primary"
          variant="outline"
          class="rounded-2xl px-6 my-10"
        />
      </NuxtLink>
      <NuxtLink :to="'/vote/' + surveyId">
        <UButton
          size="sm"
          label="Participate"
          class="flex justify-end bg-[#00A860] rounded-2xl shadow-md px-6 my-10"
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
    editLink.value = `${window.location.origin}/edit/${survey.editLink}`;
    shareLink.value = `${window.location.origin}/vote/${survey.shareLink}`;
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
