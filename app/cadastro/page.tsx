'use client';

import Link from 'next/link';
import { useLogin } from '../hooks/useLogin';
import '../formStyle.css';

export default function Cadastro() {
  // Puxamos as funções e variáveis do nosso Hook
  const { 
    username, setUsername, 
    password, setPassword, 
    name, setName,
    cadastrar 
  } = useLogin();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Área de Acesso</h1>
        
        {/* Quando o formulário for submetido, chama a função entrar */}
        <form onSubmit={cadastrar}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)} // Atualiza apenas o username
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza apenas o username
              className="input-field"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza apenas o password
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Cadastrar
          </button>
        </form>

        <div className="footer-link">
          <span>Já tem uma conta </span>
          <Link href="/">Acesse aqui</Link>
        </div>
      </div>
    </div>
  );
}