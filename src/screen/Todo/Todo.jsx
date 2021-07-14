import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onUpdateTodo,
  onRemoveTodo,
  onShowCreateTodoDialogue,
  onSetFormDatas,
  onClickEditMode,
} from "../../actions";
import { Table, Space, Button, Input } from "antd";
import { CreateTodoModel } from "./CreateTodoModel";

export function Todo() {
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const { todos: allTodos, isCreateTodo, isEditMode, rowId, formDatas } = todos;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);

  const columns = [
    {
      title: "Name",
      key: "name",
      width: "30%",
      render: (record) => {
        return (
          <Space size="middle">
            {isEditMode && record.id === rowId ? (
              <>
                <Input
                  placeholder="Enter Todo..."
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
                      onUpdateTodo({ id: record.id, name: formDatas.name })
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
            <p className="divider">|</p>
            <p
              className="actionLabel"
              onClick={() => dispatch(onRemoveTodo(record.id))}
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
        onClick={() => dispatch(onShowCreateTodoDialogue())}
        style={{ marginBottom: 15 }}
      >
        Create Todo
      </Button>
      <Table columns={columns} dataSource={allTodos} />
      {isCreateTodo && <CreateTodoModel />}
    </div>
  );
}
