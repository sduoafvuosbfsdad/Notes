import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeographyIndex from './pages/Geography/GeographyIndex';
import Tectonics_2_4 from './pages/Geography/Tectonics/Tectonics_2_4';


import ChemistryIndex from './pages/Chemistry/ChemistryIndex';
import ReactivitySeries from "@/pages/Chemistry/12-ReactivitySeries.jsx";

function App() {
    return (
        <Routes>
            {/* Main routes */}
            <Route index element={<Home />} />
            
            {/* Geography routes */}
            <Route path="geography" element={<GeographyIndex />} />
            <Route path="geography/tectonics/2.4" element={<Tectonics_2_4 />} />
            {/* Add more geography routes here */}


            {/* Chemistry routes */}
            <Route path="chemistry" element={<ChemistryIndex />} />
            <Route path="chemistry/12" element={<ReactivitySeries />} />

        </Routes>
    );
}

export default App;
