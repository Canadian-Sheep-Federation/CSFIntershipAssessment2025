import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CountryForms = () => {
    const { country } = useParams(); // Extracts the country name from the URL
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetches submissions for the selected country from the backend
        fetch(`http://localhost:3000/api/forms/country/${country}`)
            .then((response) => {
                if (!response.ok) {K
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parses the JSON response from the backend
            })
            .then((data) => {
                setForms(data); // Updates the state with the fetched submissions
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching forms:', error); 
                setLoading(false);
            });
    }, [country]); // Runs the effect whenever the country changes

    if (loading) {
        return <div className="text-center py-16">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-sm">
                <h1 className="text-[#263238] font-semibold text-xl">Forms for {country}</h1>
            </header>
            <section className="py-16 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-[#263238] mb-6">
                        Submitted Forms for <span className="text-[#4caf4f]">{country}</span>
                    </h2>
                    {forms.length > 0 ? (
                        <ul className="space-y-4">
                            {forms.map((form) => (
                                <li
                                    key={form.id}
                                    className="bg-gray-50 p-4 rounded shadow-sm border border-gray-200"
                                >
                                    <p><strong>Reason:</strong> {form.reason}</p>
                                    <p><strong>Visited:</strong> {form.visited ? 'Yes' : 'No'}</p>
                                    <p className="text-sm text-gray-500">
                                        Submitted on: {new Date(form.createdAt).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No forms have been submitted for this country.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CountryForms;