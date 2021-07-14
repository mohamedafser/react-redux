import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onUpdateUser,
  onRemoveUser,
  onShowCreateUserDialogue,
  onSetFormDatas,
  onClickEditMode,
} from "../../actions/userActions";
import { Table, Space, Button, Input } from "antd";
import { CreateUserModel } from "./CreateUserModel";

export function User() {
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const { users: allUsers, isCreateUser, isEditMode, rowId, formDatas } = users;

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(allUsers));
  }, [allUsers]);

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record) => {
        return (
          <Space size="middle">
            {isEditMode && record.id === rowId ? (
              <>
                <Input
                  placeholder="Enter User..."
                  name="name"
                  defaultValue={record.name}
                  onChange={(event) => {
                    dispatch(
                      onSetFormDatas({
                        [event.target.name]: event.target.value,
                      })
                    );
                  }}
                />
                <Button
                  onClick={() => {
                    dispatch(
                      onUpdateUser({ id: record.id, name: formDatas.name })
                    );
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <p>{record.name}</p>
            )}
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <p
              className="actionLabel"
              onClick={() => {
                dispatch(onClickEditMode(record.id));
              }}
            >
              Edit
            </p>
            <p>|</p>
            <p
              className="actionLabel"
              onClick={() => dispatch(onRemoveUser(record.id))}
            >
              Delete
            </p>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        onClick={() => dispatch(onShowCreateUserDialogue())}
        style={{ marginBottom: 15 }}
      >
        Create User
      </Button>
      <Table columns={columns} dataSource={allUsers} />
      {isCreateUser && <CreateUserModel />}
    </div>
  );
}
