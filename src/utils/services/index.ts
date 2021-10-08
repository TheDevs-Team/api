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
  transporter.sendMail({
    from: 'G2K Investimentos <gug.henri2@gmail.com>',
    to: email,
    subject: 'Cadastro Realizado',
    text: 'Seu cadastro foi realizado com sucesso em nossa plataforma!',
    html: `${name}, Seu cadastro foi realizado com sucesso em nossa plataforma! <br><br> Agora você pode acessar sua conta com os seguintes dados: <br><br> Login: ${email} <br><br> Senha: ${password} <br><br> <a href="http://localhost:3000/entrar"> <strong>Clique aqui para acessar sua conta.</strong></a>`,
  });
};
