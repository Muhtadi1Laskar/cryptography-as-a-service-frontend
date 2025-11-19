import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HashPage from "./pages/Hash";
import TextHashPage from "./pages/HashPages/TextHashPage";
import VerifyHashPage from "./pages/HashPages/VerifyHashPage";
import FileHashPage from "./pages/HashPages/FileHashPage";
import HashMultiplePage from "./pages/HashPages/HashMultiplePage";
import AesPage from "./pages/Aes";
import AesEncryptDecryptPage from "./pages/AesPages/AesEncryptDecryptPage";

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
        <Route path="/aes" element={<AesPage />}>
          <Route path="encrypt-decrypt" element={<AesEncryptDecryptPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
