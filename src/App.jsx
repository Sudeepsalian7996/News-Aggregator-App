import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Redirect root path "/" to "/home" */}
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Home page route */}
      <Route path="/home" element={<HomePage />} />
      {/* Not found page route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
