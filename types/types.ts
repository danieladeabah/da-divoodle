// Interface for survey option
export interface SurveyOption {
  id: string;
  text: string;
  votes: number;
}

// Interface for survey
export interface Survey {
  id: string;
  title: string;
  description: string;
  options: SurveyOption[];
}
