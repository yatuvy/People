import { BrowserRouter, Routes, Route } from "react-router-dom";
import People from "./pages/People";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {PeopleProvider} from "./context/PeopleContext";

function App() {
  return (
    <PeopleProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </PeopleProvider>
  );
}

export default App;
