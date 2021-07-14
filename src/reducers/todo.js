import update from "immutability-helper";
const todoFromLocalStorage = localStorage.getItem("todos");
const todosJson = JSON.parse(todoFromLocalStorage);
const initialState = {
  todos: todosJson
    ? todosJson
    : [
        {
          id: 1,
          name: "Todo One",
        },
        {
          id: 2,
          name: "Todo Two",
        },
        {
          id: 3,
          name: "Todo One three",
        },
      ],
  isCreateTodo: false,
  formDatas: {
    id: Math.random(),
    name: null,
  },
  isEditMode: false,
  rowId: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_CREATE_TODO": {
      return update(state, {
        isCreateTodo: { $set: !state.isCreateTodo },
      });
    }
    case "CREATE_TODO":
      const newTodo = update(state, {
        todos: { $push: [state.formDatas] },
        isCreateTodo: { $set: false },
      });
      return newTodo;
    case "UPDATE_TODO":
      const updateIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const updateTodo = update(state, {
        todos: {
          [updateIndex]: { $merge: action.payload },
        },
        isEditMode: { $set: false },
        rowId: { $set: null },
      });
      return updateTodo;
    case "DELETE_TODO":
      const delIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const deleteTodo = update(state, {
        todos: { $splice: [[delIndex, 1]] },
      });
      return deleteTodo;
    case "SET_EDIT_MODE": {
      const isValid = action.payload === state.rowId;
      return update(state, {
        isEditMode: { $set: !isValid },
        rowId: { $set: action.payload },
      });
    }
    case "SET_ROW_ID": {
      return update(state, {
        rowId: { $set: action.payload },
      });
    }
    case "SET_FORM_DATA": {
      return update(state, {
        formDatas: { $merge: action.payload },
        rowId: { $set: null },
      });
    }
    default:
      return state;
  }
};

export default todoReducer;
