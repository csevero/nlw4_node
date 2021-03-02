import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

import { resolve } from "path";
import { AppError } from "../errors/AppError";

class SendEmailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("User not found");
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError("Survey does not exists");
    }

    /* Basicamente usamos o where para buscar o id do usuário que tenha um valor null, ou seja, se ele tem um valor null é porque ele já está criado, caso não encontre ele irá criar uma novo, abaixo no relations, é basicamente para fazermos a population da coluna user e a suvey que são foreign key da tabela SurveysUsers */
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { id_user: user.id, value: null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    //usando o resolve do path, basicamente o __dirname irá pegar o diretório atual da nosso projeto que no caso é E:\Documentos\Arquivos\Programacao\JS\Nlw_4\server, e a partir disso vamos começar a nos movimentar, voltando 1 diretorio e indo ao email e ao arquivo .hbs
    const path = resolve(__dirname, "..", "views", "emails", "mpsMail.hbs");

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, path);
      return res.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      id_user: user.id,
      id_survey: survey.id,
    });

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, path);

    return res.status(201).json(surveyUser);
  }
}

export { SendEmailController };
