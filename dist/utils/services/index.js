'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require('nodemailer'));
const sendMail = (email, name, id) => {
  // Configurando conta para enviar e-mails
  const transporter = nodemailer_1.default.createTransport({
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
    html: `${name}, Seu cadastro foi realizado com sucesso em nossa plataforma! <br><br> Agora você só precisa criar sua senha e ativar sua conta agora mesmo! <br><br> <a href="http://localhost:3000/active-account?id=${id}"> <strong>Clique aqui para ativar sua conta.</strong></a>`,
  });
};
exports.sendMail = sendMail;
