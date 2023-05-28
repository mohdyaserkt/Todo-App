import { useState } from "react";
import "./App.css";
import { tododata } from "./models/todolist";

function App() {
  const [todos, settodos] = useState<tododata[]>([]);
  const [todo, settodo] = useState("");

  return (
    <>
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>
            Whoop, it's
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            🌝 ☕{" "}
          </h2>
          Rect tutorialRect tutorial Rect tutorial
        </div>
        <div className="input">
          <input
            value={todo}
            onChange={(e) => settodo(e.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
          />
          <i
            onClick={() =>
              settodos([
                ...todos,
                { id: Date.now(), todo: todo, status: false, date: new Date() },
              ])
            }
            className="fas fa-plus"
          ></i>
        </div>
        {todos.map((value, index) => {
          return (
            <div className="todos">
              <div className="todo" key={index}>
                <div className="left">
                  <input
                    onChange={(e) => {
                      settodos(
                        todos.filter((obj) => {
                          if (obj.id === value.id) {
                            obj.status = e.target.checked;
                          }
                          return obj;
                        })
                      );
                    }}
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <p style={{ textDecoration: value.status ? 'line-through' : 'none' }}>{value.todo}</p>
                </div>
                <div className="right">
                  <i
                    onClick={() => {
                      settodos(
                        todos.filter((dltobj) => {
                          if (dltobj.id != value.id) {
                            return dltobj;
                          }
                        })
                      );
                    }}
                    className="fas fa-times"
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
