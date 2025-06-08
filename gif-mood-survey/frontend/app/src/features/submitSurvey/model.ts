import { backendApi } from '../../shared/api/backendApi';
import type { SubmissionPayload } from '../../entities/submission/types';

// Function to submit survey data
export const submitSurvey = async (data: SubmissionPayload, gifUrl: string) => {
  try {
    const response = await backendApi.post('/', {
      gif_url: gifUrl,
      timestamp: Date.now(),
      ...data,
    });
    return response.data;
  } catch (err) {
    console.error('Submission failed', err);
    throw err;
  }
};