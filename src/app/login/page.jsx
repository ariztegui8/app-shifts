'use client'
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"


const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const { email, password } = form

    const handleFormChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(form);
       
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-sm border p-10 rounded-lg">
                <div>
                    <h1 className="text-center mb-7 font-semibold text-2xl">Login</h1>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-3">
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={email}
                            onChange={handleFormChange}
                        />
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={handleFormChange}
                        />
                        <Button
                            color="primary"
                            type="submit"
                        >
                            Ingresar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login