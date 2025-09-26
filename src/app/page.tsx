//import Image from 'next/image'
//import styles from './page.module.css'
"use client"
import Link from 'next/link'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import style2 from "./styles/style.module.css";

export default function Home() {
  type Blog = {
    id: number;
    title: string;
    author: string;
    content: string;
  };

  type Data = {
    id: number;
    title: string;
    author: string;
    content: string;
  }

  const [user, setUser] = useState<Blog[]>([])
  const [save, setSave] = useState<Data[]>([]);

  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedData, setSelectedData] = useState<Data | null>(null);

  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    content: ""
  });



  {/* xu ly save modal add new */ }
  const handleSave = () => {
    const newBlog: Data = {
      id: user.length + 1,
      title: (document.getElementsByTagName('input')[0] as HTMLInputElement).value,
      author: (document.getElementsByTagName('input')[1] as HTMLInputElement).value,
      content: (document.getElementsByTagName('textarea')[0] as HTMLTextAreaElement).value,
    };
    setSave([...save, newBlog]);
  };



  console.log(save);
  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => res.json())
      .then((data: Blog[]) => setUser(data))
  }, [])

  console.log(user);
  {/* xu ly view button */ }
  const handleAdd = () => {
    setShow(true);
  };

  const handleView = (blog: Blog) => {
    setSelectedBlog(blog);
    setView(true);
  }

  const handleViewData = (data: Data) => {
    setSelectedData(data);
    setViewData(true);
  }



  const handleClose = () => {
    setShow(false);

  }
  const handleCloseView = () => {
    setView(false);
  }
  const handleCloseViewData = () => {
    setViewData(false);
  }
  const handleCloseEdit = () => {
    setEdit(false);
  }
  const handleCloseEditData = () => {
    setEditData(false);
  }
  {/* Xu ly Delete button */ }
  const handleDelete = (id: number) => {
    setUser(user.filter(item => item.id !== id));
  }

  const handleDeleteData = (id: number) => {
    setSave(save.filter(item => item.id !== id));
  }

  {/* Xu ly Edit button */ }
  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditForm({
      title: blog.title,
      author: blog.author,
      content: blog.content
    });
    setEdit(true);
  }

  const handleEditData = (data: Data) => {
    setSelectedData(data);
    setEditForm({
      title: data.title,
      author: data.author,
      content: data.content
    });
    setEditData(true);
  }
  return (
    <>
      <div className={style2.header}>

        <h1>Table Blogs</h1>
        <Button variant="secondary" href={'#'} className={style2.AddButton} onClick={handleAdd}>Add new</Button>{' '}
      </div>


      {/* Modal hiển thị khi Add */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new blog</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style2.modalBody}>
          <input type="text" placeholder="Title" className={style2.inputField} />
          <input type="text" placeholder="Author" className={style2.inputField} />
          <textarea placeholder="Content" className={style2.inputField} />




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal hiển thị khi View */}
      <Modal show={view} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>Blogs content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (


            <p>{selectedBlog.content}</p>

          )}

        </Modal.Body>

      </Modal>

      {/* Modal hiển thị khi View Data add them */}
      <Modal show={viewData} onHide={handleCloseViewData}>
        <Modal.Header closeButton>
          <Modal.Title>Blogs content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (

            <p>{selectedData.content}</p>

          )}
        </Modal.Body>

      </Modal>

      {/* Modal xu ly Edit */}
      <Modal show={edit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit blog</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style2.modalBody}>
          <p>Title</p>
          <textarea value={editForm?.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
          <p>Author</p>
          <textarea value={editForm?.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} />
          <p>Content</p>
          <textarea value={editForm?.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} />




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close

          </Button>

          <Button
            variant="primary"
            onClick={() => {
              // cập nhật lại items/blogs
              setUser(user.map(item =>
                item.id === selectedBlog.id ? { ...item, ...editForm } : item
              ));
              setEdit(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>



      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Author</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>

              <td>
                <Button onClick={() => handleEdit(item)} variant="primary"  >Edit</Button>{' '}
                <Button onClick={() => handleDelete(item.id)} variant="danger"  >Delete</Button>{' '}
                <Button onClick={() => handleView(item)} variant="info"  >View</Button>{' '}
              </td>
            </tr>

          ))}
          {save.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                <Button variant="primary" href={''} >Edit</Button>{' '}
                <Button onClick={() => handleDeleteData(item.id)} variant="danger" href={''} >Delete</Button>{' '}
                <Button onClick={() => handleViewData(item)} variant="info"  >View</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </>
  )
}
