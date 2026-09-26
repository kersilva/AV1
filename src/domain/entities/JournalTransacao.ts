export class JournalTransacao {
  constructor(
    public id: string,
    public timestamp: Date,
    public operacao: string,
    public entidade: string,
    public dadosAntes: any,
    public dadosDepois: any,
    public usuarioResponsavel: string,
  ) {}

  registrar(): void {
    if (!this.id || !this.operacao || !this.entidade || !this.usuarioResponsavel) {
      throw new Error("Transação sem os dados obrigatórios de auditoria.");
    }
    if (Number.isNaN(this.timestamp.getTime())) throw new Error("Data da transação inválida.");
  }

  reverter(): boolean {
    return this.dadosAntes !== undefined;
  }
}
