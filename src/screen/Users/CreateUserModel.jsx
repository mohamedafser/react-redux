import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  onCreateUser,
  onShowCreateUserDialogue,
  onSetFormDatas,
} from "../../actions/userActions";

export const CreateUserModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const users = useSelector((state) => state.usersReducer);
  const { formDatas } = users;
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
      setErrorMessage("Please enter User");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(onCreateUser());
    }, 3000);
  };
  return (
    <>
      <Modal
        title="Create User"
        visible={true}
        onOk={onOkay}
        onCancel={() => dispatch(onShowCreateUserDialogue())}
        footer={[
          <Button
            key="back"
            onClick={() => dispatch(onShowCreateUserDialogue())}
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
            placeholder="Enter User..."
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
