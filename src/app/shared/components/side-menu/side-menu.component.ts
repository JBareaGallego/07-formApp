import { Component } from '@angular/core';

interface MenuItem{
  title : string,
  route : string,
}


@Component({
  selector: 'shared-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public reactiveMenu: MenuItem[]= [
    {title:'Basics', route: './reactive/basics'},
    {title:'Dynamic', route: './reactive/dynamic'},
    {title:'Switches', route: './reactive/switches'},

  ]
  public AuthMenu: MenuItem[]= [
    {title:'Register', route: './auth'},


  ]
}
