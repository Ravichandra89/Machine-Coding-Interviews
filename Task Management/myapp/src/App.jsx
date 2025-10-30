import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddTask } from "./pages/AddTask";
import { TaskList } from "./pages/TaskList";
import { ContextProvider } from "./reducer/TaskReducer";

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
