import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  positionsubTitle: number = -480;
  public filteredEvents : any;
  widthImg: number = 80;
  marginImg: number = 2;
  changeImg: boolean = false;
  private _listFilter: string = '';
  constructor(private http: HttpClient) { }

  public get listFilter() : string{
    return this._listFilter;
  }

  public set listFilter(value: string){
    this._listFilter = value;
    this.filteredEvents = this.listFilter ?  this.filterEvents(this.listFilter) : this.eventos;
  }

  filterEvents(filterBy: string): any
  {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
    (evento : any) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1

    )
  }

  ngOnInit(): void {
    this.getEventos();
  }

  showImg(){
    this.changeImg = !this.changeImg;
  }
  /*Metodo para pegar a API no back-end*/
  public getEventos(): void{
   this.http.get('https://localhost:5001/api/eventos').subscribe(
     Response => {
       this.eventos = Response
       this.filteredEvents = this.eventos;
    },
     error => console.log(error)
    );
  }
}
