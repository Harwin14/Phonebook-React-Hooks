import React, { useCallback, useState } from 'react';
import { addContact } from "../actions/contacts";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCircleCheck, faAddressCard } from '@fortawesome/free-solid-svg-icons'

export default function ContactForm(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    }
    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(addContact(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])


    return (
        <div>
            <div className="card mt-3">
                <div className="card-header font"><FontAwesomeIcon icon={faAddressCard} size="2x" /> Add Form
                </div>
                <form className="g-3 my-2 px-4" onSubmit={handleSubmit}>
                    <div className="d-flex">
                        <div className="d-flex align-items-center me-2">
                            <div className="me-1 fw-bold">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="ms-1">
                                <input type="string" className="form-control" name="name" onChange={handleInputChange} value={user.name} placeholder="name"
                                    onInvalid={F => F.target.setCustomValidity('Enter Contact name here..')} onInput={F => F.target.setCustomValidity('')} required></input>
                            </div>
                        </div>

                        <div className="d-flex align-items-center ms-2">
                            <div className="me-1 fw-bold">
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="ms-1">
                                <input type="string" className="form-control" name="phone" onChange={handleInputChange} value={user.phone} placeholder="phone"
                                    onInvalid={F => F.target.setCustomValidity('Please enter phone number here..')} onInput={F => F.target.setCustomValidity('')} required></input>
                            </div>
                        </div>

                        <div className="d-flex justify-content-around align-items-stretch ">
                            <button type="submit" className="button-87 mx-2"><FontAwesomeIcon icon={faCircleCheck} /> Save</button>
                            <button className="button-85" onClick={props.cancel}><FontAwesomeIcon icon={faBan} /> Cancel</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
