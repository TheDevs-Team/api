import { Request, Response } from 'express';
import { sendSMS, sendMail } from '~/utils';
import { User as UserModel } from '~/models';
import { getRepository } from 'typeorm';

class NotificationController {
  async sendSMS(req: Request, res: Response): Promise<Response> {
    try {
      await sendSMS('Mensagem de teste', '5511963851702');
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: true });
    }
  }

  async sendPendings(req: Request, res: Response): Promise<Response> {
    try {
      const { sms, email }: SendNotificationType = req.body;
      const User = getRepository(UserModel);

      const users = (await User.find({ where: { financial_status: 'WAITING_PAYMENT' } })) as UserModel & UserType[];

      users.map((user: UserType) => console.log(user.phone));

      if (sms) {
        await sendSMS('via email tmb', '5511963851702');
      }

      if (email) {
        sendMail('guevaristo@grupofreitas.com.br', 'Gustavo Freitas', '123@senac');
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: true });
    }
  }
}

export default new NotificationController();
