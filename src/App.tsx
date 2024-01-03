// Importations 
import { Routes, Route, useLocation } from "react-router-dom";

import LayoutContent from "./components/Layout";
import { SignIn } from "./components/FormSignIn";
import { SignUp } from "./components/FormSignUp";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";



// Main application component
export default function App() {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>

      {currentPath != "/" && currentPath != "/signup" && currentPath != "/signin" && <Header />}

      <Routes>

        <Route path="/" element={<LayoutContent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      
      <footer 
          style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              height: "40px",   /* Height of the footer */
              display:'flex',
              justifyContent:'center'
          }}>
          <h4>Copyright © Abdourahmane Diallo</h4>
      </footer>
      
    </>
  );
}
