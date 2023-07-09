function CompletedTodo({ todos, handleDelete, toggleComplete }) {
    return (
        <div className="">
            <h2 className="text-center font-bold text-2xl text-green-400 mb-2">
                Việc đã làm xong
            </h2>
            <div className="flex flex-col border-2 border-green-400  rounded-lg min-h-[400px] p-5">
                {todos.length > 0 ? (
                    todos.map((item) => (
                        <li
                            key={item.id}
                            className={`flex justify-between  items-center w-full text-2xl cursor-pointer gap-3 ${
                                item.isComplete ? "active" : ""
                            }`}
                        >
                            <p className={`font-bold w-[70%] break-words`}>
                                {item.todo}
                            </p>
                            <div className="icon text-[18px]">
                                <i
                                    className="fa-solid fa-rotate-left mr-3 cursor-pointer"
                                    onClick={() => toggleComplete(item.id)}
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
                        Đang trống
                    </h2>
                )}
            </div>
        </div>
    );
}

export default CompletedTodo;
