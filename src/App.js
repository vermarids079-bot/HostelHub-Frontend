import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Profile from "./pages/Profile";
import RoomHub from "./pages/RoomHub";
import MyBooking from "./pages/MyBooking";
import CareDesk from "./pages/CareDesk";
import LeaveEase from "./pages/LeaveEase";

import StudentSphere from "./pages/StudentSphere";
import RoomMatrix from "./pages/RoomMatrix";
import ResolutionCenter from "./pages/ResolutionCenter";
import LeaveApprovalCenter from "./pages/LeaveApprovalCenter";
import AnalyticsCenter from "./pages/AnalyticsCenter";
import AddRoom from "./pages/AddRoom";
import BookingRequests from "./pages/BookingRequests";

import NoticeBoard from "./pages/NoticeBoard";
import NoticeManagement from "./pages/NoticeManagement";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Student */}

        <Route
          path="/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/rooms"
          element={<RoomHub />}
        />

        <Route
          path="/mybooking"
          element={<MyBooking />}
        />

        <Route
          path="/complaints"
          element={<CareDesk />}
        />

        <Route
          path="/leave"
          element={<LeaveEase />}
        />

        <Route
          path="/notices"
          element={<NoticeBoard />}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/students"
          element={<StudentSphere />}
        />

        <Route
          path="/roommatrix"
          element={<RoomMatrix />}
        />

        <Route
          path="/add-room"
          element={<AddRoom />}
        />

        <Route
          path="/bookingrequests"
          element={<BookingRequests />}
        />

        <Route
          path="/resolutioncenter"
          element={<ResolutionCenter />}
        />

        <Route
          path="/leaveapproval"
          element={<LeaveApprovalCenter />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsCenter />}
        />

        <Route
          path="/notice-management"
          element={<NoticeManagement />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;