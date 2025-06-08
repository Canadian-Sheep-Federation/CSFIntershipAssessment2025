// Represents a full submission as stored in the backend
export interface Submission {
  _id: string;
  gif_url: string;
  mood_category: string;
  mood_rating: number;
  comment?: string;
  createdAt: string;
}

// Represents the data sent from the client when submitting a survey
export interface SubmissionPayload {
  mood_category: string;
  mood_rating: number;
  comment?: string;
}
