import {Component, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {InvestmentInterface} from './view-models/investment-interface';
import {InvestmentService} from './investment.service';
import * as moment from 'moment';
import {DividendsInterface} from './view-models/dividends-interface';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  formEntryRecord = false;
  recordDetails = false;
  investment: InvestmentInterface;
  investments: InvestmentInterface[];
  dividends: DividendsInterface[];
  typeEntry = [{label: 'Compra', value: 'C'}, {label: 'Venda', value: 'V'}];
  typeInvest = [{label: 'Fii', value: 'FII'}, {label: 'Ação', value: 'ACAO'}];
  tmpFormDateEvent;
  payDarf;
  fiiTotal;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  calcTotalDividendos(year: number, qty: number): number{
    let total = 0;
    this.dividends.forEach(div => {
      if (div.year === year){
        div.payments.forEach(pay => {
          total = total + (pay.value * qty);
        });
      }
    });
    return total;
  }

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private investmentService: InvestmentService) {
    this.investment = {};
    this.investments = [];
    this.dividends = [];
    this.fiiTotal = {};

    this.payDarf = {};
  }

  async ngOnInit(): Promise<void> {
    await this.loadInvestments();
  }

  async loadInvestments(): Promise<void>{
    this.investmentService.loadInvestments().then(response => {
      if (response != null){
        this.investments = response;
      } else {
        console.log('error');
      }
    });
  }

  openFormNewInvest(): void {
    this.investment = {};
    this.formEntryRecord = true;
  }

  openFormEditInvest(record: any): void {
    this.investment = record;
    this.tmpFormDateEvent = moment(record.dateEvent).format('DD/MM/YYYY');
    this.formEntryRecord = true;
  }

  openRecordDetails(selectedRecord: any): void {
    this.investment = selectedRecord;
    this.investmentService.loadDividends(this.investment.name, moment(this.investment.dateEvent).format('YYYY-MM-DD'))
      .then(response => {
        if (response !== null){
          this.dividends = response;
        } else {
          console.log('No data');
        }
      });
    // this.calculateInvestFii(this.investment);
    this.recordDetails = true;
  }

  async saveEntry(): Promise<void> {
    this.investment.dateEvent = moment(this.tmpFormDateEvent, 'DD/MM/YYYY').toDate();
    console.log(this.investment);
    await this.investmentService.createInvestment(this.investment).then(response => {
      if (response !== null){
        this.messageService.add({severity: 'info', summary: 'Confirmação', detail: response.message});
      } else {
        this.messageService.add({severity: 'warn', summary: 'Aviso', detail: response.message});
      }
    }).catch(error => {
      console.log('error');
    });
    this.tmpFormDateEvent = null;
    this.formEntryRecord = false;
  }

  updateEntry(): void {
    this.investment.dateEvent = moment(this.tmpFormDateEvent, 'DD/MM/YYYY').toDate();
    this.investmentService.updateInvestment(this.investment).then(response => {
      if (response !== null){
        console.log(response);
      }
    }).catch(error => {
      console.log('error');
    });
    this.tmpFormDateEvent = null;
    this.formEntryRecord = false;
  }

  removeEntry(investment: InvestmentInterface): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      header: 'Confirmar remoção',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.investmentService.deleteInvestment(investment).then(response => {
          if (response !== null){
            this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Registro removido'});
          } else {
            this.messageService.add({severity: 'warn', summary: 'Aviso', detail: 'Falha ao remover registro'});
          }
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Ação rejeitada'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelada', detail: 'Ação cancelada'});
            break;
        }
      }
    });
  }

  // calculateInvestFii(entry: InvestmentInterface): void {
  //   this.fiiTotal = {};
  //   this.payDarf = {};
  //   const allInvestmentFromName = this.investments.filter(invest => invest.name === entry.name);
  //   let valueOfAllActionBuy = 0;
  //   let anySellAction = false;
  //   let investSell: InvestmentInterface = {};
  //   allInvestmentFromName.forEach(investment => {
  //     if (investment.type === 'V') {
  //       anySellAction = true;
  //       investSell = investment;
  //     }
  //     if (investment.type === 'C') {
  //       valueOfAllActionBuy += (investment.value * investment.qty);
  //     }
  //   });
  //   if (anySellAction){
  //     const payDarf = {
  //       name: investSell.name, dateSell: investSell.dateEvent,
  //       valueSell: investSell.value, valueWow: (investSell.value * entry.qty) - valueOfAllActionBuy,
  //       valueOfDarf: (((investSell.value * investSell.qty) - valueOfAllActionBuy) * 20) / 100
  //     };
  //     this.payDarf = {};
  //     this.payDarf = payDarf;
  //   }
  //   this.fiiTotal = {};
  //   this.fiiTotal = {
  //     name: entry.name, totalInvestment: valueOfAllActionBuy
  //   };
  //
  // }

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
    if (type === 'FII'){
      return 'Fii';
    }else{
      return 'Ação';
    }
  }

  getSeverity(type: string): string{
    if (type === 'FII'){
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
