import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import '../Styles/Perfil.css'; // Certifique-se de que esse arquivo existe ou remova essa linha

const Perfil = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleSubmit = (values) => {
    // Aqui você pode simplesmente logar os dados no console para testar
    console.log('Dados atualizados:', values);
    setUser(values); // Atualiza o estado com os novos dados do formulário
  };

  return (
    <div className="profile-page">
      <h1>Perfil de Usuário</h1>
      <div className="profile-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <Formik
          initialValues={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Nome</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Digite seu nome"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  type="email"
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Atualizar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Perfil;
