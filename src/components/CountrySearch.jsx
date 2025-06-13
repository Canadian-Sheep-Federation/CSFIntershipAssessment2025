import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormComponent from './FormComponent';

const CountrySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        country: '',
        reason: '',
        visited: false,
    });

    useEffect(() => {
        // Fetch countries dynamically from the API
        fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    const filteredCountries = countries
        .filter((country) =>
            country?.name?.common?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 12);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white px-4 lg:px-6 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#4caf4f] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-lg">CE</span>
                    </div>
                    <span className="text-[#263238] font-semibold text-xl">CountryExplorer</span>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-[#263238] hover:text-[#4caf4f] transition-colors">
                        Home
                    </a>
                    <a href="#" className="text-[#717171] hover:text-[#4caf4f] transition-colors">  
                        Forms
                    </a>
                    <a href="#" className="text-[#717171] hover:text-[#4caf4f] transition-colors">
                        About
                    </a></nav>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-4 lg:px-6 h-screen">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#263238] leading-tight">
                            Discover and track your <span className="text-[#4caf4f]">favorite country</span>
                        </h1>
                        <p className="text-[#717171] text-lg">
                            Search live country data, save your favorites, and share your travel experiences. Connect
                            with fellow explorers and build your personal country collection.
                        </p>
                        <button className="bg-[#4caf4f] hover:bg-[#388e3b] text-white px-8 py-3 rounded">
                            Explore Countries
                        </button>
                    </div>
                    <div className="relative">
                        {/* Search Input */}
                        <div className="absolute inset-0 bg-[#4caf4f] rounded-lg opacity-20"></div>
                        <div className="relative z-10 p-4">
                            <input
                                type="text"
                                placeholder="Search for a country..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4caf4f]"
                            />
                            <ul className="mt-4 space-y-2">
                                {filteredCountries.map((country, index) => (
                                    <li
                                        key={index}
                                        className="text-[#263238] bg-white px-4 py-2 rounded shadow-sm hover:bg-[#f1f1f1] transition"
                                    >
                                        <Link to={`/country/${country.name.common}`} className="hover:text-[#4caf4f]">
                                            {country.name.common}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="">
                <div className="max-w-7xl mx-auto">
                    <FormComponent formData={formData} setFormData={setFormData} />
                </div>
            </section>
        </div>
    );
};

export default CountrySearch;



