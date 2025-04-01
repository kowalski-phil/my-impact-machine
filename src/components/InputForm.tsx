import React, { useState } from 'react';
import { FormData } from '../types';
import { FaClock, FaUsers, FaExclamationTriangle, FaDatabase, FaComment, FaSave } from 'react-icons/fa';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  submitButtonText?: string;
}

const defaultFormData: FormData = {
  workflowName: '',
  workflowDescription: '',
  timeBefore: 0,
  timeAfter: 0,
  affectedPersons: 1,
  executionsPerMonth: 20, // Default: 20x per month (working days)
  errorRateBefore: 0,
  errorRateAfter: 0,
  dataVolume: 0,
  colleagueFeedback: '',
};

const InputForm: React.FC<InputFormProps> = ({ 
  onSubmit, 
  initialData = defaultFormData,
  submitButtonText = 'Create Project'
}) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'workflowName' || name === 'workflowDescription' || name === 'colleagueFeedback' 
              ? value 
              : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center mb-1">
          <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <label htmlFor="workflowName" className="block text-sm font-medium text-gray-700">Workflow Name</label>
        </div>
        <input
          type="text"
          id="workflowName"
          name="workflowName"
          value={formData.workflowName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
          required
          placeholder="e.g., Monthly Closing Automation"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-1">
          <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
          <label htmlFor="workflowDescription" className="block text-sm font-medium text-gray-700">Description</label>
        </div>
        <textarea
          id="workflowDescription"
          name="workflowDescription"
          value={formData.workflowDescription}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
          rows={3}
          placeholder="What does this workflow do and which department uses it?"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center mb-1">
            <FaClock className="text-primary mr-2" />
            <label htmlFor="timeBefore" className="block text-sm font-medium text-gray-700">Time Before (min)</label>
          </div>
          <input
            type="number"
            id="timeBefore"
            name="timeBefore"
            value={formData.timeBefore}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
            placeholder="e.g., 120"
          />
        </div>
        <div>
          <div className="flex items-center mb-1">
            <FaClock className="text-green-500 mr-2" />
            <label htmlFor="timeAfter" className="block text-sm font-medium text-gray-700">Time After (min)</label>
          </div>
          <input
            type="number"
            id="timeAfter"
            name="timeAfter"
            value={formData.timeAfter}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
            placeholder="e.g., 15"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center mb-1">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <label htmlFor="executionsPerMonth" className="block text-sm font-medium text-gray-700">Executions per Month</label>
          </div>
          <input
            type="number"
            id="executionsPerMonth"
            name="executionsPerMonth"
            value={formData.executionsPerMonth}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
            placeholder="e.g., 4"
          />
          <p className="text-xs text-gray-500 mt-1 ml-7">How often does the workflow run per month?</p>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <FaUsers className="text-primary mr-2" />
            <label htmlFor="affectedPersons" className="block text-sm font-medium text-gray-700">Number of Affected People</label>
          </div>
          <input
            type="number"
            id="affectedPersons"
            name="affectedPersons"
            value={formData.affectedPersons}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
            placeholder="e.g., 3"
          />
          <p className="text-xs text-gray-500 mt-1 ml-7">How many employees work with this workflow?</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center mb-1">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <label htmlFor="errorRateBefore" className="block text-sm font-medium text-gray-700">Error Rate Before (%)</label>
          </div>
          <input
            type="number"
            id="errorRateBefore"
            name="errorRateBefore"
            value={formData.errorRateBefore}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="e.g., 15"
          />
        </div>
        <div>
          <div className="flex items-center mb-1">
            <FaExclamationTriangle className="text-green-500 mr-2" />
            <label htmlFor="errorRateAfter" className="block text-sm font-medium text-gray-700">Error Rate After (%)</label>
          </div>
          <input
            type="number"
            id="errorRateAfter"
            name="errorRateAfter"
            value={formData.errorRateAfter}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="e.g., 2"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-1">
          <FaDatabase className="text-primary mr-2" />
          <label htmlFor="dataVolume" className="block text-sm font-medium text-gray-700">Processed Data Volume (Number of Rows)</label>
        </div>
        <input
          type="number"
          id="dataVolume"
          name="dataVolume"
          value={formData.dataVolume}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
          placeholder="e.g., 1000"
        />
        <p className="text-xs text-gray-500 mt-1 ml-7">Optional: Number of processed data records/rows</p>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-1">
          <FaComment className="text-primary mr-2" />
          <label htmlFor="colleagueFeedback" className="block text-sm font-medium text-gray-700">Colleague Feedback</label>
        </div>
        <textarea
          id="colleagueFeedback"
          name="colleagueFeedback"
          value={formData.colleagueFeedback}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
          rows={2}
          placeholder="Optional: Quote from a team member about the workflow"
        />
      </div>
      
      <button 
        type="submit"
        className="w-full bg-[#0074D9] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center justify-center"
      >
        <FaSave className="mr-2" />
        {submitButtonText}
      </button>
    </form>
  );
};

export default InputForm; 