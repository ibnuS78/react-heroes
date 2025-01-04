import { NavLink, Outlet } from "react-router-dom";
import Message from "./components/Message";

export default function App() {
  return (
    <>
      <h1 className="text-4xl text-slate-700 font-bold text-center">React Heroes</h1>
      <nav className="bg-slate-200 p-1 mt-2">
        <ul className="flex justify-center gap-4 my-3 text-2xl font-semibold uppercase">
          <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to='/heroes'>Heroes</NavLink>
          </li>
        </ul>

      </nav>
      <div className="container mx-auto mt-5 gap-6 flex justify-between">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <Message />
        </div>
      </div>
    </>
  );
}
