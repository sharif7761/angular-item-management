import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  items: Item[] = [];
  page: number = 1;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.itemService.getItems().sort((a, b) => b.id - a.id);
  }

  confirmDelete(id: number): void {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.deleteItem(id);
    }
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id);
    this.loadItems();
  }
}
