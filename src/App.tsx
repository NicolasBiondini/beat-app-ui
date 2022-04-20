import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import PersistSignIn from "./components/PersistSignIn";
import MainDashboard from "./pages/MainDashboard";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        {/**Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/**Private routes */}
        <Route element={<PersistSignIn />}>
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<MainDashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/** Rest pages */}
        <Route path="*" element={<h1>f</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
