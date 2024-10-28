import React, { useState } from 'react';

const LikeCounter = () => {
    const [likes, setLikes] = useState(0); // Estado para armazenar o número de likes

    const handleLike = () => {
        setLikes(likes + 1); // Incrementa o contador de likes
    };

    return (
        <div>
            <h1>Contador de Likes</h1>
            <p>Likes: {likes}</p> {/* Exibe o número de likes */}
            <button onClick={handleLike}>Curtir</button> {/* Botão para aumentar os likes */}
        </div>
    );
};

export default LikeCounter;
