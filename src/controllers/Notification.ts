import { Request, Response } from 'express';
import { sendSMS, sendMail } from '~/utils';
import { User as UserModel } from '~/models';
import { getRepository } from 'typeorm';

class NotificationController {
  async sendPendings(req: Request, res: Response): Promise<Response> {
    try {
      const { sms }: SendNotificationType = req.body;
      const User = getRepository(UserModel);

      const users = (await User.find({ where: { financial_status: 'WAITING_PAYMENT', active: true } })) as UserModel &
        UserType[];

      users.map((user: UserType) => console.log(user.phone));

      if (sms) {
        await sendSMS('via email tmb', '5511963851702');
      }

      // if (email) {
      //   sendMail('guevaristo@grupofreitas.com.br', 'Gustavo Freitas', '123@senac');
      // }

      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: true });
    }
  }

  async sendAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const { sms, email }: SendNotificationType = req.body;
      const User = getRepository(UserModel);

      const users = (await User.find({ where: { active: true } })) as UserModel & UserType[];

      if (sms) {
        let count = 0;

        setInterval(async () => {
          await sendSMS('Tem cursos novo na G2K, acesse e continue seus estudos.', users[count].phone);
          count += 1;
        }, 5000);
      }

      if (email) {
        users.map((user: UserType) =>
          sendMail(
            user.email,
            'Tem curso novo na area',
            'Teste abc',
            '<p>Cursos novos te esperam na G2K<p><br><br><p><strong>Acesse a plataforma e comece seus estudos agora mesmo<strong><p>',
          ),
        );
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: true });
    }
  }
}

export default new NotificationController();
