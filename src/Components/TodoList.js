import Container from '@mui/material/Container';
import Card from "@mui/material/Card"; // Card
import Typography from "@mui/material/Typography"; // Card
import { CardContent,Divider } from '@mui/material'; // Card
import ToggleButton from "@mui/material/ToggleButton"; // Toggle
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from '@mui/material/Grid'; // Grid
import TextField from "@mui/material/TextField"; // Text Feild
import Button from "@mui/material/Button"; // Button
import Todo from "./Todo";  // Todo Component
import { useState, useEffect, useContext } from "react"; // useState, useEffect, useContext hook
import { v4 as uuidv4 } from "uuid";    // UUid Library
import { TodosContext } from '../Context/TodosContext'; // useContext hook

export default function TodoList () {

    const { todos, setTodos } = useContext(TodosContext);
    
    const [titleInput, setTitleInput] = useState('');

    function handleAddClick() {
        let newTodo = {id: uuidv4(), title: titleInput, Details: '', isCompleted: false};
        setTodos([...todos, newTodo]);
        localStorage.setItem("Todos", JSON.stringify([...todos, newTodo]));
        setTitleInput('');
    };

    useEffect(() => {
        let StorageTodos = JSON.parse(localStorage.getItem("Todos")) ?? [];
        setTodos(StorageTodos);
    }, []);
    
    
    // Filter the Todos
    const [displayedTodosType, setDisplayedTodosType] = useState('all');
    
    function changeDisplyedType (e) { setDisplayedTodosType(e.target.value) }

    const completedTodos = todos.filter((t) =>  t.isCompleted );
    
    const notCompletedTodos = todos.filter((t) =>  !t.isCompleted );
    
    let todosToShow = todos;

    if (displayedTodosType === "Completed") { todosToShow = completedTodos; }
    else if (displayedTodosType === "non-Completed") { todosToShow = notCompletedTodos; } 
    else { todosToShow = todos; }
    
    const todosJsx = todosToShow.map((t) => <Todo key={todos.id} todo={t} />);


    return (
        <>
        <Container maxWidth="sm" >
            <Card sx={{ minWidth: 275}} style={{maxHeight: '80vh',overflow: 'scroll'}}>
                <CardContent>
                    {/* Heading */}
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} variant='h3'>مهامي</Typography>
                    <Divider />
                    {/* Toogle */}
                    <ToggleButtonGroup value={displayedTodosType} onChange={changeDisplyedType} className='allToggle' color="primary" aria-label="Platform" >
                        <ToggleButton value="all">الكل</ToggleButton>
                        <ToggleButton value="Completed">منجز</ToggleButton>
                        <ToggleButton value="non-Completed">غير منجز</ToggleButton>
                    </ToggleButtonGroup>
                    {/* All Todos Component */}
                    {todosJsx}
                    
                    {/* Input */}
                    <Grid container style={{marginTop: '20px'}}>
                        <Grid xs={8}  display='flex' justifyContent='space-around' alignItems='center'>
                            
                            <TextField value={titleInput} onChange={(e) => setTitleInput(e.target.value)}  error id="outlined-error" label="إضافة مهمه" defaultValue="Hello World"  style={{width: '100%', marginLeft: '10px'}}/>
                        
                        </Grid>
                        <Grid xs={4}  display='flex' justifyContent='space-around' alignItems='center'>
                            
                            <Button onClick={handleAddClick} disabled={titleInput === ''} variant="contained" style={{width: '100%', height: '100%'}}>إضافه</Button>
                            
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        </Container>
        </>
    )
};


