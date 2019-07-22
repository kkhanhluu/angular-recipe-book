import { Injectable } from '@angular/core';

// @Injectable({providedIn: 'root'})
export class LoggingService {

  lastlog: string
  constructor() { }

  printLog(message: string) {
    console.log('message:', message); 
    console.log('lastLog: ', this.lastlog); 
    this.lastlog = message; 
  }
}