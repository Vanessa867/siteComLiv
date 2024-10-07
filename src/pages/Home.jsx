import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <main>
        <div className="clubinar-container">
          <p className="clubinar">
            Clubinar é só no ComLiv
            <br />
            Vem ser ComLiv também.
          </p>
          <button className="botão-club">clubinar</button>
        </div>

      </main>
      <footer>
        <p>© 2024 COMLIV. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;