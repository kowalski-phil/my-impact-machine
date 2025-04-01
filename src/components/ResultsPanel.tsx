import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { FormData, CalculationResult } from '../types';
import { formatTime } from '../utils/calculations';
import { FaDownload } from 'react-icons/fa';

// Registrieren der benötigten Chart.js-Komponenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ResultsPanelProps {
  results: CalculationResult;
  formData: FormData;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, formData }) => {
  const resultsPanelRef = useRef<HTMLDivElement>(null);
  
  // Funktion zum Exportieren als PNG
  const handleExportPNG = async () => {
    if (!resultsPanelRef.current) return;
    
    try {
      const dataUrl = await toPng(resultsPanelRef.current, { quality: 0.95 });
      
      // Erstellen eines temporären Links zum Herunterladen
      const link = document.createElement('a');
      link.download = `${formData.workflowName.replace(/\s+/g, '-')}_impact.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG-Export fehlgeschlagen:', error);
      alert('Export fehlgeschlagen. Bitte versuche es erneut.');
    }
  };
  
  // Funktion zum Exportieren als PDF
  const handleExportPDF = async () => {
    if (!resultsPanelRef.current) return;
    
    try {
      const dataUrl = await toJpeg(resultsPanelRef.current, { quality: 0.95 });
      
      // PDF erstellen (A4-Format)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 Breite in mm
      const imgHeight = (resultsPanelRef.current.offsetHeight * imgWidth) / resultsPanelRef.current.offsetWidth;
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${formData.workflowName.replace(/\s+/g, '-')}_impact.pdf`);
    } catch (error) {
      console.error('PDF-Export fehlgeschlagen:', error);
      alert('Export fehlgeschlagen. Bitte versuche es erneut.');
    }
  };

  // Text-Export für das Impact Summary Template
  const handleExportText = () => {
    const text = `
WORKFLOW IMPACT SUMMARY
======================
Workflow: ${formData.workflowName}
${formData.workflowDescription ? `Beschreibung: ${formData.workflowDescription}` : ''}

AUSFÜHRUNGSDETAILS
----------------
- Ausführungen pro Monat: ${formData.executionsPerMonth}
- Betroffene Personen: ${formData.affectedPersons}

ZEITERSPARNIS
------------
- Vorher: ${formData.timeBefore} Minuten pro Durchlauf
- Nachher: ${formData.timeAfter} Minuten pro Durchlauf
- Ersparnis: ${results.timeSavingPerProcess} Minuten (${results.timeSavingPercentage}%)
- Monatliche Ersparnis pro Person: ${formatTime(results.timeSavingPerMonth)}
- Jährliche Ersparnis für das Team (${formData.affectedPersons} ${formData.affectedPersons === 1 ? 'Person' : 'Personen'}): ${formatTime(results.teamTimeSavingPerYear)}

${results.errorReductionPercentage > 0 ? `
FEHLERREDUKTION
--------------
- Fehlerquote vorher: ${formData.errorRateBefore}%
- Fehlerquote nachher: ${formData.errorRateAfter}%
- Verbesserung: ${results.errorReductionPercentage}%
` : ''}

IMPACT SCORE: ${results.impactScore}%

${formData.colleagueFeedback ? `
FEEDBACK
-------
"${formData.colleagueFeedback}"
` : ''}
`;

    // Text in die Zwischenablage kopieren und/oder als Datei herunterladen
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${formData.workflowName.replace(/\s+/g, '-')}_impact_summary.txt`;
    link.href = url;
    link.click();
  };

  // Konfiguration für das Balkendiagramm (Zeiteinsparung)
  const timeBarData = {
    labels: ['Vorher', 'Nachher'],
    datasets: [
      {
        label: 'Zeitaufwand (Minuten)',
        data: [formData.timeBefore, formData.timeAfter],
        backgroundColor: ['#0074D9', '#7FDBFF'],
      },
    ],
  };

  // Konfiguration für das Balkendiagramm (Fehlerquote) - NEU
  const errorBarData = {
    labels: ['Vorher', 'Nachher'],
    datasets: [
      {
        label: 'Fehlerquote (%)',
        data: [formData.errorRateBefore, formData.errorRateAfter],
        backgroundColor: ['#FF4136', '#2ECC40'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Impact Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Time Savings</h3>
            <p className="text-lg">{results.timeSavingPerMonth} hours per month</p>
            <p className="text-sm text-gray-600">{results.timeSavingPerYear} hours per year</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Error Reduction</h3>
            <p className="text-lg">{results.errorReductionPercentage}% improvement</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Team Impact</h3>
            <p className="text-lg">{formData.affectedPersons} people benefit</p>
            <p className="text-sm text-gray-600">{results.teamTimeSavingPerYear} team hours saved per year</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Data Processing</h3>
            <p className="text-lg">{formData.dataVolume?.toLocaleString()} rows processed</p>
            <p className="text-sm text-gray-600">Monthly execution: {formData.executionsPerMonth}x</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={handleExportText} 
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaDownload className="inline mr-2" />
          Export Results
        </button>
      </div>
    </div>
  );
};

export default ResultsPanel; 