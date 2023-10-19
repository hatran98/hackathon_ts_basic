import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
function Todolist() {
  const base_API = "http://localhost:3000/api/v1/todo";
  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState([]);
  const getTodo = () => {
    axios
      .get(`${base_API}`)
      .then((res) => setListTodo(res.data))
      .catch((err) => console.log(err));
  };
  const handleChange = (e: any) => {
    setTodo(e.target.value);
  };
  const AddTodo = () => {
    axios
      .post(`${base_API}`, { todo: todo })
      .then((res) => getTodo())
      .catch((err) => console.log(err));
  };
  const handleUpdate = (id: number) => {
    try {
      axios
        .put(`${base_API}/${id}`)
        .then((res) => getTodo())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id: number) => {
    try {
      axios
        .delete(`${base_API}/${id}`)
        .then((res) => getTodo())
        .catch((err) => console.log(err));
    } catch (error) {}
  };
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="bg-red-500 flex flex-col container m-auto w-[25%] shadow-2xl mt-[10%] text-white">
      <div className="border-b-2 mx-2">
        <h3 className="text-3xl">Todo List</h3>
        <p>Get things done , one item at a time</p>
      </div>
      {listTodo.length > 0 &&
        listTodo.map((todo: any) => (
          <div key={todo.id}>
            <div className="flex justify-between border shadow-xl py-2">
              <div
                className={
                  todo.completed == 1 ? `line-through mt-2 mx-2` : "mt-2 mx-2"
                }
              >
                {todo.todo}
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  className="mt-2 mx-2"
                  checked={todo.completed == 1}
                  onChange={() => handleUpdate(todo.id)}
                ></input>
                <button onClick={() => handleDelete(todo.id)}>
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          </div>
        ))}

      <div className="flex flex-col m-auto">
        <h3>Add to the todo list</h3>
        <div className="flex pb-4">
          <input type="text" className="py-2" onChange={handleChange}></input>
          <button className="bg-red-500 text-white border" onClick={AddTodo}>
            ADD ITEM
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
