import { defineStore } from "pinia";
import { type Survey } from "@/types/types";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [] as Survey[],
  }),
  actions: {
    loadSurveys() {
      try {
        const storedSurveys = localStorage.getItem("surveyData");
        if (storedSurveys) {
          this.surveys = JSON.parse(storedSurveys).surveys;
        } else {
          this.surveys = [];
        }
      } catch (error) {
        console.error("Failed to load surveys:", error);
        this.surveys = [];
      }
    },

    saveSurvey(survey: Survey) {
      try {
        const index = this.surveys.findIndex((s) => s.id === survey.id);
        if (index !== -1) {
          this.surveys.splice(index, 1, survey);
        } else {
          this.surveys.push(survey);
        }
        localStorage.setItem(
          "surveyData",
          JSON.stringify({ surveys: this.surveys })
        );
      } catch (error) {
        console.error("Failed to save survey:", error);
      }
    },

    getSurveyById(id: string): Survey | undefined {
      return this.surveys.find((s) => s.id === id);
    },

    addVote(surveyId: string, optionText: string) {
      try {
        const survey = this.getSurveyById(surveyId);
        if (survey) {
          const option = survey.options.find((o) => o.text === optionText);
          if (option) {
            option.votes++;
            this.saveSurvey(survey);
          }
        }
      } catch (error) {
        console.error("Failed to add vote:", error);
      }
    },
  },
});
