function FormTodo({ handleSubmit, setTodo, todo, inputRef }) {
    return (
        <form
            className="px-4 py-2 w-[450px] flex justify-between border-blue-400 border-2 mb-4 rounded-full"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className={`bg-transparent focus:outline-none text-[18px] flex-1 px-3 `}
                placeholder="Enter any todo"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                ref={inputRef}
            />
            <button className="bg-pink-400 rounded-full font-bold px-5 py-2">
                Submit
            </button>
        </form>
    );
}

export default FormTodo;
