'use client'
import { useState } from 'react';
import { Button, Input, DatePicker } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from "next-auth/react";

const Availability = () => {
    const [date, setDate] = useState(new Date());
    const [professionalId, setProfessionalId] = useState(''); // Esto normalmente sería manejado por autenticación

    const { data: session } = useSession();

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            alert("Por favor, inicie sesión.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/availability`, {
                professionalId: session.user?.id || session.user?.user?.id ,
                dates: [date] // Ejemplo simple con un solo día
            });
            console.log(response.data);
            alert('Disponibilidad actualizada');
        } catch (error) {
            console.error('Error al actualizar disponibilidad:', error.response?.data);
        }
    };

    return (
        <div>
            <h1>Añadir Disponibilidad</h1>
            <form onSubmit={handleSubmit}>
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                />
                <Button type="submit">Guardar Disponibilidad</Button>
            </form>
        </div>
    );
};

export default Availability;
