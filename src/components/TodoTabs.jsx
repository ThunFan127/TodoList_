export default function TodoTabs({ currentTab, setCurrentTab }) {
  return (
    <div className="tabs">
      <button
        className={currentTab === "all" ? "active" : ""}
        onClick={() => setCurrentTab("all")}
        type="button"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          marginRight: 32,
          fontSize: 13,
          fontWeight: 500,
          color: currentTab === "all" ? "#26b6d4" : "#888",
          cursor: "pointer",
        }}
      >
        TẤT CẢ
      </button>
      <button
        className={currentTab === "completed" ? "active" : ""}
        onClick={() => setCurrentTab("completed")}
        type="button"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          marginRight: 32,
          fontSize: 13,
          fontWeight: 500,
          color: currentTab === "completed" ? "#26b6d4" : "#888",
          cursor: "pointer",
        }}
      >
        ĐÃ HOÀN THÀNH
      </button>
      <button
        className={currentTab === "uncompleted" ? "active" : ""}
        onClick={() => setCurrentTab("uncompleted")}
        type="button"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: 13,
          fontWeight: 500,
          color: currentTab === "uncompleted" ? "#26b6d4" : "#888",
          cursor: "pointer",
        }}
      >
        CHƯA HOÀN THÀNH
      </button>
    </div>
  );
}
