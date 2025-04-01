// Hilfsfunktion zur Formatierung von Datumsangaben
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Hilfsfunktion zur Ermittlung des Badge-Namens basierend auf dem Impact Score
export const getBadgeFromScore = (score: number): {
  name: string;
  icon: string;
  color: string;
} => {
  if (score >= 80) {
    return { 
      name: 'Meister-Automatisierer', 
      icon: '🥇', 
      color: 'text-yellow-600' 
    };
  } else if (score >= 60) {
    return { 
      name: 'Power-Optimierer', 
      icon: '🥈', 
      color: 'text-blue-600' 
    };
  } else if (score >= 40) {
    return { 
      name: 'Effizienz-Talent', 
      icon: '🥉', 
      color: 'text-green-600' 
    };
  } else {
    return { 
      name: 'Automation-Starter', 
      icon: '🚀', 
      color: 'text-gray-600' 
    };
  }
}; 