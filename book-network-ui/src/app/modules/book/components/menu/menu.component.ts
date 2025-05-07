import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
    standalone: true, // ✅ THIS IS REQUIRED
    imports: [CommonModule],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

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
      }

}
