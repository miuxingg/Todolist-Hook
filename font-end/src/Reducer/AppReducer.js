export default function reducer(state, action) {
  switch (action.type) {
    case "GET_USER_TASKS":
      return { ...state, tasks: action.payload };
    case "CURRENT_USER":
      return { ...state, user: action.payload };
    case "CREATE_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload._id),
      };
    case "TOTAL_TASK":
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
  }
}
