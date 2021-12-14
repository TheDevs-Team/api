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

export const sendMailPendings = (to: string): void => {
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
    subject: 'Aviso financeiro',
    html: `<h2>Pendencia financeira!<h2> <br> <p>Seu pagamento ainda não foi realizado, efetue o pagamento e continue seus estudos!</p> `,
  });
};

export const sendMailNewCourses = (to: string): void => {
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
    subject: 'Novo Curso disponível',
    html: `<h2>Novos cursos te esperam!<h2> <br> <p>Cursos novos foram adicionados na plataforma, acesse agora mesmo e evolua seu aprendizado!</p> `,
  });
};

export const sendMailMaterials = (to: string): void => {
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
    subject: 'Novo material disponível',
    html: `<h2>Boas noticiais!<h2> <br> <p>Novos materais foram adicionados em seu curso, acesse a plataforma g2k e continue seu progresso.!</p> `,
  });
};

export const sendMailClass = (to: string): void => {
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
    subject: 'Não esqueça de suas aulas',
    html: `<h2>Lembrete para você!<h2> <br> <p>Não esqueça de continuar seus estudos, acesse a plataforma G2K e continue seu progresso!</p> `,
  });
};
