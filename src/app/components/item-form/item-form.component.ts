import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent {
  item: Item = { id: 0, title: '', description: '', image: '' };
  isEdit: boolean = false;

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      const items = this.itemService.getItems();
      this.item = items.find(item => item.id === id) || this.item;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.item.image = reader.result as string; // Convert to Base64 string
      };
    }
  }

  saveItem() {
    if (this.isEdit) {
      this.itemService.updateItem(this.item);
    } else {
      this.item.id = Date.now();
      this.itemService.addItem(this.item);
    }
    this.router.navigate(['/']);
  }
}
