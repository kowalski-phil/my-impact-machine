import { FormData, CalculationResult } from '../types';

export const calculateResults = (formData: FormData): CalculationResult => {
  const timeSavingPerProcess = formData.timeBefore - formData.timeAfter;
  const timeSavingPerMonth = (timeSavingPerProcess * formData.executionsPerMonth) / 60; // Convert to hours
  const timeSavingPerYear = timeSavingPerMonth * 12;
  const teamTimeSavingPerMonth = timeSavingPerMonth * formData.affectedPersons;
  const teamTimeSavingPerYear = timeSavingPerYear * formData.affectedPersons;
  
  const timeSavingPercentage = ((formData.timeBefore - formData.timeAfter) / formData.timeBefore) * 100;
  const errorReductionPercentage = formData.errorRateBefore > 0 
    ? ((formData.errorRateBefore - formData.errorRateAfter) / formData.errorRateBefore) * 100 
    : 0;

  // Impact score calculation
  const impactScore = (
    (timeSavingPercentage * 0.4) + 
    (errorReductionPercentage * 0.3) + 
    (Math.min(formData.affectedPersons * 10, 100) * 0.3)
  );

  return {
    timeSavingPerProcess,
    timeSavingPerMonth,
    timeSavingPerYear,
    teamTimeSavingPerMonth,
    teamTimeSavingPerYear,
    timeSavingPercentage,
    errorReductionPercentage,
    impactScore
  };
};

// Hilfsfunktion für die Formatierung der Zeitdarstellung
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  return remainingMinutes > 0 
    ? `${hours} hours ${remainingMinutes} minutes`
    : `${hours} hours`;
}; 