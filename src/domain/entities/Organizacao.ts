import { Contrato } from "./Contrato.js";

export class Organizacao {
  constructor(
    public id: string,
    public razaoSocial: string,
    public cnpj: string,
    public inscricaoEstadual: string,
    public enderecoCompleto: string,
    public telefone: string,
    public email: string,
    public dataCadastro: Date,
    public ativo: boolean,
    public contratoVigente: Contrato,
  ) {}

  alterarEndereco(novoEndereco: string): void {
    if (!novoEndereco.trim()) throw new Error("O endereço não pode ser vazio.");
    this.enderecoCompleto = novoEndereco.trim();
  }

  desativar(): void {
    this.ativo = false;
  }
}
