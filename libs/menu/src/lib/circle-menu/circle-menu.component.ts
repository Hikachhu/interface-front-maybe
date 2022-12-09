import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BoutonCircleMenu} from "../bouton-circle-menu";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'interface-front-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CircleMenuComponent implements OnInit {
  buttonList: BoutonCircleMenu[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit(): void {
    this.buttonList.push(
      new BoutonCircleMenu('/home', 'Acceuil'),
      new BoutonCircleMenu('/account', 'Profile'),
      new BoutonCircleMenu('/setting', 'Parametres'),
      new BoutonCircleMenu('/help', 'Aide'),
      new BoutonCircleMenu('/about', 'A propos')
    );
  }

  toPage(param: String) {
    this.router.navigate([param]);
  }
}
