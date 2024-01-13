interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export default class EmailService {
  private limit: number;
  private originalLimit: number;

  constructor() {
    this.limit = 2;
    this.originalLimit = 2;
  }

  sendEmail(payload: EmailPayload) {
    if (this.limit <= 0) {
      console.log("Limit reached");

      this.limit = this.originalLimit;
      return;
    }

    this.limit--;

    const { from, to, subject, body } = payload;

    return new Promise((resolve, reject) => {
      console.log(`Sending Email to ${to}....`);
      setTimeout(() => {
        console.log(`Email sent to ${to}`);
        resolve(1)
      }, 1 * 1000);
    });
  }
}
