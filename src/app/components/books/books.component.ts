import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/models/book';
import { PaginatedResult, Pagination } from 'src/app/models/Pagination';
import { Publishingcompany } from 'src/app/models/Publishingcompany';
import { BookService } from 'src/app/services/book.service';
import { PublishingcompanyService } from 'src/app/services/publishingcompany.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  public alunoForm: FormGroup;
  public title = 'Books';
  public alunoSelecionado: Book;
  public textSimple: string;
  public profsAlunos: Publishingcompany[];
  public alunos: Book[];
  public aluno: Book;
  public msnDeleteAluno: string;
  public modeSave = 'post';
  pagination: Pagination;

  private unsubscriber = new Subject();

  constructor(
    private alunoService: BookService,
    private route: ActivatedRoute,
    private professorService: PublishingcompanyService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.criarForm();
  }

  professoresAlunos(template: TemplateRef<any>, id: number): void {
    this.spinner.show();
    this.professorService.getByAlunoId(id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((professores: Publishingcompany[]) => {
        this.profsAlunos = professores;
        this.modalRef = this.modalService.show(template);
      }, (error: any) => {
        this.toastr.error(`erro: ${error.message}`);
        console.error(error.message);
        this.spinner.hide();
      }, () => this.spinner.hide()
    );
  }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 4 } as Pagination;
    this.carregarAlunos();
  }

  criarForm(): void {
    this.alunoForm = this.fb.group({
      id: [0],
      img: null,
      title: ['', Validators.required],
      gender: null,
      description: 'eeeee',
      author: ['', Validators.required],
      quantities: ['', Validators.required],
      publicationDate: '0001-01-01T00:00:00',
      publishingcompanyid: 1
    });
  }

  saveAluno(): void {
    if (this.alunoForm.valid) {
      this.spinner.show();

      if (this.modeSave === 'post') {
        this.aluno = {...this.alunoForm.value};
      } else {
        this.aluno = {id: this.alunoSelecionado.id, ...this.alunoForm.value};
      }

      this.alunoService[this.modeSave](this.aluno)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
          () => {
            this.carregarAlunos();
            this.toastr.success('Aluno salvo com sucesso!');
          }, (error: any) => {
            this.toastr.error(`Erro: Aluno não pode ser salvo!`);
            console.error(error.message);
            this.spinner.hide();
          }, () => this.spinner.hide()
        );

    }
  }

  carregarAlunos(): void {
    const id = + this.route.snapshot.paramMap.get('id');

    this.spinner.show();
    this.alunoService.getAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((alunos: PaginatedResult<Book[]>) => {
        this.alunos = alunos.result;
        this.pagination = alunos.pagination;

        if (id > 0) {
          this.alunoSelect(this.alunos.find(aluno => aluno.id === id));
        }

        this.toastr.success('Alunos foram carregado com Sucesso!');
      }, (error: any) => {
        this.toastr.error('Alunos não carregados!');
        console.error(error.message);
        this.spinner.hide();
      }, () => this.spinner.hide()
    );
  }

  pageChanged(event: any): void {
   this.pagination.currentPage = event.page;
   this.carregarAlunos();
  }

  alunoSelect(aluno: Book): void {
    this.modeSave = 'patch';
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar(): void {
    this.alunoSelecionado = null;
  }

  openModal(template: TemplateRef<any>, alunoId: number): void {
    this.professoresAlunos(template, alunoId);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(void 0);
    this.unsubscriber.complete();
  }

}
