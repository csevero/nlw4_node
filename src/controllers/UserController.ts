import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRepository";
class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    //usando o yup para fazer uma validação da tablea, fazendo com que fique cada vez menos possível de acontecer algum erro na nossa aplicação, o required pode receber uma strin dentro que será o erro que vai ser retornado caso não seja pssado o dado específico
    const schema = yup.object().shape({
      name: yup.string().required("Nome obrigatório!"),
      email: yup.string().email().required("Verifique o email digitado"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError("Users already exists");
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }
}

export { UserController };

