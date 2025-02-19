import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";  


const App = () => {

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden`}>
            <>
            <input type='file' />
            <Button onClick={onUploadImage}>
            image
            </Button>
              <Header />
               
              <Footer />
            </>

    </div>
  );
};

export default App;
