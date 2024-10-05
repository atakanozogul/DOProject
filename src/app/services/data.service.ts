import { Injectable } from '@angular/core';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private crews: Crew[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'American',
      title: 'Captain',
      daysOnBoard: 120,
      dailyRate: 200,
      currency: 'USD',
      totalIncome: 24000,
      certificates: [
        { id: 1, certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { id: 2, certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      nationality: 'British',
      title: 'Engineer',
      daysOnBoard: 90,
      dailyRate: 180,
      currency: 'EUR',
      totalIncome: 16200,
      certificates: [
        { id: 3, certificateType: 'Type C', issueDate: '2021-03-01', expiryDate: '2023-03-01' },
        { id: 4, certificateType: 'Type D', issueDate: '2021-04-01', expiryDate: '2023-04-01' }
      ]
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      nationality: 'Canadian',
      title: 'Cooker',
      daysOnBoard: 60,
      dailyRate: 150,
      currency: 'USD',
      totalIncome: 9000,
      certificates: [
        { id: 5, certificateType: 'Type E', issueDate: '2021-05-01', expiryDate: '2023-05-01' }
      ]
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      nationality: 'Australian',
      title: 'Mechanic',
      daysOnBoard: 45,
      dailyRate: 170,
      currency: 'EUR',
      totalIncome: 7650,
      certificates: [
        { id: 6, certificateType: 'Type F', issueDate: '2021-06-01', expiryDate: '2023-06-01' }
      ]
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Davis',
      nationality: 'New Zealander',
      title: 'Deckhand',
      daysOnBoard: 30,
      dailyRate: 140,
      currency: 'USD',
      totalIncome: 4200,
      certificates: [
        { id: 7, certificateType: 'Type G', issueDate: '2021-07-01', expiryDate: '2023-07-01' }
      ]
    }
  ];

  private certificates: Certificate[] = [
    { id: 1, certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
    { id: 2, certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' },
    { id: 3, certificateType: 'Type C', issueDate: '2021-03-01', expiryDate: '2023-03-01' },
    { id: 4, certificateType: 'Type D', issueDate: '2021-04-01', expiryDate: '2023-04-01' },
    { id: 5, certificateType: 'Type E', issueDate: '2021-05-01', expiryDate: '2023-05-01' },
    { id: 6, certificateType: 'Type F', issueDate: '2021-06-01', expiryDate: '2023-06-01' },
    { id: 7, certificateType: 'Type G', issueDate: '2021-07-01', expiryDate: '2023-07-01' }
  ];

  getCrews(): Crew[] {
    return this.crews;
  }

  addCrew(crew: Crew): void {
    this.crews.push(crew);
  }

  getCertificates(): Certificate[] {
    return this.certificates;
  }

  addCertificate(certificate: Certificate): void {
    this.certificates.push(certificate);
  }

  addCertificateToCrew(crewId: number, certificate: Certificate): void {
    const crew = this.crews.find(c => c.id === crewId);
    if (crew) {
      crew.certificates.push(certificate);
    }
  }
}