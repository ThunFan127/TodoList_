import { NavLink } from "react-router-dom";

export default function TodoTabs() {
  return (
    <div className="tabs">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        TẤT CẢ
      </NavLink>
      <NavLink
        to="/completed"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        ĐÃ HOÀN THÀNH
      </NavLink>
      <NavLink
        to="/uncompleted"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        CHƯA HOÀN THÀNH
      </NavLink>
    </div>
  );
}
