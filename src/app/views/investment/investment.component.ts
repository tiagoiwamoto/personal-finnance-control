import { Component, OnInit } from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  formEntryRecord = false;
  recordDetails = false;
  typeEntry = [{label: 'Compra', value: 'C'}, {label: 'Venda', value: 'V'}];
  typeInvest = [{label: 'Fii', value: 'FII'}, {label: 'Ação', value: 'ACAO'}];
  payDarf;
  fiiTotal;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  dividendos = [
    {
      year: 2020, payments: [
        {month: 1, value: 0.52}, {month: 2, value: 0.42}, {month: 3, value: 0.62},
        {month: 4, value: 0.38}, {month: 5, value: 0.38}, {month: 6, value: 0.62},
        {month: 7, value: 0.22}, {month: 8, value: 0.66}, {month: 9, value: 0.55},
        {month: 10, value: 0.78}, {month: 11, value: 0.47}, {month: 12, value: 0.44}
      ]
    },
    {
      year: 2021, payments: [
        {month: 1, value: 0.42}, {month: 2, value: 0.62}, {month: 3, value: 0.22}
      ]
    }
  ];
  entry;

  entries = [
    {id: 1, name: 'ALZR11', qty: 71, value: 121.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0, dateEvent: '2018-01-01'},
    {id: 2, name: 'BCFF11', qty: 20, value: 91.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0, dateEvent: '2018-02-01'},
    {id: 3, name: 'MXRF11', qty: 100, value: 10.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0, dateEvent: '2018-03-01'},
    {id: 4, name: 'XPML11', qty: 24, value: 88.15, type: 'C', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0.02, dateEvent: '2018-04-01'},
    {id: 5, name: 'ALZR11', qty: 71, value: 131.15, type: 'V', typeInvest: 'FII', taxB3: 0.58, taxCorretagem: 0, dateEvent: '2021-03-24'},
  ];

  calcTotalDividendos(year: number, qty: number): number{
    let total = 0;
    this.dividendos.forEach(div => {
      if (div.year === year){
        div.payments.forEach(pay => {
          total = total + (pay.value * qty);
        });
      }
    });
    return total;
  }

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.entry = {};
    this.fiiTotal = {};
    this.payDarf = {};
  }

  ngOnInit(): void {
  }

  openFormNewInvest(): void {
    this.formEntryRecord = true;
    this.entry = {};
  }

  openFormEditInvest(record: any): void {
    this.entry = record;
    this.formEntryRecord = true;
  }

  openRecordDetails(selectedRecord: any): void {
    this.entry = selectedRecord;
    this.calculateInvestFii(this.entry);
    this.recordDetails = true;
  }

  saveEntry(): void {
    this.entry.id = Math.floor(Math.random() * 9999) + 1 ;
    console.log(this.entry);
    this.entry.dateEvent = '2021-03-24';
    this.entries.push(this.entry);
    this.formEntryRecord = false;
  }

  removeEntry(): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      header: 'Confirmar remoção',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Registro removido'});
      },
      reject: (type) => {
        switch (type) {
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

  calculateInvestFii(entry: any): void {
    this.fiiTotal = {};
    this.payDarf = {};
    const allInvestmentFromName = this.entries.filter(invest => invest.name === entry.name);
    let valueOfAllActionBuy = 0;
    let anySellAction = false;
    let investSell: {
      name: any;
      dateEvent: any;
      value: any;
      qty: any;
    };
    allInvestmentFromName.forEach(investment => {
      if (investment.type === 'V') {
        anySellAction = true;
        investSell = investment;
      }
      if (investment.type === 'C') {
        valueOfAllActionBuy += (investment.value * investment.qty);
      }
    });
    if (anySellAction){
      const payDarf = {
        name: investSell.name, dateSell: investSell.dateEvent,
        valueSell: investSell.value, valueWow: (investSell.value * entry.qty) - valueOfAllActionBuy,
        valueOfDarf: (((investSell.value * investSell.qty) - valueOfAllActionBuy) * 20) / 100
      };
      this.payDarf = {};
      this.payDarf = payDarf;
    }
    this.fiiTotal = {};
    this.fiiTotal = {
      name: entry.name, totalInvestment: valueOfAllActionBuy
    };

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
    if (type === 'C'){
      return 'Compra';
    }else{
      return 'Venda';
    }
  }

  getSeverity(type: string): string{
    if (type === 'C'){
      return 'info';
    }else{
      return 'danger';
    }
  }

  convertMonthNumberToText(month: number): string{
    switch (month){
      case 1:
        return 'Janeiro';
      case 2:
        return 'Fevereiro';
      case 3:
        return 'Março';
      case 4:
        return 'Abril';
      case 5:
        return 'Maio';
      case 6:
        return 'Junho';
      case 7:
        return 'Julho';
      case 8:
        return 'Agosto';
      case 9:
        return 'Setembro';
      case 10:
        return 'Outubro';
      case 11:
        return 'Novembro';
      case 12:
        return 'Dezembro';
    }
  }

}
