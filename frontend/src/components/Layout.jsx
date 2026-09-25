import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="app">

      {/* Top Header */}
      <header className="topbar">

        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>Track&Organize</span>
        </div>

        <div className="topbar-right">

          <button className="icon-button">
            ♧
          </button>

          <div className="profile">
            <div className="avatar">T</div>
            <span>Tanuja</span>
            <span className="chevron">⌄</span>
          </div>

        </div>

      </header>

      {/* Sidebar + Page Content */}
      <div className="main-layout">

        <Sidebar />

        <main className="content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;