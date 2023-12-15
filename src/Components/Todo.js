import Card from '@mui/material/Card'; // Card
import CardContent from '@mui/material/CardContent'; // Card
import Typography from '@mui/material/Typography'; // Card
import Grid from '@mui/material/Grid'; // Grid
import IconButton from "@mui/material/IconButton"; // Icon
import CheckIcon from "@mui/icons-material/Check"; // Icon
import EditIcon from "@mui/icons-material/Edit"; // Icon
import DeleteIcon from "@mui/icons-material/Delete"; // Icon
import { useContext } from "react"; // useContext hook
import { TodosContext } from "../Context/TodosContext"; // useContext hook
import Button from "@mui/material/Button"; // Dialog
import Dialog from "@mui/material/Dialog"; // Dialog
import DialogActions from "@mui/material/DialogActions"; // Dialog
import DialogContent from "@mui/material/DialogContent"; // Dialog
import DialogContentText from "@mui/material/DialogContentText"; // Dialog
import DialogTitle from "@mui/material/DialogTitle"; // Dialog
import { useState } from 'react'; // useState hook
import TextField from "@mui/material/TextField"; // Update Dialog

export default function Todo({todo}) {
    
    const { todos, setTodos } = useContext(TodosContext);
    
    function handleCheckClick () {
        let updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {t.isCompleted = !t.isCompleted}
            return t;
        });
            
        setTodos(updatedTodos);
        localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    }


    // Delete Dialog Logic
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    function handleDeleteClick () { setShowDeleteDialog(true); }

    function handleDeleteDialogClose () { setShowDeleteDialog(false); }
    
    function handleDeleteConfirm () {
        let newTodo = todos.filter((t) => t.id !== todo.id);
        setTodos(newTodo);
        localStorage.setItem("Todos", JSON.stringify(newTodo));
        setShowDeleteDialog(false);
    }
    

    // Update Dialog Logic
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [UpdateTodo, setUpdateTodo] = useState({title: todo.title, Details: todo.Details});
    
    function handleUpdateClick() { setShowUpdateDialog(true); }

    function handleUpdateClose() { setShowUpdateDialog(false); }

    function handleUpdateConfirm() {
        let updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return {...t, title: UpdateTodo.title, Details: UpdateTodo.Details}
            } else { return t; }
        });
        setTodos(updatedTodos);
        localStorage.setItem("Todos", JSON.stringify(updatedTodos));
        setShowUpdateDialog(false);
    }


    return (
        <>
        {/* __ Delete Dialog __ */}
        <Dialog open={showDeleteDialog} onClose={handleDeleteDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">هل أنت متأكد من حذف المهمه ؟ </DialogTitle>
            
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{direction: 'rtl'}}>لا يمكنك التراجع عن الحذف بعد إتمامه</DialogContentText>
            </DialogContent>

            <DialogActions style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={handleDeleteDialogClose} > إلغاء </Button>
                <Button onClick={handleDeleteConfirm} > تأكيد الحذف </Button>
            </DialogActions>
        </Dialog>
        
        {/* __ Update Dialog __ */}
        <Dialog open={showUpdateDialog} onClose={handleUpdateClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}} > تعديل المهمه </DialogTitle>
            
            <DialogContent>
                <TextField value={UpdateTodo.title} onChange={(e)=> setUpdateTodo({...UpdateTodo, title: e.target.value})}  label="عنوان المهمه" type="text" fullWidth variant="standard" style={{direction: 'rtl'}} autoFocus margin="dense" id="name"  />
                <TextField value={UpdateTodo.Details} onChange={(e) => setUpdateTodo({...UpdateTodo, Details: e.target.value})}  label="التفاصيل" type="text" fullWidth variant="standard" style={{direction: 'rtl'}} autoFocus margin="dense" id="name"  />
            </DialogContent>

            <DialogActions style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={handleUpdateClose} > إلغاء </Button>
                <Button onClick={handleUpdateConfirm} > تأكيد </Button>
            </DialogActions>
        </Dialog>

            {/* __ Card __ */}
        <Card sx={{ minWidth: 275}} className='todoCard'>
            <CardContent>
                <Grid container spacing={2} style={{ margin: '0px auto' }}>
                    <Grid xs={8}>
                        <Typography variant='h5' style={{overflow: 'hidden', textDecoration: todo.isCompleted ? 'line-through' : 'none'}}> {todo.title} </Typography>
                        <Typography variant='h6' style={{overflow: 'hidden'}}> {todo.Details} </Typography>
                    </Grid>
                    <Grid xs={4} display='flex' justifyContent='space-around' alignItems='center'>

                        {/* Chick Icon Button */}
                        <IconButton onClick={handleCheckClick} aria-label="check" className='iconButton' style={{ background: todo.isCompleted === true ? '#8bc34a' : '#fff', color: todo.isCompleted === true ? '#fff' : '#8bc34a', border: '3px solid #8bc34a' }}>
                            <CheckIcon />
                        </IconButton>

                        {/* Edit Icon Button */}
                        <IconButton value={showUpdateDialog}  onClick={ () => handleUpdateClick() } aria-label="edite" className='iconButton' style={{background: '#fff', color: '#1769aa', border: '3px solid #1769aa'}}>
                            <EditIcon />
                        </IconButton>

                        {/* Delete Icon Button */}
                        <IconButton value={showDeleteDialog} onClick={ () => handleDeleteClick() } aria-label="delete" className='iconButton' style={{background: '#fff', color: '#b23c17', border: '3px solid #b23c17'}}>
                            <DeleteIcon />
                        </IconButton>
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </>
    );
}


        