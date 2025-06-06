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
import { v4 as uuidv4 } from 'uuid';

interface CatFact {
  _id: string;
  text: string;
}

interface Response {
  _id: string;
  catFactId: string;
  userName: string;
  userResponse: string;
  createdAt: Date;
}

const App: React.FC = () => {
  // useState hooks to update datas
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [selectedFactId, setSelectedFactId] = useState<string>('');
  const [userResponse, setUserResponse] = useState<string>('');
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    fetchCatFacts();
    fetchResponses();
  }, []);

  // Fetch cat facts from public API meowfacts
  const fetchCatFacts = async () => {
    try {
      const response = await axios.get('https://meowfacts.herokuapp.com/?count=5');
      const transformedFacts = response.data.data.map((text: string) => ({
        _id: uuidv4(),
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
      console.log(response.data); 
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userResponse) return;

    // Submit the response to the server
    try {
      await axios.post('http://localhost:3000/api/responses', {
        catFactId: selectedFactId || uuidv4(),
        userName: userName,
        userResponse: userResponse,
        date: new Date()
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
              selected={selectedFactId === fact._id}
              onClick={() => {
                setSelectedFactId(fact._id)
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
          {(!selectedFactId && !userResponse || !userName) && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {(!selectedFactId && !userResponse) && "Please select a cat fact or enter your own"}
              {(!selectedFactId && !userResponse) && !userName && " and "}
              {!userName && "Please enter your name"}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              sx={{ mb: 2 }}
              error={!userName}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Enter your response or the selected cat fact..."
              sx={{ mb: 2 }}
              error={!userResponse && !selectedFactId}
            />

            <Button 
              variant="contained" 
              type="submit"
              disabled={(!selectedFactId && !userResponse) || !userName}
            >
              Submit Response
            </Button>
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
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {response.userName}
                      </Typography>
                      {" — "}
                      <Typography component="span" variant="body2">
                        {response.userResponse}
                      </Typography>
                      {" • "}
                      <Typography component="span" variant="body2" color="text.secondary">
                        {new Date(response.createdAt).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </Typography>
                    </>
                  }
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