"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../formStyle.css";
import Cookies from "js-cookie"; // Importamos a biblioteca

export default function Navbar(){

    const router = useRouter();
    const [nome, setNome] = useState("");

    function logout() {
        Cookies.remove("logged");
        Cookies.remove("userName");
        router.push("/");
    }

    useEffect(() => {
        const userName = Cookies.get("userName");
       
        if (userName) {
            setNome(userName);
        } else {
            // Caso o cookie suma por algum motivo, volta para o login
            router.push("/");
        }
    }, [router]);

    return(
        <nav className="navBar">
            <p>Bem-vindo {nome}</p>
            <div className="rotas">
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/produtos">Produto</a>
                <a href="/dashboard/estoque">Estoque</a>
            </div>
            <div className="btn-sair">
                <p onClick={logout}>Sair</p>
            </div>
        </nav>
    );
}