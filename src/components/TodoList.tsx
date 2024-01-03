import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  ListItem,
  ListIcon,
  ListHeader,
  ListDescription,
  ListContent,
  List,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  Confirm,
  Loader,
  Segment,
  Popup,
} from 'semantic-ui-react'
import { url } from '../url'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type todoProps = {
  title?: string,
  textTodo?: string,
  userId?: string,
  _id?: string,
  todoList?: todoProps[],
  updateState?: () => void;
}


const TodoList: React.FC<todoProps> = ({ todoList, updateState = () => { } }) => {

  const [isLoading, setisLoading] = useState(false)
  const [deleteState, setDeleteState] = useState(false)
  const [titleEdit, setTitleEdit] = useState("" as string)
  const [textEdit, setTextEdit] = useState("" as string)
  const [idTodo, setIdTodo] = useState("" as string)

  // useEffect(() => {

  //   return () => {
  //     // setTodoList([])
  //   }
  // }, [todoList])

  const showToastMsg = (msg: string) => toast.success(msg, { position: 'top-right' });

  const editTodoList = async (idTodo: string) => {

    setisLoading(true);

    await axios
      .patch(`${url}/editTodo/${idTodo}`, { textTodo: textEdit, title: titleEdit })
      .then((res) => {

        showToastMsg("Todolist edited")
        updateState()
        dispatch({ type: 'close' })
        setTimeout(() => {
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIdTodo("")
        setisLoading(false);
      });
  }

  function editReducer(state: any, action: any) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size }
      default:
        throw new Error('Unsupported action...')
    }
  }

  const [state, dispatch] = React.useReducer(editReducer, { open: false, size: undefined, })
  const { open, size } = state



  const deleteTodoList = async (idTodo: unknown) => {

    await axios
      .delete(`${url}/deleteTodo/${idTodo}`)
      .then(() => {
        showToastMsg("Todolist deleted")
        updateState()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIdTodo("")
      });

  }


  return (
    <>

      <List divided relaxed content celled bulleted size='small' className="ui segment" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {

          todoList && todoList.map((listItem, index) => {
            return (

              <ListItem style={{ padding: "6px" }} key={index}>

                <Popup
                  content='Edit todolist'
                  trigger={
                    <ListIcon
                      name='edit outline'
                      color='yellow'
                      verticalAlign='middle'
                      style={{ cursor: "pointer" }}

                      onClick={() => {
                        dispatch({ type: 'open', size: 'tiny' }),
                          setTextEdit(listItem?.textTodo as any),
                          setTitleEdit(listItem?.title as any),
                          setIdTodo(listItem?._id as any)
                      }}
                    />
                  }
                  position='bottom center'

                />

                <ListContent style={{ cursor: "default" }}>
                  <ListHeader as='a' style={{ cursor: "default", marginBottom: ".2rem" }}>{listItem.title?.toUpperCase()}</ListHeader>
                  <ListDescription as='a' style={{ maxWidth: '90vh', overflow: 'hidden', textOverflow: 'ellipsis' }}>{listItem.textTodo?.toLowerCase()}</ListDescription>
                </ListContent>
                <Popup
                  content='Delete todolist'
                  trigger={
                    <ListIcon
                      name='delete'
                      color='red'
                      verticalAlign='middle'
                      style={{ cursor: "pointer" }}
                      onClick={() => { setDeleteState(true), setIdTodo(listItem?._id as any) }}

                    />
                  }
                  position='bottom center'
                  style={{ color: "red" }}
                />
              </ListItem>

            )
          })

        }
      </List>



      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <ModalHeader>Edit todolist</ModalHeader>
        <ModalContent>
          <div className="ui form segment ui black segment">
            <div className="field">
              <label>Title</label>
              <div className="ui left labeled icon input">
                <input
                  type="text"
                  value={titleEdit}
                  placeholder="title"
                  onChange={e => setTitleEdit(e.target.value)}
                />
                <div className="ui corner label red">
                  <i className="icon asterisk"></i>
                </div>
              </div>

            </div>
            <div className="field">
              <label>Text</label>
              <div className="ui left labeled icon input">
                <form className="ui form" style={{ width: '100%' }}>
                  <textarea
                    placeholder="text"
                    value={textEdit}
                    required rows={2}
                    onChange={e => setTextEdit(e.target.value)}

                  />
                </form>
                <div className="ui corner label red">
                  <i className="icon asterisk"></i>
                </div>
              </div>
            </div>
            <div className="ui error message">
              <div className="header">We noticed some issues</div>
            </div>

            {!isLoading && <Button
              type='submit'
              className='ui blue button'
              disabled={!textEdit || !titleEdit}
              onClick={() => {
                editTodoList(idTodo)
              }}
            >Submit</Button>}
            {isLoading && <button className="ui loading primary button">Loading</button>}

          </div>

        </ModalContent>

      </Modal>

      <div>
        <Confirm
          open={deleteState}
          onCancel={() => setDeleteState(false)}
          onConfirm={() => { setDeleteState(false), deleteTodoList(idTodo) }}
        />
      </div>

    </>
  )

}

export default TodoList






