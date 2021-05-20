import "./App.css";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Register from "./Components/Register";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import SearchForm from "./Components/SearchForm";
import OpenTask from "./Components/OpenTask";
import SortForm from "./Components/SortForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import AppReducer from "./Reducer/AppReducer";
import axios from "axios";
import Pagination from "./Components/Pagination";

const getIndex = (tasks, id) => {
  let i = -1;
  tasks.forEach((task, index) => {
    if (task._id === id) {
      i = index;
    }
  });
  return i;
};
function App() {
  const initialState = { user: null, tasks: [], total: 0 };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [updateTask, setUpdateTask] = useState({
    _id: "",
    task: "",
    status: false,
  });
  const defautData = useRef(state.tasks);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
  });
  const closeForm = () => {
    setOpenTaskForm(false);
  };
  const toggleTaskForm = () => {
    setOpenTaskForm(!openTaskForm);
  };
  const setOpenForm = () => {
    toggleTaskForm();
    setUpdateTask({ _id: "", task: "", status: false });
  };

  const userName = (name) => {
    dispatch({ type: "CURRENT_USER", payload: name });
    getTasks();
  };

  const signOut = () => {
    dispatch({ type: "CURRENT_USER", payload: null });
    setPagination({ ...pagination, page: 1 });
  };

  useEffect(
    useCallback(async () => {
      try {
        const token = localStorage.getItem("token");
        const option = {
          method: "get",
          url: "/api/v1/auth",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios(option);
        const { userName } = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: userName });
      } catch (error) {
        console.log(error);
      }
    }, [dispatch]),
    []
  );
  const getTasks = useCallback(async () => {
    const option = {
      method: "get",
      // url: `/api/v1/task`,
      url: `/api/v1/task?page=${pagination.page}&limit=${pagination.limit}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios(option);
    const taskList = response.data.data;
    dispatch({ type: "GET_USER_TASKS", payload: taskList });
    dispatch({ type: "TOTAL_TASK", payload: response.data.length });
    console.log(taskList);
  });

  useEffect(() => {
    getTasks();
  }, [pagination.page]);

  const updateStatus = async (id) => {
    try {
      const index = getIndex(state.tasks, id);
      const { status } = state.tasks[index];
      const option = {
        method: "put",
        url: `/api/v1/task/${id}`,
        data: {
          status: !status,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios(option);
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...state.tasks[index], status: !status },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateTask = (id) => {
    const index = getIndex(state.tasks, id);
    const task = state.tasks[index];
    setUpdateTask({ _id: task._id, task: task.task, status: task.status });
    id === updateTask._id ? toggleTaskForm() : setOpenTaskForm(true);
  };

  const onSetData = async (data) => {
    const { _id, task, status } = data;
    if (_id === "") {
      try {
        const option = {
          method: "post",
          url: "/api/v1/task",
          data: { task: task, status: status },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const response = await axios(option);
        const { _id } = response.data.data;
        const newTask = [...state.tasks];
        newTask.unshift({ _id, task, status });
        if (state.total >= pagination.limit) {
          newTask.pop();
        }
        dispatch({ type: "GET_USER_TASKS", payload: newTask });
        dispatch({ type: "TOTAL_TASK", payload: state.total + 1 });
        setPagination({ ...pagination, page: 1 });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const cvStatus = status === "true" ? true : false;
        const option = {
          method: "put",
          url: `/api/v1/task/${_id}`,
          data: { task: task, status: cvStatus },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        await axios(option);
        const index = getIndex(state.tasks, _id);
        dispatch({
          type: "UPDATE_TASK",
          payload: { ...state.tasks[index], status: cvStatus, task: task },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onDeleteTask = async (id) => {
    try {
      // const index = getIndex(state.tasks, id);
      // const task = state.tasks[index];
      const option = {
        method: "delete",
        url: `/api/v1/task/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios(option);
      dispatch({ type: "DELETE_TASK", payload: { _id: id } });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchData = (value) => {
    defautData.current = state.tasks;
    if (value !== "") {
      const element = defautData.current.filter((task) => {
        return task.task.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      dispatch({ type: "GET_USER_TASKS", payload: element });
    } else {
      dispatch({ type: "GET_USER_TASKS", payload: defautData.current });
    }
  };

  const onSortData = (status) => {
    defautData.current = state.tasks;
    if (status) {
      const element = defautData.current.sort((task1, task2) => {
        return task1.task > task2.task ? 1 : -1;
      });
      dispatch({ type: "GET_USER_TASKS", payload: element });
    } else {
      const element = defautData.current.sort((task1, task2) => {
        return task1.task > task2.task ? -1 : 1;
      });
      dispatch({ type: "GET_USER_TASKS", payload: element });
    }
  };
  const getPagination = (pagi) => {
    console.log(pagi);
    setPagination({ ...pagination, page: pagi.page });
  };
  return (
    <Router>
      {state.user ? <Header name={state.user} setSignOut={signOut} /> : ""}
      <Switch>
        <Route exact path="/">
          <Login getName={userName} />
        </Route>
        <Route exact path="/register">
          <Register getName={userName} />
        </Route>
        <Route exact path="/home">
          <div className="header">
            <div className="container">
              <h1 className="title">Quản lí công việc</h1>
            </div>
          </div>
          <div className="content">
            <div className="container">
              {openTaskForm ? (
                <TaskForm
                  closeForm={closeForm}
                  taskUpdate={updateTask}
                  setData={onSetData}
                />
              ) : (
                ""
              )}
              <div
                className={openTaskForm ? "task-list" : "task-list with-100"}
              >
                <OpenTask
                  openTaskForm={setOpenForm}
                  openStatus={openTaskForm}
                />
                <div className="form-search">
                  <SearchForm searchData={onSearchData} />
                  <SortForm sortData={onSortData} />
                </div>
                <TaskList
                  tasks={state.tasks}
                  updateStatus={updateStatus}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
                <Pagination
                  total_task={state.total}
                  pagination={pagination}
                  getPagination={getPagination}
                />
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="*">
          <div>Route not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
