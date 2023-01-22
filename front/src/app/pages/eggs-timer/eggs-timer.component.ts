import { Component } from '@angular/core';

@Component({
  selector: 'app-eggs-timer',
  templateUrl: './eggs-timer.component.html',
  styleUrls: ['./eggs-timer.component.scss']
})
export class EggsTimerComponent {

minutes:any = 0;
types:any = [
  {
    name: 'всмятку',
    time: 3,

  },
  {
    name: 'вкутую',
    time: 6
  }
]
  public started: boolean;

  public seconds: number;
  public fillerIncrement: number;
  public fillerHeight: number;
  public interval: any;

  constructor() {
    this.started = false;
    this.seconds = 0;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;
    this.init();
  }
  private resetVariables(mins: number, secs: number, started: boolean) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;
  }

  public startShortBreak() {
    this.resetVariables(this.minutes, 0, true);
  }

  public stopTimer() {
    this.resetVariables(this.minutes, 0, false);
  }

  private timerComplete() {
    this.started = false;
  }

  private intervalCallback():any {
    if (!this.started) return false;
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
      console.log(this.minutes,11)
    } else {
      this.seconds--;
    }
    this.fillerHeight += this.fillerIncrement;
  }

  public toDoubleDigit(num:any) {
    return num < 10 ? '0' + parseInt(num, 10) : num;
  }

  private init() {
    this.interval = setInterval(() => {
      this.intervalCallback.apply(this);
    }, 1000);
  }
}
