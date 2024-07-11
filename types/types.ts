export interface SurveyOption {
  id: string;
  text: string;
  votes: number;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  options: SurveyOption[];
}
