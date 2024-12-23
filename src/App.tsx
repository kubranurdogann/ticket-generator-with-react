import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Home from "./pages/home";
import NotFoundPage from "./pages/notfoundpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

