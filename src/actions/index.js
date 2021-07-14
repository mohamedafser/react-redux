export const onCreateTodo = () => {
  return {
    type: "CREATE_TODO",
  };
};
export const onUpdateTodo = (todo) => {
  return {
    type: "UPDATE_TODO",
    payload: todo,
  };
};

export const onRemoveTodo = (todo) => {
  return {
    type: "DELETE_TODO",
    payload: todo,
  };
};

export const onShowCreateTodoDialogue = () => {
  return {
    type: "SHOW_CREATE_TODO",
  };
};

export const onClickEditMode = (rowId) => {
  return {
    type: "SET_EDIT_MODE",
    payload: rowId,
  };
};

export const onSetRowId = (rowId) => {
  return {
    type: "SET_ROW_ID",
    payload: rowId,
  };
};

export const onSetFormDatas = (formData) => {
  return {
    type: "SET_FORM_DATA",
    payload: formData,
  };
};
