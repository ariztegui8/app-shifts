'use client'
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"


const Login = () => {

    // const [form, setForm] = useState({
    //     username: '',
    //     password: ''
    // })
    // const [error, setError] = useState(false)

    // const { username, password } = form

    // const handleFormChange = e => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log(form);
    //     if (username.trim() == '' || password.trim() == '') {
    //         setError(true)
    //         return
    //     }
    //     setError(false)

    //     try {
    //         const response = await axios.post(
    //             "https://www.mockachino.com/06c67c77-18c4-45/login",
    //             {
    //                 username,
    //                 password
    //             }
    //         );
    //         const { access_token } = response.data
    //         setToken(access_token)
    //     } catch (error) {
    //         console.error("Error de autenticación:", error)
    //     }
    // }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-sm border p-10 rounded-lg">
                <div>
                    <h1 className="text-center mb-7 font-semibold text-2xl">Login</h1>
                </div>

                <form >
                    <div className="flex flex-col gap-3">
                        <Input
                            type="text"
                            label="Nombre"
                        />
                        <Input
                            type="email"
                            label="Email"
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