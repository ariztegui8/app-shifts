'use client'
import React, { useState } from 'react'
import { Chip, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { formatearFecha } from '@/helpers/formatearFecha';

const NewShift = () => {

    const [date, setDate] = useState(new Date())

    const handleDateChange = (date) => {
        setDate(formatearFecha(date));
    }

    console.log(date);

    const professionals = [
        { value: "perez", label: "perez" },
        { value: "gomez", label: "gomez" },
        { value: "rabbit", label: "Rabbit" },
        { value: "hamster", label: "Hamster" },
        { value: "parrot", label: "Parrot" },
    ]

    const oSocial = [
        { value: "avalian", label: "avalian" },
        { value: "sancor", label: "sancor" },
        { value: "segu", label: "segu" },
        { value: "galiia", label: "galiia" },
        { value: "pere", label: "pere" },
    ]

    return (
        <div>
            <div className="max-w-md m-auto flex flex-col gap-4">
                <Select
                    label="Select professional"
                    className="max-w-xs"
                >
                    {professionals.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                            {animal.label}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    label="Select an animal"
                    className="max-w-xs"
                >
                    {oSocial.map((seg) => (
                        <SelectItem key={seg.value} value={seg.value}>
                            {seg.label}
                        </SelectItem>
                    ))}
                </Select>

                <DatePicker 
                    label="Birth date"
                    onChange={handleDateChange}
                />

                <div className='flex gap-2'>
                    <Chip color="primary">09:00 hs</Chip>
                    <Chip color="primary">09:30 hs</Chip>
                    <Chip color="primary">10:00 hs</Chip>
                    <Chip color="primary">10:30 hs</Chip>
                    <Chip color="primary">11:00 hs</Chip>
                    <Chip color="primary">14:00 hs</Chip>
                </div>



            </div>
        </div>
    )
}

export default NewShift