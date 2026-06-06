import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contato, TipoContato } from '../models/contato.model';

@Component({
  selector: 'app-adiciona-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adiciona-contato.component.html',
  styleUrls: ['./adiciona-contato.component.css'],
})
export class AdicionaContatoComponent implements OnInit {
  formulario!: FormGroup;
  contatos: Contato[] = [];
  tiposContato = Object.values(TipoContato);
  mensagemSucesso: string = '';
  contatoEditandoIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      telefone: [
        '',
        [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      aniversario: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nome, telefone, email, aniversario, tipo } = this.formulario.value;
    const novoContato = new Contato(nome, telefone, email, aniversario, tipo as TipoContato);

    if (this.contatoEditandoIndex !== null) {
      this.contatos[this.contatoEditandoIndex] = novoContato;
      this.mensagemSucesso = `Contato "${nome}" atualizado com sucesso!`;
      this.contatoEditandoIndex = null;
    } else {
      this.contatos.push(novoContato);
      this.mensagemSucesso = `Contato "${nome}" adicionado com sucesso!`;
    }

    this.formulario.reset();
    setTimeout(() => (this.mensagemSucesso = ''), 3000);
  }

  editarContato(index: number): void {
    const c = this.contatos[index];
    this.contatoEditandoIndex = index;
    this.formulario.setValue({
      nome: c.getNome(),
      telefone: c.getTelefone(),
      email: c.getEmail(),
      aniversario: c.getAniversario(),
      tipo: c.getTipo(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  removerContato(index: number): void {
    this.contatos.splice(index, 1);
  }

  cancelarEdicao(): void {
    this.contatoEditandoIndex = null;
    this.formulario.reset();
  }

  isInvalid(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  getTipoBadgeClass(tipo: string): string {
    const map: { [key: string]: string } = {
      'Amigo(a)': 'badge-amigo',
      'Família': 'badge-familia',
      'Trabalho': 'badge-trabalho',
      'Conhecido(a)': 'badge-conhecido',
      'Outro': 'badge-outro',
    };
    return map[tipo] || 'badge-outro';
  }

  getIniciais(nome: string): string {
    return nome
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}