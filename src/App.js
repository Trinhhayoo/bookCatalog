import { Route, Routes } from "react-router-dom";
import "./App.css";

import RootLayout from "./layouts/RootLayout";
import ProductLayout from "./layouts/ProductLayout";


import Home from "./pages/home/Home";

import PageNotFound from "./pages/pageNotFound/PageNotFound";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<ProductLayout />}>
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
