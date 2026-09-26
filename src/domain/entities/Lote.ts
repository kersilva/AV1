import { StatusLote } from "../enums/StatusLote.js";
import { Equipamento } from "./Equipamento.js";

export class Lote {
  constructor(
    public id: string,
    public dataEntrada: Date,
    public organizacaoId: string,
    public notaFiscal: string,
    public transportadora: string,
    public equipamentos: Equipamento[] = [],
    public statusProcessamento: StatusLote = StatusLote.RECEBIDO,
    public observacoes = "",
  ) {}

  adicionarEquipamento(equipamento: Equipamento): void {
    if (equipamento.loteId !== this.id) throw new Error("O equipamento referencia outro lote.");
    if (this.equipamentos.some((item) => item.id === equipamento.id)) {
      throw new Error("O equipamento já foi adicionado ao lote.");
    }
    equipamento.posicaoNoLote = this.equipamentos.length + 1;
    this.equipamentos.push(equipamento);
  }

  removerEquipamento(equipamentoId: string): boolean {
    const index = this.equipamentos.findIndex((item) => item.id === equipamentoId);
    if (index < 0) return false;
    this.equipamentos.splice(index, 1);
    this.equipamentos.forEach((item, pos) => { item.posicaoNoLote = pos + 1; });
    return true;
  }

  calcularPesoTotal(): number {
    return this.equipamentos.reduce((total, item) => total + item.pesoQuilogramas, 0);
  }

  gerarRelatorioTriagem(): string {
    const porStatus = this.equipamentos.reduce<Record<string, number>>((contagem, item) => {
      const chave = String(item.statusRastreamento);
      contagem[chave] = (contagem[chave] ?? 0) + 1;
      return contagem;
    }, {});
    return JSON.stringify({ loteId: this.id, total: this.equipamentos.length, porStatus }, null, 2);
  }
}
