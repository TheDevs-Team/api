import { Request, Response } from 'express';
import { sendMail } from '~/utils';
import { User as UserModel } from '~/models';
import { getRepository } from 'typeorm';

class NotificationController {
  async pendings(req: Request, res: Response): Promise<Response> {
    try {
      const User = getRepository(UserModel);

      const users = (await User.find({ where: { active: true, financial_status: 'WAITING_PAYMENT' } })) as UserModel &
        UserType[];

      users.map((user: UserType) =>
        sendMail(
          user.email,
          'Pagamento',
          `<strong>${user.name}</strong> Você possui pendencias com a G2K. <br>Entre em contato com a instituição e regulariza sua situação.<br><br>(11) 98765-4321  -  contato@g2kinvestimentos.com.br`,
        ),
      );

      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: true });
    }
  }
}

export default new NotificationController();
