function Todos({ todos, toggleComplete, handleEdit, handleDelete }) {
    return (
        <div className="list-todos w-[450px] flex flex-col mx-auto items-start gap-y-2">
            {todos.length > 0 ? (
                todos.map((item) => (
                    <li
                        key={item.id}
                        className={`flex justify-between  items-center w-full text-2xl cursor-pointer gap-3 ${
                            item.isComplete ? "active" : ""
                        }`}
                    >
                        <p
                            className={`font-bold w-[70%] break-words`}
                            onClick={() => toggleComplete(item.id)}
                        >
                            {item.todo}
                        </p>
                        <div className="icon">
                            <i
                                className="fa-solid fa-pen-to-square edit-icon mr-5 cursor-pointer"
                                onClick={() => handleEdit(item.id)}
                            ></i>
                            <i
                                className="fa-solid fa-trash delete-icon cursor-pointer"
                                onClick={() => handleDelete(item.id)}
                            ></i>
                        </div>
                    </li>
                ))
            ) : (
                <h2 className="text-3xl mx-auto text-pink-300 font-bold">
                    Not Todos
                </h2>
            )}
        </div>
    );
}

export default Todos;
