import nodemailer from 'nodemailer';

export const sendMail = (email: string, name: string, password: string): void => {
  // Configurando conta para enviar e-mails
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'gug.henri2@gmail.com',
      pass: 'guga1311',
    },
  });

  // Definindo destino e conteudo
  transporter
    .sendMail({
      from: 'G2K Investimentos <gug.henri2@gmail.com>',
      to: email,
      subject: 'Cadastro Realizado - G2K Investimentos',
      text: 'Seu cadastro foi realizado com sucesso em nossa plataforma!',
      html: `${name}, Seu cadastro foi realizado com sucesso em nossa plataforma! <br> Não perca tempo e acesse agora mesmo! <br> <strong> Dados de acesso: </strong> <br> email: ${email} <br> senha: ${password}`,
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
};
