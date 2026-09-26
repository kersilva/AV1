import { PapelUsuario } from "../enums/PapelUsuario.js";

export class Sessao {
  constructor(
    public token: string,
    public usuario: string,
    public papel: PapelUsuario,
    public criadoEm: Date,
    public expiracao: Date,
  ) {}

  isValida(): boolean {
    return new Date() < this.expiracao;
  }

  renovar(): void {
    this.expiracao = new Date(Date.now() + 30 * 60 * 1000);
  }
}
