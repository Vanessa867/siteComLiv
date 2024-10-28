import React, { useState } from 'react';
import '../Styles/Cadastrar.css';

const Cadastrar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [Repetirsenha, setRepetirsenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    const userData = { nome, email, senha };

    try {
      const response = await fetch('https://parseapi.back4app.com/users', {
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': '17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM',
          'X-Parse-REST-API-Key': '2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ',
          'X-Parse-Revocable-Session': 1,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMensagem('Cadastro realizado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
        setRepetirsenha('');
      } else {
        setMensagem('Erro no cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2>Cadastrar</h2>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Repetir senha:</label>
          <input 
            type="password" 
            value={Repetirsenha} 
            onChange={(e) => setRepetirsenha(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Cadastrar;