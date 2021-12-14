/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import nodemailer from 'nodemailer';

export const sendMail = (to: string, name: string, password: string): void => {
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
    to,
    subject: 'Cadastro Realizado com sucesso',
    html: `<h2>${name} boas noticias<h2> <br> <h3>Seu cadastro na plataforma G2K foi realizada com sucesso, segue os seus dados de acesso: <br> <p><strong>login: </strong> ${to} <br> <p><strong>Senha: </strong> ${password}</h3> `,
  });
};
