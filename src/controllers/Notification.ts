import { Request, Response } from 'express';
import { sendSMS } from '~/utils';

class NotificationController {
  async sendSMS(req: Request, res: Response): Promise<Response> {
    try {
      await sendSMS('Mensagem de teste', ['5511963851702']);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(400).json({ error: true });
    }
  }
}

export default new NotificationController();
