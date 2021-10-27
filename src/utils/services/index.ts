/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import nodemailer from 'nodemailer';
import { Client, TextContent } from '@zenvia/sdk';

export const sendMail = (to: string, subject: string, text: string, html: any): void => {
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
    text,
    html,
  });
};

export const sendSMS = async (msg: string, to: string): Promise<void> => {
  const client = new Client('jDCJzZkFO_saU-a8w2T9FlQ1qZW48OP0ZOSG');

  const sms = client.getChannel('sms');

  const content = new TextContent(msg);

  try {
    await sms.sendMessage('5511963851702', to, content);
    return;
  } catch (err) {
    return console.log(err);
  }
};
