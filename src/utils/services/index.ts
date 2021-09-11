import nodemailer from 'nodemailer';

export const sendMail = (email: string, name: string, id: string): void => {
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
    subject: 'Estamos quase lá - G2K Investimentos',
    text: 'Seu cadastro foi realizado com sucesso em nossa plataforma!',
    html: `${name}, Seu cadastro foi realizado com sucesso em nossa plataforma! <br><br> Agora você só precisa criar sua senha e ativar sua conta agora mesmo! <br><br> <strong> Acesse: http://localhost:3000/active-account?id=${id}</strong> }`,
  });
};
