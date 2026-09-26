import { scryptSync, timingSafeEqual } from "node:crypto";
import { PapelUsuario } from "../enums/PapelUsuario.js";

export class Credencial {
  constructor(
    public usuario: string,
    public hashSenha: string,
    public salt: string,
    public ultimoAcesso: Date,
    public papel: PapelUsuario,
  ) {}

  verificarSenha(senhaPlana: string): boolean {
    const esperado = Buffer.from(this.hashSenha, "hex");
    const obtido = scryptSync(senhaPlana, this.salt, esperado.length);
    return esperado.length === obtido.length && timingSafeEqual(esperado, obtido);
  }

  atualizarUltimoAcesso(): void {
    this.ultimoAcesso = new Date();
  }
}
