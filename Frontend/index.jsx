import React, { useState } from 'react';

// --- STYLES ---
// All the CSS is here in a single style tag for simplicity. This section
// controls the look and feel of the entire application.
const AppStyles = () => (
    <style>{`
        /* Import the 'Inter' font from Google Fonts for a clean, modern look */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        /* Universal selector to apply a basic reset to all elements */
        * { 
            box-sizing: border-box; /* Makes layout calculations more predictable */
            margin: 0; 
            padding: 0; 
        }

        /* Styles applied to the entire page */
        body {
            font-family: 'Inter', sans-serif; /* Sets the default font */
            background-image: url('https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=2069');
            background-size: cover; /* Ensures the image covers the whole background */
            background-position: center; /* Centers the background image */
            background-attachment: fixed; /* The background image stays in place when scrolling */
            color: rgb(255, 255, 255);
            /* Adds a subtle shadow to all text, making it easier to read on top of the image */
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        /* The main root div where our React app is rendered */
        #root {
            display: flex;
            justify-content: center; /* Horizontally centers the content */
            padding: 40px;
            min-height: 100vh; /* Ensures the app takes up at least the full height of the screen */
            background-color: rgba(0, 0, 0, 0.85); /* A dark overlay to make content pop */
        }
        .main-container { 
            width: 100%; 
            max-width: 1200px; /* Limits the maximum width of the content on large screens */
        }

        /* --- Global Styles for common elements like buttons and inputs --- */
        .button { 
            padding: 12px 20px; 
            background: rgb(220, 20, 60); /* Crimson Red */
            border: none; 
            border-radius: 8px; 
            color: rgb(255, 255, 255); 
            font-size: 16px; 
            font-weight: 600; 
            cursor: pointer; 
            transition: background-color 0.2s; /* Smooth color change on hover */
        }
        .button:hover { 
            background-color: rgb(180, 20, 50); /* A slightly darker red for hover */
        }
        .input { 
            width: 100%; 
            padding: 12px; 
            background-color: rgb(30, 30, 30); 
            border: 1px solid rgb(60, 60, 60); 
            border-radius: 8px; 
            color: rgb(255, 255, 255); 
            font-size: 16px; 
        }
        .input:focus { 
            outline: none; 
            border-color: rgb(220, 20, 60); /* Highlights the input with red when selected */
        }
        
        /* --- Styles for the Login Screen --- */
        .login-card { 
            background-color: rgba(18, 18, 18, 0.9); /* Semi-transparent dark background */
            padding: 40px; 
            border-radius: 12px; 
            border-top: 4px solid rgb(220, 20, 60); /* Red accent line at the top */
            text-align: center; 
            max-width: 420px; 
            margin: 60px auto; /* Centers the card on the page */
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* A subtle shadow for depth */
        }
        .login-title { 
            font-size: 40px; 
            margin-bottom: 8px; 
            color: rgb(255, 255, 255);
        }
        .login-subtitle { 
            margin-bottom: 40px;
            color: rgb(255, 255, 255);
        }
        .input-group { 
            margin-bottom: 24px; 
            text-align: left; 
        }
        .input-label { 
            display: block; 
            margin-bottom: 8px; 
            color: rgb(255, 255, 255);
        }

        /* --- Styles for the Main Dashboard --- */
        .dashboard-header { 
            display: flex; 
            justify-content: space-between; /* Pushes title and button to opposite ends */
            align-items: center; 
            margin-bottom: 40px; 
        }
        .dashboard-title { 
            font-size: 40px; 
            font-weight: 700; 
            color: rgb(255, 255, 255);
        }
        .logout-button { 
            background: none; 
            border: 1px solid rgb(220, 20, 60); 
            color: rgb(220, 20, 60); 
        }
        .logout-button:hover { 
            background: rgb(220, 20, 60); 
            color: rgb(255, 255, 255); 
        }
        .dashboard { 
            display: flex; 
            flex-wrap: wrap; /* Allows items to wrap to the next line on smaller screens */
            justify-content: center; 
            gap: 24px; /* Space between the dashboard widgets */
        }
        
        /* --- Styles for each section/widget on the dashboard --- */
        .section { 
            background-color: rgba(18, 18, 18, 0.9); 
            border: 1px solid rgb(60, 60, 60); 
            border-top: 4px solid rgb(220, 20, 60); 
            border-radius: 12px; 
            padding: 24px; 
            width: 380px; 
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .section-title { 
            font-size: 20px; 
            font-weight: 600; 
            padding-bottom: 16px; 
            margin-bottom: 16px; 
            color: rgb(255, 255, 255);
        }
        .form-group { 
            display: flex; 
            gap: 12px; 
        }

        /* Activity Monitor styles */
        .activity-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; /* Creates a two-column layout */
            gap: 16px; 
        }
        .activity-item { 
            background-color: rgb(30, 30, 30); 
            padding: 16px; 
            border-radius: 8px; 
            text-align: center; 
        }
        .activity-value { 
            font-size: 28px; 
            font-weight: 600; 
            color: rgb(255, 255, 255);
        }
        .activity-label { 
            font-size: 14px; 
            font-weight: 500;
            text-transform: uppercase; 
            color: rgb(255, 255, 255);
        }
        
        /* Styles for the lists in Meal and Exercise logs */
        .log-list { 
            list-style: none; 
            margin-bottom: 16px; 
            max-height: 150px; 
            overflow-y: auto; /* Adds a scrollbar if the list gets too long */
        }
        .log-item { 
            background-color: rgb(220, 20, 60); 
            padding: 10px 16px; 
            border-radius: 6px; 
            margin-bottom: 8px; 
            color: rgb(255, 255, 255); 
            font-weight: 500;
        }
        
        /* AI Suggester styles */
        .suggestions-container { 
            background-color: rgb(30, 30, 30); 
            padding: 16px; 
            border-radius: 8px; 
            min-height: 100px; 
            margin-top: 16px; 
        }
        .suggestion-item { 
            padding-bottom: 12px; 
            margin-bottom: 12px; 
            border-bottom: 1px solid rgb(60, 60, 60); 
            color: rgb(255, 255, 255);
        }
        .suggestion-item:last-child { 
            border-bottom: none; 
            margin-bottom: 0; 
        }
        .suggestion-title { 
            font-weight: 600; 
        }
        
        /* BMI Calculator styles */
        .bmi-inputs { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 16px; 
            margin-bottom: 16px; 
        }
        .bmi-result { 
            margin-top: 16px; 
            text-align: center; 
            background-color: rgb(30, 30, 30); 
            padding: 16px; 
            border-radius: 8px; 
            color: rgb(255, 255, 255);
        }
        .bmi-value { 
            font-size: 36px; 
            font-weight: 600; 
        }
    `}</style>
);

// --- UI Components ---

/**
 * The Login Screen component. 
 * It receives a function `onLogin` as a prop to handle the login action.
 */
const LoginScreen = ({ onLogin }) => (
    <div className="login-card">
        <h1 className="login-title">Fitness Partner</h1>
        <p className="login-subtitle">Your AI-Powered Fitness Companion</p>
        <form onSubmit={onLogin}>
            <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <input className="input" type="email" id="email" required />
            </div>
            <div className="input-group">
                <label className="input-label" htmlFor="password">Password</label>
                <input className="input" type="password" id="password" required />
            </div>
            <button className="button" type="submit">Log In</button>
        </form>
    </div>
);

/**
 * The Activity Monitor component. Displays static fitness data.
 * This is a simple "presentational" component.
 */
const ActivityMonitor = () => (
    <div className="section">
        <h2 className="section-title">Activity Monitor</h2>
        <div className="activity-grid">
            <div className="activity-item">
                <div className="activity-value">8,452</div>
                <div className="activity-label">Steps</div>
            </div>
            <div className="activity-item">
                <div className="activity-value">312</div>
                <div className="activity-label">Kcal Burn</div>
            </div>
        </div>
    </div>
);

/**
 * A reusable component for both Meal and Exercise logs.
 * This avoids writing the same form/list code twice. It manages its own
 * internal state for the input field.
 */
const LogSection = ({ title, items, setItems, placeholder }) => {
    // This state holds the current value of the text input field.
    const [newItem, setNewItem] = useState('');

    // This function runs when the form is submitted.
    const handleAddItem = (e) => {
        e.preventDefault(); // Prevents the browser from reloading the page
        if (newItem) { // Only add if the input is not empty
            setItems([newItem, ...items]); // Adds the new item to the beginning of the list
            setNewItem(''); // Clears the input field after adding
        }
    };

    return (
        <div className="section">
            <h2 className="section-title">{title}</h2>
            <ul className="log-list">
                {/* Maps over the 'items' array and creates a list item for each one */}
                {items.map((item, i) => <li key={i} className="log-item">{item}</li>)}
            </ul>
            <form className="form-group" onSubmit={handleAddItem}>
                <input 
                    type="text" 
                    className="input" 
                    placeholder={placeholder} 
                    value={newItem} 
                    onChange={e => setNewItem(e.target.value)} 
                />
                <button type="submit" className="button">Add</button>
            </form>
        </div>
    );
};

/**
 * The BMI Calculator component.
 */
const BmiCalculator = ({ bmiResult, height, setHeight, weight, setWeight, calculateBmi }) => (
     <div className="section">
         <h2 className="section-title">BMI Calculator</h2>
         <div className="bmi-inputs">
            <input 
                type="number" 
                className="input" 
                placeholder="Height (cm)" 
                value={height} 
                onChange={e => setHeight(e.target.value)} 
            />
            <input 
                type="number" 
                className="input" 
                placeholder="Weight (kg)" 
                value={weight} 
                onChange={e => setWeight(e.target.value)} 
            />
        </div>
        <button className="button" onClick={calculateBmi}>Calculate</button>
        {/* This part only renders if 'bmiResult' is not null */}
        {bmiResult && (
            <div className="bmi-result">
                <div className="bmi-value">{bmiResult.value}</div>
                <div className="bmi-category">{bmiResult.category}</div>
            </div>
        )}
    </div>
);

/**
 * The AI Suggester component. It fetches and displays exercise ideas from the Gemini API.
 */
const AiSuggester = ({ goal, setGoal, suggestions, getSuggestions, isLoading }) => (
    <div className="section">
        <h2 className="section-title">AI Exercise Suggester</h2>
        <div className="form-group">
            <input 
                type="text" 
                className="input" 
                placeholder="Enter fitness goal..." 
                value={goal} 
                onChange={e => setGoal(e.target.value)} 
            />
            <button 
                className="button" 
                onClick={getSuggestions} 
                disabled={isLoading}>
                {isLoading ? "..." : "Get Ideas"}
            </button>
        </div>
        <div className="suggestions-container">
            {isLoading 
                ? <p>Loading...</p> 
                : suggestions.split('\n').filter(Boolean).map((line, i) => {
                    // This logic splits the API response into a title and description
                    const [title, ...desc] = line.split(':');
                    return (
                        <div key={i} className="suggestion-item">
                            <strong className="suggestion-title">{title.replace(/^\d+\.\s*/, '')}</strong>
                            <p>{desc.join(':').trim()}</p>
                        </div>
                    );
                })
            }
        </div>
    </div>
);


// --- The Main Component ---
// This is the heart of our application. It holds all the pieces together,
// manages the overall state, and decides what to show on the screen.
export default function App() {
    // --- STATE ---
    // 'useState' is a React Hook that lets us add state (data that can change)
    // to our component. It returns the current state and a function to update it.

    // Manages whether the user is logged in or not, to show the correct screen.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Stores the list of meals for the Meal Log.
    const [meals, setMeals] = useState(['Oatmeal', 'Chicken Salad']);
    // Stores the list of exercises for the Exercise Log.
    const [exercises, setExercises] = useState(['Morning Run', 'HIIT']);
    // Stores the user's input for the AI fitness goal.
    const [goal, setGoal] = useState('');
    // Stores the suggestions received from the Gemini API.
    const [suggestions, setSuggestions] = useState('');
    // Tracks whether the API call is in progress, to show a loading state.
    const [isLoading, setIsLoading] = useState(false);
    // Stores the user's height input for the BMI calculator.
    const [height, setHeight] = useState('');
    // Stores the user's weight input for the BMI calculator.
    const [weight, setWeight] = useState('');
    // Stores the calculated BMI result object ({ value, category }).
    const [bmiResult, setBmiResult] = useState(null);

    // --- LOGIC / EVENT HANDLERS ---
    // These functions handle user actions, like clicking buttons or submitting forms.
    
    // Handles the login form submission.
    const handleLogin = (e) => { 
        e.preventDefault(); // Prevents the page from reloading.
        setIsLoggedIn(true); // Updates state to show the dashboard.
    };
    // Handles the logout button click.
    const handleLogout = () => setIsLoggedIn(false);

    // Calculates the BMI based on height and weight state.
    const calculateBmi = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);
        if (h > 0 && w > 0) {
            const bmiValue = (w / ((h / 100) ** 2)).toFixed(1);
            let category = 'Normal';
            if (bmiValue < 18.5) category = 'Underweight';
            else if (bmiValue >= 25 && bmiValue < 30) category = 'Overweight';
            else if (bmiValue >= 30) category = 'Obese';
            setBmiResult({ value: bmiValue, category });
        }
    };

    // Fetches exercise suggestions from the Gemini API.
    const getExerciseSuggestions = async () => {
        if (!goal) return; // Don't run if the goal input is empty.
        setIsLoading(true); // Show a loading indicator.
        setSuggestions(''); // Clear previous suggestions.
        const apiKey = ""; // API key is not needed for this model
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const prompt = `Fitness goal: "${goal}". Give 3 exercise ideas. Format: "Name: Description."`;
        
        try { // Use a try...catch block for error handling during the API call.
            const response = await fetch(apiUrl, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ 
                    contents: [{ parts: [{ text: prompt }] }] 
                }) 
            });
            const result = await response.json();
            const suggestionsText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Could not get suggestions.";
            setSuggestions(suggestionsText);
        } catch (err) {
            setSuggestions("Error fetching suggestions.");
        } finally { // The 'finally' block always runs, whether the call succeeded or failed.
            setIsLoading(false); // Hide the loading indicator.
        }
    };

    // --- RENDER ---
    return (
        // A React Fragment (<>) is used to group elements without adding an extra node to the DOM.
        <>
            <AppStyles />
            <div className="main-container">
                {/* This is a conditional (ternary) operator. It's a compact way of writing an if-else statement. */}
                {/* If 'isLoggedIn' is false, show the LoginScreen. Otherwise, show the Dashboard. */}
                {!isLoggedIn ? (
                    <LoginScreen onLogin={handleLogin} />
                ) : (
                    <div>
                        <div className="dashboard-header">
                            <h1 className="dashboard-title">Dashboard</h1>
                            <button 
                                className="button logout-button" 
                                onClick={handleLogout}>
                                Log Out
                            </button>
                        </div>
                        <div className="dashboard">
                            {/* Each component is rendered here and passed the necessary state and functions as props. */}
                            <ActivityMonitor />
                            <BmiCalculator 
                                bmiResult={bmiResult}
                                height={height}
                                setHeight={setHeight}
                                weight={weight}
                                setWeight={setWeight}
                                calculateBmi={calculateBmi}
                            />
                            <LogSection 
                                title="Meal Log" 
                                items={meals} 
                                setItems={setMeals} 
                                placeholder="Add meal..." 
                            />
                            <LogSection 
                                title="Exercise Log" 
                                items={exercises} 
                                setItems={setExercises} 
                                placeholder="Add exercise..." 
                            />
                            <AiSuggester 
                                goal={goal}
                                setGoal={setGoal}
                                suggestions={suggestions}
                                getSuggestions={getExerciseSuggestions}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

