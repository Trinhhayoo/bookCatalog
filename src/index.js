import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import BooksProvider, { BooksContext } from "./contexts/BooksProvider";

import { Toaster } from "react-hot-toast";


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <BooksProvider>
            <App />
            <Toaster position="top-right" reverseOrder={false} />
        </BooksProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export { BooksContext};

