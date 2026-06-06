export enum TipoContato {
  AMIGO = 'Amigo(a)',
  FAMILIA = 'Família',
  TRABALHO = 'Trabalho',
  CONHECIDO = 'Conhecido(a)',
  OUTRO = 'Outro',
}

export class Contato {
  constructor(
    private nome: string,
    private telefone: string,
    private email: string,
    private aniversario: string,
    private tipo: TipoContato
  ) {}

  getNome() { return this.nome; }
  getTelefone() { return this.telefone; }
  getEmail() { return this.email; }
  getAniversario() { return this.aniversario; }
  getTipo() { return this.tipo; }
}