export const onCreateUser = () => {
  return {
    type: "CREATE_USER",
  };
};
export const onUpdateUser = (todo) => {
  return {
    type: "UPDATE_USER",
    payload: todo,
  };
};

export const onRemoveUser = (todo) => {
  return {
    type: "DELETE_USER",
    payload: todo,
  };
};

export const onShowCreateUserDialogue = () => {
  return {
    type: "SHOW_CREATE_USER",
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
