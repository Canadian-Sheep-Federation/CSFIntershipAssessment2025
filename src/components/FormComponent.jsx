import { useState, useEffect } from 'react';

const FormComponent = ({ formData, setFormData }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetches a list of countries from the REST Countries API
        // The API returns country names and codes, which are used to populate the dropdown
        fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data); // Updates the state with the fetched country data
            })
            .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (page reload)
        console.log('Submitting form data:', formData); // Logs the form data for debugging
        fetch('http://localhost:3000/api/forms', {
            method: 'POST', // Sends a POST request to the backend
            headers: {
                'Content-Type': 'application/json', // Specifies the request body format
            },
            body: JSON.stringify(formData), // Converts the form data to JSON format
        })
            .then((response) => {
                if (!response.ok) {
                    // Throws an error if the response status is not OK (e.g., 404 or 500)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parses the JSON response from the backend
            })
            .then((data) => {
                console.log('Form submitted successfully:', data); // Logs the success response
                alert('Form submitted successfully!'); // Displays a success message to the user
            })
            .catch((error) => console.error('Error submitting form:', error)); // Logs any errors
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="py-16 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-[#263238] mb-6">
                        Submit Your <span className="text-[#4caf4f]">Favorite Country</span>
                    </h1>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="countries" className="block text-[#263238] font-medium mb-2">
                                Choose a Country:
                            </label>
                            <select
                                name="countries"
                                id="countries"
                                value={formData.country} // Binds the dropdown value to the formData state
                                onChange={(e) => setFormData({ ...formData, country: e.target.value, dreamCountry: e.target.value })}
                                // Updates both the country and dreamCountry fields when a country is selected
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                            >
                                <option value="">Select a country</option>
                                {countries.map((country, index) =>
                                    country?.name?.common ? (
                                        <option key={index} value={country.name.common}>
                                            {country.name.common}
                                        </option>
                                    ) : null
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-[#263238] font-medium mb-2">
                                Reason:
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={formData.reason} // Binds the textarea value to the formData state
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                // Updates the reason field in the formData state
                                className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                                rows="5"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label htmlFor="visited" className="text-[#263238] font-medium">
                                Visited:
                            </label>
                            <input
                                type="checkbox"
                                id="visited"
                                name="visited"
                                checked={formData.visited || false} // Binds the checkbox value to the formData state
                                onChange={(e) => setFormData({ ...formData, visited: e.target.checked })}
                                // Updates the visited field in the formData state
                                className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#4caf4f] hover:bg-[#388e3b] text-white px-6 py-3 rounded font-medium transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default FormComponent;