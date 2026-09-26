export class Contrato {
  constructor(
    public id: string,
    public organizacaoId: string,
    public dataAssinatura: Date,
    public dataVencimento: Date,
    public clausulas: string[],
    public valorMensal: number,
    public renovacaoAutomatica: boolean,
  ) {}

  estaVigente(): boolean {
    const agora = new Date();
    return this.dataAssinatura <= agora && this.dataVencimento >= agora;
  }

  renovar(novoVencimento: Date): void {
    if (novoVencimento <= this.dataVencimento) {
      throw new Error("O novo vencimento deve ser posterior ao vencimento atual.");
    }
    this.dataVencimento = novoVencimento;
  }
}
