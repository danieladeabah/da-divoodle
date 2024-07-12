<template>
  <ViewBox :title="'Share your Survey'">
    <p class="px-4 lg:px-20 py-5 text-gray-400 text-lg">
      {{ texts.shareTitle }}
    </p>
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 lg:px-20 w-full">
      <ShareLink
        :title="texts.editLinkTitle"
        :inputValue="editLink"
        :copied="copiedEditLink"
        :description="texts.shareEditLinkText"
        @copy="copyToClipboard(editLink, 'editLink')"
      />
      <ShareLink
        :title="texts.participationLinkTitle"
        :inputValue="shareLink"
        :copied="copiedShareLink"
        :description="texts.shareParticipationLinkText"
        @copy="copyToClipboard(shareLink, 'shareLink')"
      />
    </div>
    <div class="flex items-center justify-end gap-6 lg:gap-10 p-4 lg:p-10">
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
import { useSurveyStore } from "@/store/survey";
import texts from "../texts/texts.json";

const route = useRoute();
const surveyId = route.params.id;
const surveyStore = useSurveyStore();
const editLink = ref("");
const shareLink = ref("");
const copiedEditLink = ref(false);
const copiedShareLink = ref(false);

const loadSurveyLinks = () => {
  surveyStore.loadSurveys();
  const survey = surveyStore.getSurveyById(surveyId);
  if (survey) {
    editLink.value = `${window.location.origin}/edit/${survey.id}`;
    shareLink.value = `${window.location.origin}/vote/${survey.id}`;
  }
};

const copyToClipboard = (text, linkType) => {
  navigator.clipboard.writeText(text).then(
    () => {
      if (linkType === "editLink") {
        copiedEditLink.value = true;
        setTimeout(() => {
          copiedEditLink.value = false;
        }, 3000);
      } else if (linkType === "shareLink") {
        copiedShareLink.value = true;
        setTimeout(() => {
          copiedShareLink.value = false;
        }, 3000);
      }
    },
    () => {
      alert("Failed to copy link");
    }
  );
};

onMounted(loadSurveyLinks);

useHead({
  title: "Share survey",
});
</script>
