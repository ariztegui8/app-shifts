'use client'
import { Button, Divider, Input } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from 'react-icons/fc';
import { ClipLoader } from "react-spinners"


const LoginAdmin = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [userType, setUserType] = useState('admin');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const { email, password } = form

    const handleFormChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        const res = await signIn('credentials', {
            email,
            password,
            userType,
            redirect: false,
        })
        setLoading(false);
        console.log('res', res);

        if (res?.error) return setError(res.error)

        if (res?.ok) {
            return router.push('/dashboard-admin');
        }

    }

    // const signInGoogle = async () => {
    //     await signIn('google', { callbackUrl: '/dashboard' })
    // }

    return (
        <div className="flex justify-center items-center h-screen px-4">
                <div className="w-[500px] border p-8 rounded-lg">
                    <div>
                        <h1 className="text-center mb-7 font-semibold text-2xl">Login Admin</h1>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <Input
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleFormChange}
                                    radius="sm"
                                    // size="sm"
                                    variant="bordered"
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleFormChange}
                                    radius="sm"
                                    // size="sm"
                                    variant="bordered"
                                />
                            </div>

                            {error ? <p className="text-red-500">{error}</p> : null}
                            <Button
                                color="primary"
                                type="submit"
                                radius="sm"
                                isLoading={loading}
                            >
                                {loading ? 'Cargando...' : 'Ingresar'}
                            </Button>
                        </div>

                        {/* <Divider className="my-4" />

                   <div >
                       <Button
                           className="w-full"
                           onClick={() => signInGoogle()}
                           variant="bordered"
                           startContent={<FcGoogle size={24} />}
                           radius="sm"
                       >Ingresar con Google
                       </Button>
                   </div> */}
                    </form>
                </div>
        </div>
    )
}

export default LoginAdmin