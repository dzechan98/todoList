import { useRef } from "react";

function FormTodo({
    handleSubmit,
    setTodo,
    todo,
    inputRef,
    timeDeadline,
    setTimeDeadline,
}) {
    const timeRef = useRef();
    const handleChangeTime = (e) => {
        let currentTime = new Date();
        const arr = timeRef.current.value.split(":");
        let selectedTime = new Date();
        selectedTime.setHours(arr[0]);
        selectedTime.setMinutes(arr[1]);
        if (selectedTime <= currentTime) {
            alert("Thời gian phải lớn hơn thời điểm hiện tại!");
            timeRef.current.value = ""; // Xóa giá trị không hợp lệ
        } else setTimeDeadline(e);
    };

    return (
        <form
            className="px-4 py-2 w-[450px] flex flex-col justify-between border-blue-400 border-2 rounded-lg mb-4"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col mb-2">
                <label
                    htmlFor="todo-input"
                    className="text-pink-400 font-bold text-[18px] mb-1"
                >
                    Todo
                </label>
                <input
                    id="todo-input"
                    type="text"
                    className={`bg-transparent border-2 border-pink-400 focus:outline-none text-[18px] flex-1 px-3 py-2 `}
                    placeholder="Enter any todo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    ref={inputRef}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="time-input"
                    className="text-pink-400 font-bold text-[18px] mb-1"
                >
                    Chọn thời gian hoàn thành
                </label>
                <input
                    id="time-input"
                    type="time"
                    ref={timeRef}
                    value={timeDeadline}
                    className="text-black w-[120px] focus:outline-none"
                    onChange={(e) => handleChangeTime(e.target.value)}
                />
            </div>
            <button className="bg-pink-400 rounded-full font-bold px-5 py-2 w-[150px]">
                Submit
            </button>
        </form>
    );
}

export default FormTodo;
