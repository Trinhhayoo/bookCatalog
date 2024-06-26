import { Route, Routes } from "react-router-dom";
import "./App.css";

import RootLayout from "./layouts/RootLayout";
import ProductLayout from "./layouts/ProductLayout";

import AddBook from "../src/pages/addBook/AddBook.js";
import Home from "./pages/home/Home";

import PageNotFound from "./pages/pageNotFound/PageNotFound";
import EditBook from "./pages/editBook/EditBook";

function App() {
  return (
    <>
        <Routes>
        <Route path="/" element={<RootLayout />}>    
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/editBook" element={<EditBook />} />
     
          <Route path="" element={<ProductLayout />}>
            <Route index element={<Home />} />
            <Route path=":category" element={<Home />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
