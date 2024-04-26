'use client'
import { useState, useEffect } from 'react';
import { Button, Select, DatePicker } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from "next-auth/react";

const BookAppointment = () => {
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: session } = useSession();


    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professionals`);
                if (response.status === 200) {
                    setProfessionals(response.data);  // Asumiendo que los datos vienen directamente en el cuerpo de la respuesta
                } else {
                    throw new Error('Failed to fetch professionals');
                }
            } catch (error) {
                console.error('Error fetching professionals:', error);
            }
        };
        fetchProfessionals();
    }, []);

    const handleProfessionalChange = async (value) => {
        setSelectedProfessional(value);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/availability/${value}`);
            setAvailableDates(response.data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!session) {
            alert("No estás autenticado");
            return;
        }
        if (!selectedProfessional) {
            alert("Por favor, selecciona un profesional");
            return;
        }
        if (!selectedDate) {
            alert("Por favor, selecciona una fecha");
            return;
        }
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments`, {
                userId: session.user?.id || session.user?.user?.id ,  // Asegúrate de que este campo es proporcionado por tus callbacks de NextAuth
                professionalId: selectedProfessional,
                date: selectedDate,
            });
            console.log(response.data);
            alert('Turno reservado');
        } catch (error) {
            console.error('Error booking appointment:', error.response?.data);
        }
    };

    return (
        <div>
            <h1>Reservar Turno</h1>
            <form onSubmit={handleSubmit}>
            <Select
    placeholder="Seleccionar Profesional"
    onChange={e => handleProfessionalChange(e.target.value)}
    options={professionals.map(prof => ({
        key: prof._id,
        value: prof._id,
        label: `${prof.name} ${prof.apellido}`
    }))}
/>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    availableDates={availableDates}
                />
                <Button type="submit">Reservar Turno</Button>
            </form>
        </div>
    );
};

export default BookAppointment;
