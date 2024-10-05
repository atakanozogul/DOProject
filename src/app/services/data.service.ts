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
          { certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
          { certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' }
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
        { certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' }
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
        { certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' }
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
        { certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' }
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
        { certificateType: 'Type A', issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateType: 'Type B', issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    }
  ];

  private certificateTypes: Certificate[] = [
    { name: 'Type A', description: 'Description for Type A' },
    { name: 'Type B', description: 'Description for Type B' },
    { name: 'Type C', description: 'Description for Type C' },
    { name: 'Type D', description: 'Description for Type D' },
    { name: 'Type E', description: 'Description for Type E' },
    { name: 'Type F', description: 'Description for Type F' },
    { name: 'Type G', description: 'Description for Type G' }
  ];

  getCrews(): Crew[] {
    return this.crews;
  }

  addCrew(crew: Crew): void {
    this.crews.push(crew);
  }

  getCertificateTypes(): Certificate[] {
    return this.certificateTypes;
  }

  addCertificateType(certificateType: Certificate): void {
    this.certificateTypes.push(certificateType);
  }

  deleteCertificateType(index: number): void {
    this.certificateTypes.splice(index, 1);
  }

  addCertificateToCrew(crewId: number, certificate: { certificateType: string; issueDate: string; expiryDate: string }): void {
    const crew = this.crews.find(c => c.id === crewId);
    if (crew) {
      crew.certificates.push(certificate);
    }
  }
}