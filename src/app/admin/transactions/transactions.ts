import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMoneyBill, faUser, faSearch, faFileCsv,
  faFilter, faCheckCircle, faClock, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Transaction, TransactionDataService } from './transactions-data';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  filtered: Transaction[] = [];
  searchQuery = '';
  selectedStatus = 'All';

  // Font Awesome Icons
  faMoneyBill = faMoneyBill;
  faUser = faUser;
  faSearch = faSearch;
  faFileCsv = faFileCsv;
  faFilter = faFilter;
  faCheckCircle = faCheckCircle;
  faClock = faClock;
  faTimes = faTimes;

  constructor(private txService: TransactionDataService) {}

  ngOnInit(): void {
    this.txService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.filtered = data;
    });
  }

  search(): void {
    const q = this.searchQuery.toLowerCase();
    this.filtered = this.transactions.filter(tx =>
      tx.user.toLowerCase().includes(q) ||
      tx.method.toLowerCase().includes(q) ||
      tx.orderId.toLowerCase().includes(q)
    );
  }

  filterStatus(): void {
    if (this.selectedStatus === 'All') {
      this.filtered = [...this.transactions];
    } else {
      this.filtered = this.transactions.filter(tx => tx.status === this.selectedStatus);
    }
  }

  exportCSV(): void {
    const csv = this.filtered.map(tx => ({
      ID: tx.id,
      User: tx.user,
      Role: tx.role,
      Amount: tx.amount,
      Method: tx.method,
      Status: tx.status,
      Date: tx.date,
      Order: tx.orderId
    }));

    const content = [
      Object.keys(csv[0]).join(','),
      ...csv.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  }
}