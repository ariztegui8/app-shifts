import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import React, { useState } from 'react'

const ModalAddMedico = ({consumirApi}) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        video: ''
    })

    const { title, description, category, author, video } = form

    const [file, setFile] = useState(null)

    const handleChangeForm = e => {
        if (e.target.name === 'image') {
            setFile(e.target.files[0])
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('category', form.category)
        formData.append('author', form.author)
        formData.append('video', form.video)
        if (file) {
            formData.append('image', file)
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professional`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('response', response.data)
            if (response.data) {
                consumirApi();
                onClose();
            }

            setForm({
                title: '',
                description: '',
                category: '',
                author: '',
                video: '',
            })
            setFile(null)
        } catch (error) {
            console.error('Error', error.response ? error.response.data : error.message)
        }
    }


    return (
        <div>
            <Button onPress={onOpen}>Agregar Medico</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmitForm}>
                                    <div className='flex flex-col gap-4 mb-6'>
                                        <input
                                            type="file"
                                            placeholder="Agregar imagen"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='image'
                                            onChange={handleChangeForm}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Título"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='title'
                                            value={title}
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Autor"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='author'
                                            value={author}
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <textarea
                                            type="text"
                                            placeholder="Descripción"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='description'
                                            value={description}
                                            onChange={handleChangeForm}
                                            rows={3}
                                            required
                                        >
                                        </textarea>
                                        <select
                                            className="custom-scrollbar text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm cursor-pointer"
                                            name='category'
                                            value={category}
                                            onChange={handleChangeForm}
                                            required
                                        >
                                            <option value='' disabled >Selecciona una categoría</option>
                                            <option value='BLOG'>Blog</option>
                                            <option value='CONVOCATORIA ABIERTA'>Convocatoria abierta</option>
                                            <option value='OPORTUNIDAD LABORAL'>Oportunidad laboral</option>
                                            <option value='SALA DE PRENSA'>Sala de prensa</option>
                                            <option value='PROGAMA'>Programa</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="ID del video de YouTube ej: O7oxdswgr1Q"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='video'
                                            value={video}
                                            onChange={handleChangeForm}
                                        />
                                    </div>

                                    <div className='flex justify-end'>
                                        <button type='submit' className={`bg-[#c1285d] text-white text-[15px] py-1.5 px-6 rounded-full hover:bg-[#aa2251] w-max `}>Agregar</button>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalAddMedico