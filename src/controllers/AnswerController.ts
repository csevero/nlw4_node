import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  async execute(req: Request, res: Response) {
    /* Usamos além do req params também o req query que é atributos não obrigatórios mas que podem ser uteis para por exemplo no nosso caso pegar o id específico da pesquisa que está sendo respondida */
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    /* Verificando se a pesquisa que foi passada no query existe, estamos forçando o query a ser uma string */
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey user does not exists");
    }

    /* Caso exista a pesquisa, nós vamos atualizar o campo value da tabela surveyuser que vem por default como null, e novamente estamos forçando para que o value seja um número */
    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
