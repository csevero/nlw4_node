import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    
    //usando o fs (file system) para fazemos a leitura do arquivo referenciado acima, ou seja, passamos ele como paraêmtro e depois disso passamos ele para string com o tipo utf-8 de encode
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    //passando para o handlebars o arquivo já compilado para toString
    const mailTemplateParse = handlebars.compile(templateFileContent);

    //passando um objeto com as variáveis que nosso template espera
    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "MPS <noreply@mps.com.br>",
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
