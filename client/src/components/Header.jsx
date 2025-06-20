import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = () => {
    const [center, setCenter] = useState("");
    const [centers, setCenters] = useState([]);
    const [searchCenter, setSearchCenter] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const handleCenter = () => {
        if (center.trim() === "") {
            alert("Please enter a valid center, pincode, state, or branch name.");
            return;
        }

        const encodedCenter = encodeURIComponent(center.trim().toLowerCase());
        window.location.href = `/branch/${encodedCenter}`;
    };

    const fetchAllCenters = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/centers`);
            const centerNames = response.data.map(center => center.name);
            setCenters(centerNames);
        } catch (error) {
            console.error("Error fetching centers:", error);
            alert("Failed to fetch centers. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllCenters();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCenters = centers.filter((name) =>
        name.toLowerCase().includes(searchCenter.toLowerCase())
    );

    const highlightMatch = (name) => {
        const index = name.toLowerCase().indexOf(searchCenter.toLowerCase());
        if (index === -1) return name;

        const before = name.slice(0, index);
        const match = name.slice(index, index + searchCenter.length);
        const after = name.slice(index + searchCenter.length);

        return (
            <>
                {before}
                <span className="font-bold text-blue-600">{match}</span>
                {after}
            </>
        );
    };

    return (
        <header className="relative w-full z-30 bg-blue-900 px-4 py-2 space-y-4 md:space-y-0 md:h-20 flex flex-col md:flex-row justify-between items-center overflow-visible">
            {/* Logo */}
            <Link to="/" className="w-full md:w-[20%]">
                <div className="name flex items-center justify-center w-full cursor-pointer">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4145A] to-[#FBB03B] text-transparent bg-clip-text">
                        HD courier
                    </h1>
                </div>
            </Link>

            {/* Input Section */}
            <div className="w-full md:w-[60%] flex flex-col md:flex-row items-center justify-center gap-4 relative z-50">
                {/* AWB Input */}
                <div className="flex w-full md:w-auto border rounded overflow-hidden bg-white">
                    <input
                        type="text"
                        placeholder="Enter AWB No."
                        className="px-2 py-2 w-full md:w-auto outline-none"
                    />
                    <button className="px-4 py-2 font-bold bg-white text-black border-l border-gray-300 hover:bg-gray-100">
                        GO!
                    </button>
                </div>

                {/* Center Input */}
                <div className="relative w-full md:w-auto" ref={suggestionsRef}>
                    <div className="flex border rounded overflow-hidden bg-white">
                        <input
                            type="text"
                            placeholder="Center/Pincode/State/Branch"
                            className="px-2 py-2 w-full outline-none"
                            onChange={(e) => {
                                setSearchCenter(e.target.value);
                                setCenter(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            value={searchCenter}
                        />
                        <button
                            onClick={handleCenter}
                            className="px-4 py-2 font-bold bg-white text-black border-l border-gray-300 hover:bg-gray-100"
                        >
                            GO!
                        </button>
                    </div>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && searchCenter && filteredCenters.length > 0 && (
                        <div className="absolute top-full left-0 w-full z-[9999] bg-white border border-gray-300 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                            {filteredCenters.map((name, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setCenter(name);
                                        setSearchCenter(name);
                                        setShowSuggestions(false);
                                    }}
                                >
                                    {highlightMatch(name)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
