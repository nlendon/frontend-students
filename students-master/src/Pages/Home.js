import React, { useEffect, useState } from "react";
import { student } from "../Api/userApi";
import '../App.css'

function Home() {
    console.log(process.env.REACT_APP_BASE_URL, 'process.env.REACT_APP_BASE_URL');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [lecture, setLecture] = useState('');
    const [date, setDate] = useState('');
    const [adminBar, setBar] = useState(false);
    const handleChange = async (e) => {
        e.preventDefault();
        if (firstName && lastName && lecture && date) {
            await student(firstName, lastName, lecture, date).then((data) => {
                if (data !== false) {
                    setFirst('')
                    setLast('')
                    setLecture('')
                    setDate('')
                }
            })
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setBar(true);
        }
    })


    return (
        <div className={'intro'}>
            <section className="getIn">
                <div className="container4">
                    <div className="contact-inp">
                        <form onSubmit={handleChange} className={'contact-inp'}>
                            <div className={'inputs'}>
                                <label>First Name</label>
                                <input type="text" placeholder={'First Name'} value={firstName}
                                    onChange={(e) => setFirst(e.target.value)} required />
                            </div>
                            <div className={'inputs'}>
                                <label>Last Name</label>
                                <input type="text" placeholder="Last Name" value={lastName}
                                    onChange={(e) => setLast(e.target.value)} required />
                            </div>
                            <div className={'inputs'}>
                                <label>Lecture</label>
                                <input type="text" placeholder={'Enter Lecture'} value={lecture}
                                    onChange={(e) => setLecture(e.target.value)} required />
                            </div>
                            <div className={'inputs'}>
                                <label>Date</label>
                                <input type="date" onChange={(e) => setDate(e.target.value)} value={date} required />
                            </div>
                            <div className="end">
                                <button type={'submit'}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;