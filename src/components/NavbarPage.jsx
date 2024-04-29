'use client'
import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"

const NavbarPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: session, status } = useSession()
    console.log({ session, status });


    return (
        <div className=''>
            <Navbar className='bg-gray-50' onMenuOpenChange={setIsMenuOpen} >
                <NavbarContent >
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand >

                        <Link href='/'>
                            <p className="font-bold text-inherit">TURNOS</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">Menu 1</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="#" color="foreground" >Menu 2</Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link href="#" color="foreground" >Menu 3</Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    {session?.user ?
                        <>
                            <NavbarItem>
                                <p>{session.user?.name}</p>
                            </NavbarItem>
                            <NavbarItem>
                                <Link onClick={() => signOut()} href="#">Logout</Link>
                            </NavbarItem>
                        </>

                        :
                        <>


                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                    >
                                        Login
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded">

                                    <DropdownItem
                                        href='/login-user'

                                    // startContent={<AddNoteIcon className={iconClasses} />}
                                    >
                                        Users
                                    </DropdownItem>


                                    <DropdownItem
                                        href='/login-admin'
                                    // startContent={<CopyDocumentIcon className={iconClasses} />}
                                    >
                                        Admin
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                    >
                                        Register
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded">
                                    <DropdownItem
                                        href='/register-user'
                                    // startContent={<AddNoteIcon className={iconClasses} />}
                                    >
                                        Users
                                    </DropdownItem>
                                    <DropdownItem
                                        href='/register-admin'
                                    // startContent={<CopyDocumentIcon className={iconClasses} />}
                                    >
                                        Admin
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    }
                </NavbarContent>
                <NavbarMenu>
                    <NavbarMenuItem >
                        <Link color="foreground" href="#">Menu 1</Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem >
                        <Link href="#" color="foreground" >Menu 2</Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem >
                        <Link href="#" color="foreground" >Menu 3</Link>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>
        </div>
    )
}

export default NavbarPage