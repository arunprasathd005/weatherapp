import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Components/Weather'; // Define Weather component path

const App = () => {
    return (
        <div className="App">
            <Weather />
        </div>
    );
};

export default App;
