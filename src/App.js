import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import View from "./components/student/View";
import Edit from "./components/student/Edit";


function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route path="/view/:id" element={<View/>}></Route>
      <Route path="/edit/:id" element={<Edit/>}></Route>
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
