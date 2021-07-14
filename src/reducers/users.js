import update from "immutability-helper";
const userFromLocalStorage = localStorage.getItem("users");
const usersJson = JSON.parse(userFromLocalStorage);
const initialState = {
  users: usersJson
    ? usersJson
    : [
        {
          id: 1,
          name: "John Brown",
        },
        {
          id: 2,
          name: "Jim Green",
        },
        {
          id: 3,
          name: "Joe Black",
        },
      ],
  isCreateUser: false,
  formDatas: {
    id: Math.random(),
    name: null,
  },
  isEditMode: false,
  rowId: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_CREATE_USER": {
      return update(state, {
        isCreateUser: { $set: !state.isCreateUser },
      });
    }
    case "CREATE_USER":
      const newUser = update(state, {
        users: { $push: [state.formDatas] },
        isCreateUser: { $set: false },
      });
      return newUser;
    case "UPDATE_USER":
      const updateIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      const updateUser = update(state, {
        users: {
          [updateIndex]: { $merge: action.payload },
        },
        isEditMode: { $set: false },
        rowId: { $set: null },
      });
      return updateUser;
    case "DELETE_USER":
      const delIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      const deleteUser = update(state, {
        users: { $splice: [[delIndex, 1]] },
      });
      return deleteUser;
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

export default usersReducer;
