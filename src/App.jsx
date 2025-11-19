import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HashPage from "./pages/Hash";
import TextHashPage from "./pages/TextHashPage";
import VerifyHashPage from "./pages/VerifyHashPage";
import FileHashPage from "./pages/FileHashPage";
import HashMultiplePage from "./pages/HashMultiplePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/hash/text" replace />} />
        <Route path="/hash" element={<HashPage />}>
          <Route path="text" element={<TextHashPage />} />
          <Route path="file" element={<FileHashPage />} />
          <Route path="verify" element={<VerifyHashPage />} />
          <Route path="text/multiple" element={<HashMultiplePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
