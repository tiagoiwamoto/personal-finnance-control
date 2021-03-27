import {DividendsPaymentInterface} from './dividends-payment-interface';

export interface DividendsInterface {
  year?: number;
  payments?: DividendsPaymentInterface[];
}
