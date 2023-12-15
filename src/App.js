import './App.css'
import TodoList from './Components/TodoList';
import { createTheme, ThemeProvider} from "@mui/material/styles";
import { TodosContext } from './Context/TodosContext';  // TodosContext
import { useState } from 'react'; // useState hook
import { v4 as uuidv4 } from "uuid";  // UUid Library

const theme = createTheme({
  typography: {  fontFamily: ["Alex"]  },
  palette: {  primary: {main: "#ba000d"}  }
});

const initialTodos = [{id: uuidv4(), title: "عنوان المهمه", Details: "تفاصيل المهمه", isCompleted: false}];

function App () {
  const [todos, setTodos] = useState(initialTodos);
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        
        <TodosContext.Provider value={{todos, setTodos}}>
          <TodoList />
        </TodosContext.Provider>

      </div>
    </ThemeProvider>
  );
}
export default App;
