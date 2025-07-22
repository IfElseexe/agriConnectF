import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExclamationTriangle,
  faSearch,
  faCheck,
  faTimes,
  faEye
} from '@fortawesome/free-solid-svg-icons';

export interface Dispute {
  id: string;
  orderId: string;
  buyer: string;
  farmer: string;
  reason: string;
  status: 'Open' | 'Escalated' | 'Resolved';
  createdAt: string;
}

@Component({
  selector: 'app-disputes',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './disputes.html',
  styleUrls: ['./disputes.scss']
})
export class Disputes implements OnInit {
  faAlert = faExclamationTriangle;
  faSearch = faSearch;
  faResolve = faCheck;
  faReject = faTimes;
  faView = faEye;

  disputes: Dispute[] = [];
  filteredDisputes: Dispute[] = [];
  searchTerm = '';
  selectedStatus = 'All';

  ngOnInit(): void {
    // Dummy data
    this.disputes = [
      {
        id: 'DSP001',
        orderId: 'ORD234',
        buyer: 'Benita Inalegwu',
        farmer: 'Emmanuel Ajibade',
        reason: 'Product did not match listing',
        status: 'Open',
        createdAt: '2025-07-01T10:00:00Z'
      },
      {
        id: 'DSP002',
        orderId: 'ORD235',
        buyer: 'John Doe',
        farmer: 'Grace Farm Ltd',
        reason: 'Late delivery',
        status: 'Escalated',
        createdAt: '2025-07-02T09:15:00Z'
      }
    ];
    this.filteredDisputes = [...this.disputes];
  }

  filterDisputes(): void {
    this.filteredDisputes = this.disputes.filter(d => {
      const matchStatus = this.selectedStatus === 'All' || d.status === this.selectedStatus;
      const matchSearch =
        d.buyer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        d.farmer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        d.orderId.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchStatus && matchSearch;
    });
  }

  resolveDispute(d: Dispute) {
    d.status = 'Resolved';
  }

  rejectDispute(d: Dispute) {
    d.status = 'Escalated';
  }

  viewDetails(d: Dispute) {
    alert(`Viewing dispute: ${d.id}`);
  }
}