import { Component, OnInit } from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  novaEntrada = false;
  typeEntry = [{label: 'Compra', value: 'C'}, {label: 'Venda', value: 'V'}];
  typeInvest = [{label: 'Fii', value: 'FII'}, {label: 'Ação', value: 'ACAO'}];
  entry;

  entries = [
    {id: 1, name: 'ALZR11', qty: 71, value: 121.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0},
    {id: 2, name: 'BCFF11', qty: 20, value: 91.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0},
    {id: 3, name: 'MXRF11', qty: 100, value: 10.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0},
    {id: 4, name: 'XPML11', qty: 24, value: 88.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0.02},
  ];

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.entry = {};
  }

  ngOnInit(): void {
  }

  openFormNewInvest(): void {
    this.novaEntrada = true;
    this.entry = {};
  }

  saveEntry(): void {
    this.entry.id = Math.floor(Math.random() * 9999) + 1 ;
    console.log(this.entry);
    this.entries.push(this.entry);
    this.novaEntrada = false;
  }

  removeEntry(): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      header: 'Confirmar remoção',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Registro removido'});
      },
      reject: (type) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelada', detail: 'Ação cancelada'});
            break;
        }
      }
    });
  }

  validQtyOnlyNumber(event): boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validValue(event): boolean{
    if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 44 || event.keyCode === 46){
      return true;
    }else{
      return false;
    }
  }

  getType(type: string): string{
    if(type === 'C'){
      return 'Compra';
    }else{
      return 'Venda';
    }
  }

}
