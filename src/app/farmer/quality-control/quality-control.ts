import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRulerCombined,
  faPalette,
  faCube,
  faCamera,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.html',
  styleUrls: ['./quality-control.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class QualityControl {
  // Icons
  faSize = faRulerCombined;
  faColor = faPalette;
  faBrix = faCube;
  faCamera = faCamera;
  faCompliance = faCheckCircle;
  faCheckCircle = faCheckCircle;

  // Mock data
  grading = [
    { size: 'Large', count: 120 },
    { size: 'Medium', count: 85 },
    { size: 'Small', count: 40 }
  ];

  colorGrades = [
    { shade: 'Deep Red', consistency: 'Excellent' },
    { shade: 'Light Red', consistency: 'Fair' }
  ];

  brixLevel = 7.8;

  defects = [
    { type: 'Bruising', photo: 'assets/img/defect1.jpg', reason: 'Handling damage' },
    { type: 'Discoloration', photo: 'assets/img/defect2.jpg', reason: 'Storage heat' }
  ];

  complianceChecklist = [
    { item: 'Organic Certified', passed: true },
    { item: 'Export Standards Met', passed: false },
    { item: 'Pesticide Residue Test', passed: true }
  ];
}
