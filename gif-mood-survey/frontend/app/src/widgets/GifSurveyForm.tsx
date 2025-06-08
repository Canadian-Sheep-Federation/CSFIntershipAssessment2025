'use client';

import '../styles/GifSurveyForm.css';
import { useForm, Controller } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import { submitSurvey } from '../features/submitSurvey/model';
import type { SubmissionPayload } from '../entities/submission/types';

interface Props {
  gifUrl: string;
  onNewGifRequest?: () => void; 
}

export default function GifSurveyForm({ gifUrl, onNewGifRequest }: Props) {
  // Initialize form handling with react-hook-form
  const { register, handleSubmit, reset, control, setValue, formState: { errors, isSubmitting } } = useForm<SubmissionPayload>({
    defaultValues: {
      mood_category: '',
      mood_rating: 0,
      comment: ''
    }
  });

  // Handle form submission
  const onSubmit = async (data: SubmissionPayload) => {
    try {
      // Submit survey data using the shared submitSurvey function
      await submitSurvey(data, gifUrl);
      alert('Submitted successfully!');
      reset();
      // Request a new GIF after successful submission
      if (onNewGifRequest) {
        onNewGifRequest();
      }
    } catch (err) {
      // Error handling for submission(could be made shorter but fine for now)
      console.error('Submission error:', err);
      if (typeof err === 'object' && err !== null) {
        const errorWithResponse = err as { response?: { status?: number; data?: { message?: string } }; request?: unknown; message?: string };
        if (errorWithResponse.response) {
          console.error('Response error:', errorWithResponse.response.status, errorWithResponse.response.data);
          alert(`Error: ${errorWithResponse.response.status} - ${errorWithResponse.response.data?.message || 'Server error'}`);
        } else if (errorWithResponse.request) {
          console.error('Network error:', errorWithResponse.request);
          alert('Network error - please check your connection');
        } else {
          console.error('Unknown error:', errorWithResponse.message);
          alert('An unexpected error occurred');
        }
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="survey-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Display the GIF image */}
        <img
          src={gifUrl}
          alt="Mood GIF"
          className="gif-image"
          draggable={false}
        />

        {/* Mood category selection */}
        <div className="form-group">
          <label>How does this make you feel?</label>
          <select {...register('mood_category', { required: 'Please select a mood' })}>
            <option value="">Select mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😢 Sad</option>
            <option value="Angry">😠 Angry</option>
          </select>
          {errors.mood_category && (
            <span className="error">{errors.mood_category.message}</span>
          )}
        </div>

        {/* Rating + using stars */}
        <div className="form-group">
          <label>Rate intensity (1–5)</label>
          <Controller
            name="mood_rating"
            control={control}
            rules={{
              required: 'Please provide a rating',
              min: { value: 1, message: 'Rating must be at least 1' }
            }}
            render={({ field: { value } }) => (
              <Rating
                onClick={(rate) => {
                  setValue('mood_rating', rate);
                }}
                size={25}
                allowHover
                transition
                initialValue={value * 20} 
                fillColor="#facc15"
                emptyColor="#e5e7eb"
              />
            )}
          />
          {errors.mood_rating && (
            <span className="error">{errors.mood_rating.message}</span>
          )}
        </div>

        {/* Optional comments field */}
        <div className="form-group">
          <label>Comments (optional)</label>
          <textarea
            {...register('comment')}
            placeholder="Your thoughts..."
            rows={3}
          />
        </div>

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}