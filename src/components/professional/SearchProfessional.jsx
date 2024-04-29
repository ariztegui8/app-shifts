import React, { useEffect, useState } from 'react'
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { MdAutoAwesomeMosaic } from "react-icons/md";

const SearchProfessional = ({ setProfessionals, changeType, viewType }) => {
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professional?search=${search}&sort=${order}`)
            setProfessionals(response.data.professional || [])
        } catch (error) {
            console.error('Error buscando professional', error)
            setProfessionals([])
        }
    }

    useEffect(() => {
        if (search.trim() !== '' || order !== '') {
            fetchData()
        } else {
            fetchData()
        }
    }, [search, order])

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const changeOrder = (newOrder) => {
        setOrder(newOrder)
    }

    return (
        <div className="flex flex-col gap-6 items-start md:flex-row md:items-center md:gap-10">
            <div className='flex items-center gap-4'>
                <input
                    type="text"
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder="Buscar artículos..."
                    className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                />
                <div onClick={fetchData} className='bg-[#c1285d] text-white cursor-pointer py-1 px-2 rounded-full hover:bg-[#aa2251] w-max flex gap-2 items-center'>
                    <IoSearch size={18} color="#fff" />
                    <p>Buscar</p>
                </div>
            </div>

            <div className='flex gap-2'>
                <div onClick={() => changeOrder('ASC')} className={`text-sm font-semibold cursor-pointer py-0.5 px-3 rounded-sm ${order === 'ASC' ? 'bg-[#333333] text-white' : 'text-[#333333]'}`}>
                    <p>Ascendente</p>
                </div>
                <div onClick={() => changeOrder('DEC')} className={`text-sm font-semibold cursor-pointer py-0.5 px-3 rounded-sm ${order === 'DEC' ? 'bg-[#333333] text-white' : 'text-[#333333]'}`}>
                    <p>Descendente</p>
                </div>
            </div>

            <div className='flex gap-2'>
                <div className={` w-26 h-26 p-1 rounded-sm ${viewType === 'card' ? 'bg-[#333333]' : 'bg-white'}`}>
                    <MdAutoAwesomeMosaic
                        className='cursor-pointer'
                        color={`${viewType === 'card' ? '#ffffff' : '#333333'}`}
                        onClick={() => changeType('card')}
                        size={24}
                    />
                </div>

                <div className={` w-26 h-26 p-1 rounded-sm ${viewType === 'list' ? 'bg-[#333333]' : 'bg-white'}`}>
                    <FaList
                        className='cursor-pointer'
                        color={`${viewType === 'list' ? '#ffffff' : '#333333'}`}
                        onClick={() => changeType('list')}
                        size={24}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchProfessional
