import React from 'react';

interface BadgesProps {
  impactScore: number;
  timeSavingTotal: number; // in Minuten
}

const Badges: React.FC<BadgesProps> = ({ impactScore, timeSavingTotal }) => {
  // Einfache Logik zur Bestimmung der erhaltenen Badges
  const badges = [
    {
      id: 'beginner',
      name: 'Starter',
      description: 'Erste Automatisierung erfolgreich!',
      unlocked: true, // Immer freigeschaltet, wenn man etwas berechnet hat
      icon: '🚀'
    },
    {
      id: 'saver_small',
      name: 'Zeit-Optimierer',
      description: 'Spare mindestens 1 Stunde pro Monat',
      unlocked: timeSavingTotal >= 60,
      icon: '⏱️'
    },
    {
      id: 'saver_medium',
      name: 'Effizienz-Held',
      description: 'Spare mindestens 1 Arbeitstag (8 Std.) pro Monat',
      unlocked: timeSavingTotal >= 480,
      icon: '⚡'
    },
    {
      id: 'saver_large',
      name: 'Zeit-Magier',
      description: 'Spare mindestens 3 Arbeitstage pro Monat',
      unlocked: timeSavingTotal >= 1440,
      icon: '🧙'
    },
    {
      id: 'impact_master',
      name: 'Impact Master',
      description: 'Erreiche einen Impact Score von mindestens 80%',
      unlocked: impactScore >= 80,
      icon: '🏆'
    }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary">Deine Erfolge</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map(badge => (
          <div 
            key={badge.id}
            className={`p-3 rounded-lg text-center ${
              badge.unlocked 
                ? 'bg-blue-50 border border-blue-200' 
                : 'bg-gray-50 border border-gray-200 opacity-50'
            }`}
          >
            <div className="text-3xl mb-2">{badge.icon}</div>
            <h4 className="font-medium text-sm">{badge.name}</h4>
            <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
            {!badge.unlocked && (
              <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
                Noch nicht freigeschaltet
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges; 