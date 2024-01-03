import React, { useCallback, useEffect, useState } from 'react'
import TodoList from './TodoList'
import axios from 'axios';
import { url } from '../url';
import { Modal, ModalHeader, ModalContent, Button, Popup } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export type todoProps = {
  title?: string,
  textTodo?: string,
  userId?: string,
  _id: string
  todoList: todoProps[],
}

export const Dashboard = () => {

  const [todoList, setTodoList] = useState<todoProps[]>([])
  const [isLoading, setisLoading] = useState(false)
  const [titleTodo, setTitleTodo] = useState("" as any)
  const [textTodo, setTextTodo] = useState("" as any)
  const [userId, setUserId] = useState("" as any)
  const [updateState, setupdateState] = useState(false)


  const user: any = localStorage.getItem('userAuth')

  useEffect(() => {

    if (!user) {
      window; location.pathname = ""
      return
    }
    setUserId(JSON.parse(user)?.userId);
    getTodoList()
    return () => {
      setupdateState(false)
      setTodoList([])

    }
  }, [updateState])

  const getTodoList = async () => {

    setisLoading(true)

    await axios
      .get(`${url}/getTodoByUser/${JSON.parse(user)?.userId}`)
      .then((res) => {
        setTodoList([...res.data])

      })
      .catch(() => {})
      .finally(() => {
        setisLoading(false);
      });
  }

  function actionReducer(state: any, action: any) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size }
      default:
        throw new Error('Unsupported action...')
    }
  }

  const [state, dispatch] = React.useReducer(actionReducer, { open: false, size: undefined, })
  const { open, size } = state

  const addTodoList = async () => {

    setisLoading(true)

    await axios
      .post(`${url}/todo`, { textTodo: textTodo, title: titleTodo, userId: userId })
      .then((res) => {
        handleUpdateState()
        showToastMsg("Todolist added")
      })
      .catch((err) => {
        if (err?.code == 'ERR_BAD_REQUEST') showToastMsg(" incorrect email or password")
      })
      .finally(() => {
        // setupdateState(false)
        setisLoading(false);
      });
  }

  const handleUpdateState = useCallback(() => {
    setupdateState((prev) => !prev);
  }, [setupdateState]);

  const showToastMsg = (msg: string) => toast.success(msg, { position: 'top-right' });

  return (
    <>
      <div className="ui text container">
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>

          <h2 className="ui header" style={{ marginTop: '2rem' }}>Todo list</h2>
          <Popup
            content='Add todolist'
            trigger={
              <span
                className="ui black segment"
                onClick={() => dispatch({ type: 'open', size: 'tiny' })}
                style={{ cursor: "pointer", }}
              >
                <i className="icon add blue"></i>
              </span>
            }
            position='bottom center'
          />
        </span>

        <TodoList
          todoList={todoList}
          updateState={handleUpdateState}
        />

      </div>


      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <ModalHeader>Add todolist</ModalHeader>
        <ModalContent>
          <div className="ui form segment ui black segment">
            <div className="field">
              <label>Title</label>
              <div className="ui left labeled icon input">
                <input type="text"
                  placeholder="title"
                  onChange={e => setTitleTodo(e.target.value)}
                />
                <div className="ui corner label red">
                  <i className="icon asterisk" ></i>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Text</label>
              <div className="ui left labeled icon input">

                <form className="ui form" style={{ width: '100%' }}>
                  <textarea
                    placeholder="text"
                    required rows={2}
                    onChange={e => setTextTodo(e.target.value)}
                  />


                </form>

                <div className="ui corner label red">
                  <i className="icon asterisk"></i>
                </div>

              </div>
            </div>

            {!isLoading && <Button
              type='submit'
              className='ui blue button'
              disabled={!textTodo || !titleTodo}
              onClick={() => {
                addTodoList(),
                  setTimeout(() => {
                    dispatch({ type: 'close' })
                  }, 600);
              }}
            >Submit</Button>}
            {isLoading && <button className="ui loading primary button">Loading</button>}

          </div>

        </ModalContent>

      </Modal>

    </>
  )
}
