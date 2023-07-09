import "./App.css";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Todos from "./components/Todos";
import FormTodo from "./components/FormTodo";
import Exprise from "./components/Exprise";
import CompletedTodo from "./components/CompletedTodos";
import { formattedToday, formattedTodayTime } from "./formarDate";
import axios from "axios";

function App() {
    const [todo, setTodo] = useState("");

    const [todos, setTodos] = useState([]);

    const [timeDeadline, setTimeDeadline] = useState("");

    const [getTodoList, setGetTodoList] = useState(false);

    useEffect(() => {
        const getTodos = async () => {
            const res = await axios.get("http://localhost:4000/todos");
            const data = await res.data;
            setTodos(data ?? []);
        };
        getTodos();
    }, [getTodoList]);

    useEffect(() => {
        let timer = setInterval(() => {
            todos.forEach(async (item) => {
                console.log(item);
                if (
                    item.expirationDate.fullTime < new Date().getTime() &&
                    !item.isExprise &&
                    !item.isComplete
                ) {
                    await axios.patch(
                        `http://localhost:4000/todos/${item.id}`,
                        {
                            ...item,
                            isExprise: true,
                        }
                    );
                    console.log("ehehe");
                    setGetTodoList(!getTodoList);
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [getTodoList]);
    const inputRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (todo.length === 0 || timeDeadline == null) {
            return null;
        }

        const arr = timeDeadline.split(":");
        const fullTime = new Date();
        fullTime.setHours(arr[0]);
        fullTime.setMinutes(arr[1]);
        const indexEdit = todos.findIndex((item) => item.isEdit === true);

        if (indexEdit !== -1) {
            await axios.patch(
                `http://localhost:4000/todos/${todos[indexEdit].id}`,
                {
                    ...todos[indexEdit],
                    todo,
                    isEdit: false,
                    expirationDate: {
                        formattedTime: formattedTodayTime(
                            new Date(fullTime.getTime())
                        ),
                        fullTime: fullTime.getTime(),
                    },
                }
            );
        } else {
            const item = {
                id: uuidv4(),
                todo,
                isComplete: false,
                isEdit: false,
                createDateAt: formattedToday(new Date()),
                expirationDate: {
                    formattedTime: formattedTodayTime(
                        new Date(fullTime.getTime())
                    ),
                    fullTime: fullTime.getTime(),
                },
                isExprise: false,
            };

            await axios.post("http://localhost:4000/todos", item);
        }

        setTodo("");
        setGetTodoList(!getTodoList);
        setTimeDeadline("");
        inputRef.current.focus();
    };

    const toggleComplete = async (id) => {
        const indexComplete = todos.findIndex((item) => item.id === id);
        await axios.patch(`http://localhost:4000/todos/${id}`, {
            ...todos[indexComplete],
            isComplete: !todos[indexComplete].isComplete,
        });
        setGetTodoList(!getTodoList);
    };

    const handleEdit = async (id) => {
        const index = todos.findIndex((item) => item.id === id);
        await axios.patch(`http://localhost:4000/todos/${id}`, {
            ...todos[index],
            isEdit: true,
        });
        setTodo(todos[index].todo);
        setGetTodoList(!getTodoList);
        inputRef.current.focus();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/todos/${id}`);
        setGetTodoList(!getTodoList);
    };
    return (
        <div className="App max-w-screen mx-auto min-h-screen h-full p-20 bg-purple-700 text-white">
            <h1 className="text-3xl mb-4 text-center font-bold">Todos</h1>
            <div className="form-todos flex justify-center mb-5">
                <FormTodo
                    setTodo={setTodo}
                    handleSubmit={handleSubmit}
                    inputRef={inputRef}
                    todo={todo}
                    timeDeadline={timeDeadline}
                    setTimeDeadline={setTimeDeadline}
                />
            </div>
            <div className="list-todos grid grid-cols-3 gap-5">
                <Todos
                    todos={todos.filter(
                        (item) =>
                            item.isComplete !== true &&
                            item.expirationDate.fullTime >= new Date().getTime()
                    )}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    toggleComplete={toggleComplete}
                />
                <Exprise
                    todos={todos.filter((item) => item.isExprise)}
                    handleDelete={handleDelete}
                />
                <CompletedTodo
                    todos={todos.filter((item) => item.isComplete === true)}
                    handleDelete={handleDelete}
                    toggleComplete={toggleComplete}
                />
            </div>
        </div>
    );
}

export default App;
