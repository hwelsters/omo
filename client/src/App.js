import Home from "./Pages/Home/Home";
import SinglePost from "./Pages/SinglePost/SinglePost";
import WritePost from "./Pages/WritePost/WritePost";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import TopBar from "./Components/TopBar/TopBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <WritePost /> : <Register />} />

        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
