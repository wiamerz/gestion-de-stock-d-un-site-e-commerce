import React from "react";
import Footer from "./components/Footer";  
import AdminPage from "./components/AdminPage"; 


const App = () => {

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden`}>
            <>
               <AdminPage />
              <Footer />
            </>

    </div>
  );
};

export default App;
