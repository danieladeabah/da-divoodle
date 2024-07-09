<template>
  <!-- form model -->
  <div v-if="activeTab === 'formModel'">
    <ViewBoxModel :title="editMode ? 'Edit survey' : 'Create a survey'">
      <div class="flex flex-col lg:flex-row gap-10 p-10">
        <div class="w-[100%] lg:w-[50%]">
          <label for="title" class="font-bold">{{ texts.formDataTitle }}</label>
          <UInput size="sm" class="mb-10" v-model="title" />
          <label for="description" class="font-bold">{{ texts.formDataDescription }}</label>
          <UTextarea autoresize :rows="12" :maxrows="5" v-model="description" />
        </div>

        <div>
          <h1 class="text-xl font-bold mb-2">
            {{ texts.optionsTitle }}
            <span class="text-gray-400 font-extralight">{{ texts.optionsMaxText }}</span>
          </h1>
          <div class="flex flex-col gap-4">
            <div
              v-for="(option, index) in options"
              :key="index"
              class="flex flex-row gap-5 items-center justify-center"
            >
              {{ index + 1 }}.
              <div
                class="flex flex-row gap-5 rounded-2xl pr-2 hover:bg-red-400 items-center justify-center"
              >
                <UInput
                  size="sm"
                  class="w-[60vw] lg:w-[40vw]"
                  v-model="option.text"
                />
                <img
                  src="../assets/deleteIcon.svg"
                  alt="delete"
                  class="cursor-pointer"
                  @click="removeOption(index)"
                />
              </div>
            </div>
          </div>

          <UButton
            size="sm"
            icon="i-heroicons-plus"
            color="primary"
            variant="outline"
            class="rounded-2xl px-6 my-10"
            @click="addOption"
          />
        </div>
      </div>
      <div class="flex flex-row items-center justify-end gap-10 p-10">
        <UButton
          size="sm"
          label="Next"
          @click="goToPreview"
          class="flex justify-end bg-[#00A860] rounded-2xl shadow-md px-6 my-10"
          :disabled="!isFormValid"
        />
      </div>
    </ViewBoxModel>
  </div>

  <!-- preview -->
  <div v-if="activeTab === 'preview'">
    <ViewBoxModel :title="'Survey Preview'">
      <div class="flex flex-col lg:flex-row gap-10 p-10">
        <div class="flex flex-col gap-4 w-[100%] lg:w-[50%]">
          <span class="font-bold">{{ title }}</span>
          <span>{{ description }}</span>
        </div>

        <div>
          <h1 class="text-xl font-bold mb-2">
            {{ texts.previewOptionTitle }}
            <span class="text-gray-400 font-extralight">{{ texts.previewOptionMaxText }}</span>
          </h1>
          <ol>
            <li v-for="(option, index) in options" :key="index">
              {{ index + 1 }}. {{ option.text }}
            </li>
          </ol>
        </div>
      </div>
      <div class="flex flex-row items-center justify-between gap-10 p-10">
        <UButton
          v-if="route.path === '/create'"
          size="sm"
          label="Edit"
          @click="goToEdit"
          color="primary"
          variant="outline"
          class="rounded-2xl px-6 my-10"
        />
        <UButton
          v-else
          size="sm"
          label="Edit"
          @click="goToFormModel"
          color="primary"
          variant="outline"
          class="rounded-2xl px-6 my-10"
        />
        <UButton
          size="sm"
          :label="route.path === '/create' ? 'Create Poll' : 'Update Poll'"
          class="bg-[#00A860] rounded-2xl shadow-md px-6 my-10"
          @click="saveSurvey"
        />
      </div>
    </ViewBoxModel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import texts from '../texts/texts.json';

const activeTab = ref("formModel");
const route = useRoute();
const router = useRouter();
let editMode = ref(false);

const title = ref("");
const description = ref("");
const options = ref([{ text: "" }, { text: "" }]); // Initialize with 2 empty options

const goToPreview = () => {
  activeTab.value = "preview";
};

const goToFormModel = () => {
  activeTab.value = "formModel";
};

const goToEdit = () => {
  editMode = true;
  activeTab.value = "formModel";
};

const addOption = () => {
  if (options.value.length < 10) {
    options.value.push({ text: "" });
  }
};

const removeOption = (index) => {
  if (options.value.length > 2) {
    options.value.splice(index, 1);
  }
};

const isFormValid = ref(false);

watch(
  [title, description, options],
  () => {
    isFormValid.value =
      title.value &&
      description.value &&
      options.value.length >= 2 &&
      options.value.length <= 10 &&
      options.value.every((option) => option.text);
  },
  { deep: true }
);

const loadSurvey = () => {
  if (route.path.includes("/edit")) {
    const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {
      surveys: [],
    };
    const survey = surveyData.surveys.find((s) => s.id === route.params.id);
    if (survey) {
      title.value = survey.title;
      description.value = survey.description;
      options.value = survey.options.map((option) => ({ text: option.text }));
    }
  }
};

const saveSurvey = () => {
  const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {
    surveys: [],
  };
  const survey = {
    id: route.params.id || `${Date.now()}`,
    title: title.value,
    description: description.value,
    options: options.value.map((option, index) => ({
      id: `option${index + 1}`,
      text: option.text,
      votes: 0,
    })),
    totalVotes: 0,
    editLink: `${Date.now()}`,
    shareLink: `${Date.now()}`,
  };

  if (route.path === "/create") {
    surveyData.surveys.push(survey);
  } else {
    const surveyIndex = surveyData.surveys.findIndex((s) => s.id === survey.id);
    if (surveyIndex !== -1) {
      surveyData.surveys[surveyIndex] = survey;
    }
  }

  localStorage.setItem("surveyData", JSON.stringify(surveyData));
  router.push(`/share/${survey.id}`);
};

useHead({
  title: route.path === "/create" ? "Create a Survey" : "Edit Survey",
});

loadSurvey();
</script>
