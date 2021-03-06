import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './views/core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import { InvestmentComponent } from './views/investment/investment.component';
import {DividerModule} from 'primeng/divider';
import {CarouselModule} from 'primeng/carousel';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ChipModule} from 'primeng/chip';
import {DialogModule} from 'primeng/dialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TooltipModule} from 'primeng/tooltip';
import {BadgeModule} from 'primeng/badge';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TabViewModule} from 'primeng/tabview';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MatChipsModule} from '@angular/material/chips';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    InvestmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    ButtonModule,
    RippleModule,
    CardModule,
    DataViewModule,
    TableModule,
    ToastModule,
    DividerModule,
    CarouselModule,
    ToolbarModule,
    SplitButtonModule,
    ChipModule,
    DialogModule,
    SelectButtonModule,
    TooltipModule,
    BadgeModule,
    MessagesModule,
    MessageModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    TabViewModule,
    FormsModule,
    InputTextModule,
    TextMaskModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
