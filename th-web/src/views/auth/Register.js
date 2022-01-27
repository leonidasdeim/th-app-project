import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { registerAsync, clearRegisterData, selectRegisterStatus } from '../../features/auth/authSlice';

export default function Register() {
    const dispatch = useDispatch();
    const msgRefUser = useRef(null)
    const msgRefPass = useRef(null)
    const msgRefEmail = useRef(null)

    const registerStatus = useSelector(selectRegisterStatus);

    useEffect(() => {
        return () => {
            dispatch(clearRegisterData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRegisterButton = (event) => {
        event.preventDefault()
        let user = {
            username: msgRefUser.current.value,
            password: msgRefPass.current.value,
            email: msgRefEmail.current.value,
        }
        dispatch(registerAsync(user));
    }

    const notification = <NotificationObject item = {registerStatus} />

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                                <form onSubmit={e => handleRegisterButton(e)}>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password" >
                                            Username
                                        </label>
                                        <input
                                            type="username"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Username"
                                            ref={msgRefUser}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password" >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            ref={msgRefEmail}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                            ref={msgRefPass}
                                        />
                                    </div>
                                    
                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                </form>
                                {notification}
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </>
    );
}

function NotificationObject(props) {
    const show = (props.item.status === true || props.item.error === true);
    
    return (
        <>
            {
                show &&
                <div className="mt-8">
                    <div className="flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                        <div className={"w-2" + (props.item.error ? " bg-red-600" : props.item.status ? " bg-green-600" : " bg-blueGray-600")}>
                        </div>
                        <div className="w-full flex justify-between items-start px-2 py-2">
                            <div className="flex flex-col ml-2">
                                <label className="text-gray-800">{(props.item.error ? "Something went wrong" : props.item.status ? "Now you can login" : " ")}</label>
                                <p className="text-gray-500 ">{props.item.reason}</p>
                            </div>
                            <a href="#blank">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
