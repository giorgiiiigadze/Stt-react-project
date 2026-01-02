import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./helper/ProtectedRoute";

import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserProvider } from "./contexts/UserContext";
import { AudioProvider } from "./contexts/AudioContext";
import { ToastProvider } from "./contexts/MessageContext";
import { CompletedUserProvider } from "./contexts/CompletedUserContext";
import { DisplayProvider } from "./contexts/DisplayContext";

import Home from "./pages/Home";
import AudioDetails from "./pages/AudioDetails";
import AudioUpload from "./pages/AudioUpload";
import RecordAudioPage from "./pages/RecordAudio";
import Login from "./pages/registration/Login";
import Register from "./pages/registration/Register";
import NotFound from "./pages/NotFound";

function Layout() {
  const location = useLocation();

  const noSidebarRoutes = ["/login", "/register", "/record_audio"];

  const hideSidebar =
    noSidebarRoutes.includes(location.pathname);

  return (
    <div className="main_container" style={{ display: "flex", minHeight: "100vh" }}>
      {!hideSidebar && <Sidebar />}

      <div style={{ flex: 1, width: "100%" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/audio/:id"
            element={
              <ProtectedRoute>
                <AudioDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/audio_upload"
            element={
              <ProtectedRoute>
                <AudioUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/record_audio"
            element={
              <ProtectedRoute>
                <RecordAudioPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CompletedUserProvider>
          <DisplayProvider>
            <AudioProvider>
              <ToastProvider>
                <SidebarProvider>
                    <Layout />
                </SidebarProvider>
              </ToastProvider>
            </AudioProvider>
          </DisplayProvider>
        </CompletedUserProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
