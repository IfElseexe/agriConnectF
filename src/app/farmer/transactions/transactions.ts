import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  faMoneyBillWave,
  faWallet,
  faExchangeAlt,
  faTimesCircle,
  faSearch,
  faArrowDown,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule]
})
export class Transactions {
  // Icons
  faWallet = faWallet;
  faEarnings = faMoneyBillWave;
  faExchange = faExchangeAlt;
  faFailed = faTimesCircle;
  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  // Filter & Modal
  search = '';
  filterType = '';
  filterStatus = '';
  showWithdrawModal = false;

  // Summary
  totalEarnings = 254000;
  pendingWithdrawals = 40000;
  completedCount = 24;
  failedCount = 2;

  transactions = [
    {
      id: 'TXN-101',
      type: 'Credit',
      amount: 5000,
      status: 'Completed',
      date: '2025-07-08',
      description: 'Sale of Tomatoes'
    },
    {
      id: 'TXN-102',
      type: 'Debit',
      amount: 15000,
      status: 'Pending',
      date: '2025-07-07',
      description: 'Withdrawal Request'
    },
    {
      id: 'TXN-103',
      type: 'Credit',
      amount: 9000,
      status: 'Completed',
      date: '2025-07-06',
      description: 'Sale of Maize'
    },
    {
      id: 'TXN-104',
      type: 'Debit',
      amount: 2000,
      status: 'Failed',
      date: '2025-07-05',
      description: 'Bank Transfer'
    }
  ];

  get filteredTransactions() {
    return this.transactions.filter(txn =>
      (this.search === '' || txn.description.toLowerCase().includes(this.search.toLowerCase()) || txn.id.toLowerCase().includes(this.search.toLowerCase())) &&
      (this.filterType === '' || txn.type === this.filterType) &&
      (this.filterStatus === '' || txn.status === this.filterStatus)
    );
  }

  openWithdrawModal() {
    this.showWithdrawModal = true;
  }

  closeWithdrawModal() {
    this.showWithdrawModal = false;
  }

  requestWithdrawal() {
    // Add logic later
    this.showWithdrawModal = false;
  }
}
