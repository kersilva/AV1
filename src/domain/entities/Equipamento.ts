import { EstadoFisico } from "../enums/EstadoFisico.js";
import { StatusRastreamento } from "../enums/StatusRastreamento.js";
import { TipoEquipamento } from "../enums/TipoEquipamento.js";
import { Movimentacao } from "./Movimentacao.js";

export class Equipamento {
  constructor(
    public id: string,
    public codigoBarrasInterno: string,
    public tipo: TipoEquipamento,
    public marca: string,
    public modelo: string,
    public anoFabricacao: number,
    public estadoFisico: EstadoFisico,
    public pesoQuilogramas: number,
    public loteId: string,
    public posicaoNoLote: number,
    public statusRastreamento: StatusRastreamento,
    public historicoMovimentacao: Movimentacao[] = [],
  ) {}

  atualizarStatus(novoStatus: StatusRastreamento, justificativa: string): void {
    const triagemConcluida = this.statusRastreamento === StatusRastreamento.AGUARDANDO_DESMONTE ||
      this.statusRastreamento === StatusRastreamento.EM_DESMONTE ||
      this.statusRastreamento === StatusRastreamento.PECAS_REAPROVEITADAS ||
      this.statusRastreamento === StatusRastreamento.MATERIAL_RECICLAVEL ||
      this.statusRastreamento === StatusRastreamento.DESCARTE_SEGURO ||
      this.statusRastreamento === StatusRastreamento.BAIXA_DEFINITIVA;
    if (novoStatus === StatusRastreamento.EM_DESMONTE && !triagemConcluida) {
      throw new Error("O equipamento precisa concluir a triagem antes do desmonte.");
    }
    if (!justificativa.trim()) throw new Error("Informe a justificativa da mudança de status.");
    this.statusRastreamento = novoStatus;
  }

  registrarMovimentacao(destino: string, responsavel: string): void {
    const movimentacao = new Movimentacao(
      `${this.id}-${Date.now()}`, this.id, new Date(), "", destino, responsavel, "",
    );
    this.historicoMovimentacao.push(movimentacao);
  }

  calcularDepreciacao(): number {
    const taxaAnual = 0.2;
    const anoAtual = new Date().getFullYear();
    const idade = Math.max(0, anoAtual - this.anoFabricacao);
    return Math.min(1, Math.max(0, taxaAnual * idade));
  }
}
