import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserProvider } from "./contexts/UserContext";
import { TableProvider } from "./contexts/AudioTableContext";
import { AudioProvider } from "./contexts/AudioContext";
import { ToastProvider } from "./contexts/MessageContext";

import Home from "./pages/Home";
import Audios from "./pages/Audios";
import AudioDetails from "./pages/AudioDetails";
import AudioUpload from "./pages/AudioUpload";
import Login from "./pages/registration/Login";
import Register from "./pages/registration/Register";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AudioProvider>
          <ToastProvider>
            <SidebarProvider>
              <TableProvider>
                <div className="main_container" style={{ display: "flex", minHeight: "100vh" }}>
                  
                  <Sidebar />

                  <div style={{ flex: 1, width: "100%" }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/audios" element={<Audios />} />
                      <Route path="/audios/:id" element={<AudioDetails />} />
                      <Route path="/audio_upload" element={<AudioUpload />} />

                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>

                </div>                
              </TableProvider>
            
            </SidebarProvider>            
          </ToastProvider>
           
        </AudioProvider>
     
      </UserProvider>

    </BrowserRouter>
  );
}
