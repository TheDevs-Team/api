/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import nodemailer from 'nodemailer';

export const sendMail = (to: string, subject: string, html: string): void => {
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
    subject,
    html,
  });
};
