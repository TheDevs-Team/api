import { Request, Response } from 'express';
import { sendMailPendings, sendMailClass, sendMailNewCourses } from '~/utils';
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
            return sendMailPendings(user.email);
          }

          return;
        });
      }

      if (new_courses) {
        setTimeout(() => {
          users.map((user: UserType) => sendMailNewCourses(user.email));
        }, 60000);
      }

      if (class_notification) {
        users.map((user: UserType) => sendMailClass(user.email));
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true });
    }
  }
}

export default new NotificationController();
