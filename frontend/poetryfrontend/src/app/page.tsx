"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Rating,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";

interface Review {
  review: string;
  type: string;
  rating: number;
  docid: number;
}

export default function HomePage() {
  const [poem, setPoem] = useState<string>("");
  const [formData, setFormData] = useState<Review>({
    review: "",
    type: "art",
    rating: 5,
    docid: 0,
  });
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchShortPoem = async () => {
      const res = await fetch("https://poetrydb.org/random/5");
      const data = await res.json();
      if (Array.isArray(data)) {
        const shortPoem = data.find((p) => p.lines.length <= 4);
        if (shortPoem) {
          setPoem(shortPoem.lines.join("\n"));
        } else {
          setPoem(data[0].lines.slice(0, 4).join("\n"));
        }
      }
    };

  useEffect(() => {
    
    fetchShortPoem();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch("http://localhost:8080/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8080/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormData({ review: "", type: "art", rating: 5, docid: 0 });
    fetchReviews();
    fetchShortPoem()
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack spacing={4}>
       
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
             Random short poem
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {poem || "Loading..."}
          </Typography>
        </Paper>

        
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Leave a Review
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Your Review"
                placeholder="Write something thoughtful..."
                fullWidth
                multiline
                minRows={2}
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
              />
              <TextField
                label="Type"
                fullWidth
                helperText="e.g., art, poem, music"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <Box>
                <Typography gutterBottom>Rating</Typography>
                <Rating
                  value={formData.rating}
                  onChange={(_, value) =>
                    setFormData({ ...formData, rating: value || 0 })
                  }
                />
              </Box>
              <Button type="submit" variant="contained" size="large">
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* Past Reviews */}
        <Paper elevation={3} sx={{ p: 4}}>
          <Typography variant="h5" gutterBottom>
            Past Reviews
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {reviews.length === 0 ? (
            <Typography>No reviews submitted yet.</Typography>
          ) : (
            <Stack spacing={2}>
              {reviews.map((rev, index) => (
                <Box key={index} sx={{ p: 2, bgcolor: grey[200], borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    "{rev.review}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type: {rev.type} | Rating: {rev.rating} ⭐
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}
