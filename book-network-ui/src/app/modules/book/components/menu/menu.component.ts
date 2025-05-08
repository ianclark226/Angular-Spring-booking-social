import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if(window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
          }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'))
          link.classList.add('active')
          })
        })
      }


logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}
