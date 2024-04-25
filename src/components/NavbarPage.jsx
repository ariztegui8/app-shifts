'use client'
import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button,} from "@nextui-org/react";
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"

const NavbarPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: session, status } = useSession()
    console.log({ session, status });


    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <div className=''>
            <Navbar className='bg-gray-50' onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent >
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand >

                        <p className="font-bold text-inherit">TURNOS</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">Menu1</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/login" color="foreground" >Login</Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link href="register" color="foreground" >Register</Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    {session?.user ?
                        <>
                            <NavbarItem>
                                User
                                <p>{session.user?.name || session.user?.user?.name}</p>
                            </NavbarItem>
                            <NavbarItem>
                                <Link onClick={() => signOut()} href="#">Logout</Link>
                            </NavbarItem>
                        </>

                        :
                        <NavbarItem>
                            <Link onClick={() => signIn()} href="#">Sign In</Link>
                        </NavbarItem>
                    }
                </NavbarContent>
                <NavbarMenu>
                    <NavbarMenuItem >
                        <Link href="#" color="foreground" >Menu1</Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem >
                        <Link href="/login" color="foreground" >Login</Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem >
                        <Link href="register" color="foreground" >Register</Link>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>
        </div>
    )
}

export default NavbarPage