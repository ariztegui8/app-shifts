'use client'
import { Button, Input } from "@nextui-org/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"


const Register = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        apellido: '',
        pais: '',
    })

    const router = useRouter()

    const { email, password, name, apellido, pais } = form

    const handleFormChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/`, form);
            console.log(response.data);
            router.push('/login');
        } catch (error) {
            console.error('Error en el registro:', error.response?.data);
        }

    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-sm border p-10 rounded-lg">
                <div>
                    <h1 className="text-center mb-7 font-semibold text-2xl">Register</h1>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-3">
                        <Input
                            type="text"
                            label="Nombre"
                            name="name"
                            value={name}
                            onChange={handleFormChange}
                        />
                        <Input
                            type="text"
                            label="Apellido"
                            name="apellido"
                            value={apellido}
                            onChange={handleFormChange}
                        />
                        <Input
                            type="text"
                            label="Pais"
                            name="pais"
                            value={pais}
                            onChange={handleFormChange}
                        />
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
                            Registrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register