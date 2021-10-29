import { Request, Response } from 'express';
import { sendMail } from '~/utils';
import { User as UserModel } from '~/models';
import { getRepository } from 'typeorm';

class NotificationController {
  async send(req: Request, res: Response): Promise<Response> {
    try {
      const { pendings, class_notification, new_courses }: NotificationOptionsType = req.body;

      const User = getRepository(UserModel);

      const users = (await User.find({ where: { active: true } })) as UserModel & UserType[];

      if (pendings) {
        users.map((user: UserType) => {
          if (user.financial_status === 'WAITING_PAYMENT') {
            return sendMail(
              user.email,
              'Pagamento',
              `<strong>${user.name}</strong> Você possui pendencias com a G2K. <br>Entre em contato com a instituição e regulariza sua situação.<br><br>(11) 98765-4321  -  contato@g2kinvestimentos.com.br`,
            );
          }

          return;
        });
        console.log('mandei os pendentes');
      }

      if (new_courses) {
        setTimeout(() => {
          users.map((user: UserType) =>
            sendMail(
              user.email,
              'Novos cursos disponíveis',
              `<strong>${user.name}</strong>, Novos cursos foram disponibilizados na plataforma, corra e evolua seus estudos para o proximo nível. <br> <a href="#">www.google.com</a>`,
            ),
          );
          console.log('mandei os cursos disponiveis');
        }, 60000);
      }

      if (class_notification) {
        users.map((user: UserType) =>
          sendMail(
            user.email,
            'Lembrete de aula',
            `<strong>${user.name}</strong>, Estamos aqui para lembrar e motivar os seus estudos, acesse a plataforma e de continuidade a seus estudos. <br> <a href="#">www.google.com</a>`,
          ),
        );
        console.log('mandei os lembretes');
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true });
    }
  }
}

export default new NotificationController();
