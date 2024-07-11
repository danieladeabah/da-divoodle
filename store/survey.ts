import { defineStore } from "pinia";
import { type Survey } from "../types/types";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [] as Survey[],
  }),
  actions: {
    loadSurveys() {
      const storedSurveys = localStorage.getItem("surveyData");
      if (storedSurveys) {
        this.surveys = JSON.parse(storedSurveys).surveys;
      } else {
        this.surveys = [];
      }
    },

    saveSurvey(survey: Survey) {
      const index = this.surveys.findIndex((s) => s.id === survey.id);
      if (index !== -1) {
        this.surveys.splice(index, 1, survey);
      } else {
        this.surveys.push(survey);
      }
      localStorage.setItem("surveyData", JSON.stringify({ surveys: this.surveys }));
    },

    getSurveyById(id: string): Survey | undefined {
      return this.surveys.find((s) => s.id === id);
    },

    addVote(surveyId: string, optionText: string) {
      const survey = this.getSurveyById(surveyId);
      if (survey) {
        const option = survey.options.find((o) => o.text === optionText);
        if (option) {
          option.votes++;
          this.saveSurvey(survey);
        }
      }
    },
  },
});
