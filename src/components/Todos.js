function Todos({ todos, toggleComplete, handleEdit, handleDelete }) {
    return (
        <div className="">
            <h2 className="text-center font-bold text-2xl text-red-400 mb-2">
                Việc chưa làm
            </h2>
            <div className="flex flex-col border-2 border-red-400  rounded-lg min-h-[400px] p-5 ">
                {todos.length > 0 ? (
                    todos.map((item) => (
                        <li
                            key={item.id}
                            className={`flex justify-between  items-center w-full text-2xl cursor-pointer gap-3 ${
                                item.isComplete ? "active" : ""
                            }`}
                        >
                            <div className="font-bold w-[70%] break-words text-[20px]">
                                <p>{item.todo}</p>
                                <p className="text-[14px] text-slate-800">
                                    Hết hạn vào lúc{" "}
                                    {item.expirationDate.formattedTime}
                                </p>
                            </div>
                            <div className="icon text-[18px]">
                                <i
                                    className="fa-solid fa-check mr-3 cursor-pointer "
                                    onClick={() => toggleComplete(item.id)}
                                ></i>
                                <i
                                    className="fa-solid fa-pen-to-square edit-icon mr-3 cursor-pointer"
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
                        Đang trống
                    </h2>
                )}
            </div>
        </div>
    );
}

export default Todos;
