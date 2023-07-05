import "./App.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Todos from "./components/Todos";
import FormTodo from "./components/FormTodo";
function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const inputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();

        const indexEdit = todos.findIndex((item) => item.isEdit === true);
        console.log(indexEdit);
        if (indexEdit !== -1) {
            setTodos(
                todos.map((item, index) =>
                    index === indexEdit
                        ? { ...item, todo, isEdit: false }
                        : item
                )
            );
        } else {
            setTodos([
                ...todos,
                { id: uuidv4(), todo, isComplete: false, isEdit: false },
            ]);
        }

        setTodo("");
        inputRef.current.focus();
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((item) => {
                return item.id === id
                    ? { ...item, isComplete: !item.isComplete }
                    : item;
            })
        );
    };

    const handleEdit = (id) => {
        const index = todos.findIndex((item) => item.id === id);
        todos[index].isEdit = true;
        inputRef.current.value = todos[index].todo;
        inputRef.current.focus();
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
    };
    return (
        <div className="App w-screen mx-auto min-h-screen h-full p-20 bg-purple-600 text-white">
            <h1 className="text-3xl mb-4 text-center font-bold">Todos</h1>
            <div className="form-todos flex justify-center ">
                <FormTodo
                    setTodo={setTodo}
                    handleSubmit={handleSubmit}
                    inputRef={inputRef}
                    todo={todo}
                />
            </div>
            <Todos
                todos={todos}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                toggleComplete={toggleComplete}
            />
        </div>
    );
}

export default App;
