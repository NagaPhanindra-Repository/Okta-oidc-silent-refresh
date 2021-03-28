import { Component, OnInit } from '@angular/core';
import { NgIdleService } from '../ng-idle.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-idle',
  templateUrl: './user-idle.component.html',
  styleUrls: ['./user-idle.component.css'],
  providers: [
    NgIdleService
  ]
})
export class UserIdleComponent implements OnInit {

  inputForm: any;
  idleTimerLeft: string;
  secondTimerLeft: string;
  timeRemain: number;
  FULL_DASH_ARRAY = 283;

  constructor( private ngIdle: NgIdleService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      firstLevelTimer: 1,
      secondLevelTimer: 1,
    });
    this.onSubmit();
  }



  /**
   * Draw timer circle
   */
  formatTimeLeft = (time: number) => {
    if (time > 0) {
      let seconds = Math.trunc(time / 1000);

      this.setCircleDasharray(seconds);

      let min = 0;
      if (seconds >= 60) {
        min = Math.trunc(seconds / 60);
        console.log(min);
        seconds -= (min * 60);
      }

      return `${min}:${seconds}`;
    }
  }

  setCircleDasharray = (elapsedTime: number) => {
    const inputValue: any = this.inputForm.value;
    const timeLimit = inputValue.firstLevelTimer * 60;

    this.timeRemain = elapsedTime / timeLimit;
    const circleDasharray = `${(
      this.timeRemain * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
  }

  onSubmit(): void {
    if (this.inputForm.invalid) {
      return;
    }

    const inputValue = this.inputForm.value;
    this.initTimer(inputValue.firstLevelTimer, inputValue.secondLevelTimer);
  }

  initTimer(firstTimerValue: number, secondTimerValue: number): void {
   // Timer value initialization
   this.ngIdle.USER_IDLE_TIMER_VALUE_IN_MIN = firstTimerValue;
   this.ngIdle.FINAL_LEVEL_TIMER_VALUE_IN_MIN = secondTimerValue;
   // end

   // Watcher on timer
   this.ngIdle.initilizeSessionTimeout();
   this.ngIdle.userIdlenessChecker.subscribe((status: string) => {
     this.initiateFirstTimer(status);
   });

   this.ngIdle.secondLevelUserIdleChecker.subscribe((status: string) => {
     this.initiateSecondTimer(status);
   });
  }

  initiateFirstTimer = (status: string) => {
    switch (status) {
      case 'INITIATE_TIMER':
        break;

      case 'RESET_TIMER':
        break;

      case 'STOPPED_TIMER':
        this.showSendTimerDialog();
        break;

      default:
        this.idleTimerLeft = this.formatTimeLeft(Number(status));
        break;
    }
  }

  initiateSecondTimer = (status: string) => {
    switch (status) {
      case 'INITIATE_SECOND_TIMER':
        break;

      case 'SECOND_TIMER_STARTED':
        break;

      case 'SECOND_TIMER_STOPPED':
        this.logout();
        break;

      default:
        this.secondTimerLeft = status;
        break;
    }
  }

  showSendTimerDialog(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }

  continue(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    // stop second timer and initiate first timer again
    NgIdleService.runSecondTimer = false;
    this.ngIdle.initilizeSessionTimeout();
  }

  logout(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    // stop all timer and end the session
    NgIdleService.runTimer = false;
    NgIdleService.runSecondTimer = false;
  }

  startUserActivityMonitor(){
  this.onSubmit();
  }

}
