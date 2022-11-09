import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { deleteStudent, exportStudent, updateStudent, getStudentInfo } from "../Api/userApi";
import { AuthCheck } from "../Api/authApi";
import { BiLogIn, BiExport } from 'react-icons/bi';

function Admin() {
    const [information, setInfo] = useState([]);
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(true);
    const [deleteShow, setDelShow] = useState(true);
    const [firstName, setFirst] = useState();
    const [lastName, setLast] = useState('');
    const [lecture, setLecture] = useState('');
    const [date, setDate] = useState('');
    const [unique, setUnique] = useState({})
    const [areYouSure, setSure] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        isAuth();
        Get();
    }, []);

    async function Update(id) {
        await updateStudent(id, firstName || unique.firstName, lastName || unique.lastName, lecture || unique.lecture, date || unique.date).then(() => {
            handleClose();
            Get();
        })
    }

    async function isAuth() {
        const token = localStorage.getItem('token');
        try {
            const check = await AuthCheck(token);
            if (!check) {
                window.location = '/login';
            }
            setAdmin(true);
        } catch (e) {
            window.location = '/login'
            localStorage.removeItem('token');
        }

    }

    async function Export() {
        await exportStudent().then(() => {
            // window.location = 'https://apistudents.analysed.ai/student/export';
            window.location = 'Your Backend Export URL'
        });
    }

    async function Get() {
        await getStudentInfo().then((result) => {
            setInfo(result?.data);
        });
    }

    async function Delete(id) {
        const result = await deleteStudent(id);
        setInfo(result.infos);
    }

    async function Logout() {
        localStorage.removeItem('token')
        window.location = '/'
    }

    function openModal(id) {
        setUnique({ ...information.filter((info) => info.id === id)[0] })
        setModal(true);
        setShow(true);
    }

    function openDeleteModal(id) {
        setUnique({ ...information.filter((info) => info.id === id)[0] });
        setSure(true);
        setDelShow(true);
    }

    function handleClose() {
        setShow(false);
        setDelShow(false)
        setSure(false);
        setModal(false);
    }

    if (admin === true) {
        return (<>
            <header>
                <div>
                    <nav>
                        <ul>
                            <li id={'admin'}>Admin Panel</li>
                            <li><a href="/">Student Forms</a></li>
                            <li><BiLogIn size={'30px'} className={'logout'} onClick={() => Logout()} /></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className={'info'}>
                <div className={'export'}>
                    <a href={'#'} onClick={() => Export()}><BiExport size={'35px'} /></a>
                </div>
                <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Lecture</th>
                            <th>Date</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {information.length && information?.map(info => {
                            return (<tr key={info.id}>
                                <td>{info.id}</td>
                                <td>{info.firstName}</td>
                                <td>{info.lastName}</td>
                                <td>{info.lecture}</td>
                                <td>{info.date}</td>
                                <td><Button variant="primary" onClick={() => openModal(info.id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => openDeleteModal(info.id)}
                                        style={{ marginLeft: '10px' }}>Delete</Button></td>
                            </tr>);
                        })}
                    </tbody>
                </Table>
            </div>

            {modal === true && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={unique?.firstName || firstName}
                                placeholder="First Name"
                                onChange={e => {
                                    setUnique({ ...unique, firstName: '' })
                                    setFirst(e.target.value)
                                }

                                } />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={unique?.lastName || lastName}
                                placeholder="Last Name"
                                onChange={(e) => {
                                    setUnique({ ...unique, lastName: '' })
                                    setLast(e.target.value)
                                }

                                } />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Lecture</Form.Label>
                            <Form.Control type="text" value={unique?.lecture || lecture}
                                placeholder="Enter Lecture"
                                onChange={(e) => {
                                    setUnique({ ...unique, lecture: '' })
                                    setLecture(e.target.value)
                                }

                                } />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value={unique?.date || date} placeholder="Date"
                                onChange={(e) => {
                                    setUnique({ ...unique, date: '' })
                                    setDate(e.target.value)
                                }

                                } />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => Update(unique.id)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>}
            {areYouSure && <Modal show={deleteShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Do you want to permanently delete this line?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => Delete(unique.id).then(() => handleClose())}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>)
    }

}

export default Admin;
