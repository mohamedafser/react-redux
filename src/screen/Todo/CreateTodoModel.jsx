import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  onCreateTodo,
  onShowCreateTodoDialogue,
  onSetFormDatas,
} from "../../actions";

export const CreateTodoModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const todos = useSelector((state) => state.todoReducer);
  const { formDatas } = todos;
  const dispatch = useDispatch();
  const onInputChange = (event) => {
    dispatch(onSetFormDatas({ [event.target.name]: event.target.value }));
    if (
      formDatas[event.target.name] &&
      formDatas[event.target.name].length > 0
    ) {
      setErrorMessage(null);
    }
  };
  const onOkay = () => {
    if (!formDatas.name) {
      setErrorMessage("Please enter Todo");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(onCreateTodo());
    }, 3000);
  };
  return (
    <>
      <Modal
        title="Create Todo"
        visible={true}
        onOk={onOkay}
        onCancel={() => dispatch(onShowCreateTodoDialogue())}
        footer={[
          <Button
            key="back"
            onClick={() => dispatch(onShowCreateTodoDialogue())}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onOkay}
          >
            Submit
          </Button>,
        ]}
      >
        <div>
          <Input
            placeholder="Enter Todo..."
            name="name"
            onChange={onInputChange}
          />
          <p style={{ fontSize: 11, color: "red", marginTop: 5 }}>
            {errorMessage}
          </p>
        </div>
      </Modal>
    </>
  );
};
