import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Box
} from '@mui/material';
import axios from 'axios';

interface CatFact {
  _id: string;
  text: string;
}

interface Response {
  _id: string;
  catFactId: string;
  userResponse: string;
  createdAt: string;
}

const App: React.FC = () => {
  // useState hooks to update datas
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [selectedFact, setSelectedFact] = useState<string>('');
  const [userResponse, setUserResponse] = useState<string>('');

  useEffect(() => {
    fetchCatFacts();
    fetchResponses();
  }, []);

  // Fetch cat facts from public API meowfacts
  const fetchCatFacts = async () => {
    try {
      const response = await axios.get('https://meowfacts.herokuapp.com/?count=5');
      const transformedFacts = response.data.data.map((text: string, index: number) => ({
        _id: `fact-${index}`,
        text: text
      }));
      setCatFacts(transformedFacts);
    } catch (error) {
      console.error('Error fetching cat facts:', error);
    }
  };

  // Fetch the response from the server
  const fetchResponses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/responses');
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFact || !userResponse) return;

    // Submit the response to the server
    try {
      await axios.post('http://localhost:3000/api/responses', {
        catFactId: selectedFact,
        userResponse
      });
      setUserResponse('');
      fetchResponses();
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Cat Facts & Responses
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Cat Facts
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click on a cat fact to select it for your response
        </Typography>
        <List>
          {catFacts.map((fact) => (
            <ListItem 
              key={fact._id}
              button
              selected={selectedFact === fact._id}
              onClick={() => {
                setSelectedFact(fact._id)
                setUserResponse(fact.text)
              }}
            >
              <ListItemText primary={fact.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Your Response
          </Typography>
          {!selectedFact && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              Please select a cat fact first
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Enter your response to the selected cat fact..."
              sx={{ mb: 2 }}
              error={!selectedFact}
              disabled={!selectedFact}
            />
            <Button 
              variant="contained" 
              type="submit"
              disabled={!selectedFact || !userResponse}
            >
              Submit Response
            </Button>
            {!userResponse && selectedFact && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Please enter your response
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>

      <Box>
        <Typography variant="h5" gutterBottom>
          All Responses
        </Typography>
        <List>
          {responses.map((response) => {
            const fact = catFacts.find(f => f._id === response.catFactId);
            return (
              <ListItem key={response._id}>
                <ListItemText
                  primary={fact?.text}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default App; 