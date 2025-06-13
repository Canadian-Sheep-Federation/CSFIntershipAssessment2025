import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountrySearch from './components/CountrySearch';
import CountryForms from './components/CountryForms';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CountrySearch />} />
                <Route path="/country/:country" element={<CountryForms />} />
            </Routes>
        </Router>
    );
};

export default App;