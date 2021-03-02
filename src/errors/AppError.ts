//classe criada para retornamos um erro customizável para o usuário, basicamente, esperamos uma mensagem e um código que definimos como 400, mas pode ser alterado caso preciso, e para chamarmos ele no controller devemos usar throw new AppError().
export class AppError {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
