import { Password_recovery } from '../../models';

export class PasswordRecoveryRepository {
  async createRecoveryPassword({ email, token }) {
    await Password_recovery.create({
      email: email.trim(),
      token,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }
}
