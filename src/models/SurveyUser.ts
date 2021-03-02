import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  id_user: string;

  /* Comando usado para fazer join de colunas e listar de uma forma que seja mais fácil a visualização, baiscamente, fazemos a referência, n -> 1, indicando o model da column, e dá um join fazendo referência (name) á coluna que é uma FK */
  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column()
  id_survey: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "id_survey" })
  survey: Survey;

  @Column()
  value: Number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
