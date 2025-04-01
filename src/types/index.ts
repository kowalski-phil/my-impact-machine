export interface FormData {
  workflowName: string;
  workflowDescription: string;
  timeBefore: number;
  timeAfter: number;
  affectedPersons: number;
  executionsPerMonth: number;
  errorRateBefore: number;
  errorRateAfter: number;
  dataVolume: number;
  colleagueFeedback: string;
}

export interface CalculationResult {
  timeSavingPerProcess: number;
  timeSavingPerMonth: number;
  timeSavingPerYear: number;
  teamTimeSavingPerMonth: number;
  teamTimeSavingPerYear: number;
  timeSavingPercentage: number;
  errorReductionPercentage: number;
  impactScore: number;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  formData: FormData;
  results: CalculationResult;
}

export interface User {
  id: string;
  name: string;
  email: string;
} 