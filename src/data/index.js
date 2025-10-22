// Central export for all AWS certification data
export { cloudPractitioner, cloudDeveloper, solutionArchitect } from './aws.js';

// Combined exam data for easy access
export const awsExams = {
  'cloud-practitioner': () => import('./aws.js').then(m => m.cloudPractitioner),
  'developer-associate': () => import('./aws.js').then(m => m.cloudDeveloper),
  'solutions-architect-associate': () => import('./aws.js').then(m => m.solutionArchitect)
};

// Get exam data by ID
export const getExamData = async (examId) => {
  const loader = awsExams[examId];
  if (!loader) {
    throw new Error(`Exam data not found for ID: ${examId}`);
  }
  return await loader();
};