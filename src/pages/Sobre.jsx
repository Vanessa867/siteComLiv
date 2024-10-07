import '../Styles/sobre.css';
import React from 'react'

const Sobre = () => {
    return (
      <div>
      <div className='sobre-nos-container'>
        <h1>Sobre nós</h1>
        <p className='paragrafo-sobre-nos'>Somos uma equipe apaixonada por leitura, comprometida em facilitar o acesso a clubes de leitura e promover o incentivo à leitura em todo o Brasil.

Nossa missão é tornar a leitura mais acessível, proporcionando espaços onde leitores de todas as idades e interesses possam se reunir, compartilhar experiências e se inspirar mutuamente. Acreditamos que a leitura transforma vidas, e queremos fazer parte dessa jornada com você.

Essa é a essência do nosso clube: simplicidade e acessibilidade. Garantimos que nossos conteúdos e plataformas sejam fáceis de entender, acolhendo leitores de diferentes gerações, para que todos possam se sentir à vontade em cada página virada.</p>
      </div>
      <div className='equipe-container'>
        <h2>Equipe</h2>
        <div className='equipe'>
          <div className='membro'>
            <div className='circle' style={{ backgroundColor: '#FFD700' }}></div>
            <p className='nome'>Vanessa Lins</p>
            <p className='descricao'>Estudande de sistemas para internet - UNICAP</p>
          </div>
          <div className='membro'>
            <div className='circle' style={{ backgroundColor: '#32CD32' }}></div>
            <p className='nome'>Walber Pereira</p>
            <p className='descricao'>Estudande de sistemas para internet - UNICAP</p>
          </div>
          <div className='membro'>
            <div className='circle' style={{ backgroundColor: '#1E90FF' }}></div>
            <p className='nome'>Saíra Aguiar</p>
            <p className='descricao'>Estudande de sistemas para internet - UNICAP</p>
          </div>
          <div className='membro'>
            <div className='circle' style={{ backgroundColor: '#9370DB' }}></div>
            <p className='nome'>Eduarda Veloso</p>
            <p className='descricao'>Estudande de sistemas para internet - UNICAP</p>
          </div>
          <div className='membro'>
            <div className='circle' style={{ backgroundColor: '#FF4500' }}></div>
            <p className='nome'>Panmela Karen</p>
            <p className='descricao'>Estudande de sistemas para internet - UNICAP</p>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Sobre;
  