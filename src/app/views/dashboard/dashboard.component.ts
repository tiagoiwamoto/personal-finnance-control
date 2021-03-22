import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  responsiveOptions;
  entries = [
    {id: 1, name: 'ALZR11', qty: 71, value: 121.15, type: 'C', taxB3: 0.58, taxCorretagem: 0},
    {id: 1, name: 'BCFF11', qty: 20, value: 91.15, type: 'C', taxB3: 0.58, taxCorretagem: 0},
    {id: 1, name: 'MXRF11', qty: 100, value: 10.15, type: 'C', taxB3: 0.58, taxCorretagem: 0},
    {id: 1, name: 'XPML11', qty: 24, value: 88.15, type: 'C', taxB3: 0.58, taxCorretagem: 0.02},
  ];

  analisys = [
    {title: 'Fii', author: 'Tiago Henrique Iwamoto', datetime: '2021-03-01 10:01:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {title: 'Ações BTOW', author: 'Tiago Henrique Iwamoto', datetime: '2021-03-01 10:01:00', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.'},
    {title: 'Opções', author: 'Tiago Henrique Iwamoto', datetime: '2021-03-01 10:01:00', text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.'},
    {title: 'Fii', author: 'Tiago Henrique Iwamoto', datetime: '2021-03-01 10:01:00', text: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
  ];

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
  }

}
