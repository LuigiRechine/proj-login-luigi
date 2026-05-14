'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importamos a biblioteca
import Navbar from "../components/navBar";

export default function Dashboard() {
    const router = useRouter();
    const [nome, setNome] = useState("");


    useEffect(() => {
        const userName = Cookies.get("userName");
       
        if (userName) {
            setNome(userName);
        } else {
            // Caso o cookie suma por algum motivo, volta para o login
            router.push("/");
        }
    }, [router]);


    


    return (
        <div>
            <Navbar></Navbar>
            <p>Esta é uma área protegida</p>
        </div>
    );
}
