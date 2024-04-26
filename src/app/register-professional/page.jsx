'use client'
import { Button, Input } from "@nextui-org/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"


const RegisterProfessional = () => {

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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth-professional/`, form);
            console.log(response.data);
            router.push('/login-professional');
        } catch (error) {
            console.error('Error en el registro:', error.response?.data);
        }

    }

    return (
        <div className="flex justify-center items-center h-screen px-4">
            <div className="w-[500px] border p-8 rounded-lg">
                <div>
                    <h1 className="text-center mb-7 font-semibold text-2xl">Register Professionals</h1>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <Input
                                type="text"
                                label="Nombre"
                                name="name"
                                value={name}
                                onChange={handleFormChange}
                                radius="sm"
                                variant="bordered"
                            />
                            <Input
                                type="text"
                                label="Apellido"
                                name="apellido"
                                value={apellido}
                                onChange={handleFormChange}
                                radius="sm"
                                variant="bordered"
                            />
                            <Input
                                type="text"
                                label="Pais"
                                name="pais"
                                value={pais}
                                onChange={handleFormChange}
                                radius="sm"
                                variant="bordered"
                            />
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={handleFormChange}
                                radius="sm"
                                variant="bordered"
                            />
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                value={password}
                                onChange={handleFormChange}
                                radius="sm"
                                variant="bordered"
                            />
                        </div>
                        <Button
                            color="primary"
                            type="submit"
                            radius="sm"
                        >
                            Registrar
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterProfessional