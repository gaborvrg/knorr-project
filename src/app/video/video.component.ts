import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['../home/home.component.css', './video.component.css']
})
export class VideoComponent implements OnInit {
  videoId: number;
  videoSource: string;
  currentTime: number;
  overViewsStopIndex = 0;
  wagonGuardStopIndex = 0;
  cbmTimeStopIndex = 0;
  automationStopIndex = 0;
  video: HTMLVideoElement;
  overViewTimeStops = [2.48, 30.566];
  wagonGuardTimeStops = [3.033, 9.921, 20.259, 23.100];
  cbmTimeStops = [1.15, 6.339, 28.810, 68.543];
  automationTimeStops = [3.067, 27.317, 30.175, 41.608];

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.video = this.videoplayer.nativeElement;
    const id = this.route.snapshot.paramMap.get('id');
    this.videoId = +id;
    this.loadVideoById();
  }

  private loadVideoById(id?: number) {
    if (id) {
      this.videoId = id;
    }
    switch (this.videoId) {
      case 1: {
        this.video.src = './assets/Overview.mp4';
        // this.openFullScreen();
        break;
      }
      case 2: {
        this.video.src = './assets/Wagon_guard.mp4';
        // this.openFullScreen();
        break;
      }
      case 3: {
        this.video.src = './assets/CBM.mp4';
        // this.openFullScreen();
        break;
      }
      case 4: {
        this.video.src = './assets/Automation.mp4';
        // this.openFullScreen();
        break;
      }
      default: {
        this.navToHome();
      }
    }
  }

  onTimeUpdate(value: any): void {
    this.currentTime = value.target.currentTime;
    // console.log(this.currentTime);
    switch (this.videoId) {
      case 1: {
        if (this.currentTime >= this.overViewTimeStops[this.overViewsStopIndex]) {
          this.overViewTimeStops[this.overViewsStopIndex] = this.currentTime;
          this.video.pause();
          // console.log('overViewTimeStops: ', this.overViewTimeStops);
        }
        break;
      }
      case 2: {
        if (this.currentTime >= this.wagonGuardTimeStops[this.wagonGuardStopIndex]) {
          this.wagonGuardTimeStops[this.wagonGuardStopIndex] = this.currentTime;
          this.video.pause();
          // console.log('wagonGuardTimeStops: ', this.wagonGuardTimeStops);
        }
        break;
      }
      case 3: {
        if (this.currentTime >= this.cbmTimeStops[this.cbmTimeStopIndex]) {
          this.cbmTimeStops[this.cbmTimeStopIndex] = this.currentTime;
          this.video.pause();
          // console.log(this.cbmTimeStops);
        }
        break;
      }
      case 4: {
        if (this.currentTime >= this.automationTimeStops[this.automationStopIndex]) {
          this.automationTimeStops[this.automationStopIndex] = this.currentTime;
          this.video.pause();
          // console.log(this.automationTimeStops);
        }
        break;
      }
    }
    // console.log('videoId: ', this.videoId);
  }

  onVideoEnded() {
    this.navToHome();
  }

  navToHome(): void {
    this.router.navigateByUrl('/');
  }

  toggleVideo(event: any): void {
    if (!this.video.ended) {
      this.video.paused ? this.video.play() : this.video.pause();
    }
  }

  navToPreviousPage(): void {
    this.loadVideoById();
    // let currentTime;
    // // const overViewsStopIndex = this.overViewsStopIndex;
    // // let wagonGuardStopIndex = this.wagonGuardStopIndex;


    // // if (this.videoId === 1 && (this.currentTime >= this.overViewTimeStops[overViewsStopIndex - 1])) {
    // //   if (!(this.overViewTimeStops[overViewsStopIndex])) {
    // //     currentTime = this.overViewTimeStops[overViewsStopIndex - 1 - 1];
    // //     console.log('overView currentTime: ', currentTime);
    // //     this.video.currentTime = currentTime;
    // //   } else {
    // //   this.navToHome();
    // //   }
    // // }
    // this.wagonGuardStopIndex--;
    // if (this.videoId === 2 && (this.currentTime >= this.wagonGuardTimeStops[this.wagonGuardStopIndex - 1])) {
    //   console.log('wagonGuardStopIndex:', this.wagonGuardStopIndex);
    //     currentTime = this.wagonGuardTimeStops[(this.wagonGuardStopIndex)];
    //     // console.log('wagonGuard currentTime: ', currentTime);
    //     this.video.currentTime = currentTime;

    // } else {
    //   this.navToHome();
      this.overViewsStopIndex = 0;
      this.wagonGuardStopIndex = 0;
      this.cbmTimeStopIndex = 0;
      this.automationStopIndex = 0;
    // }
    // // console.log('this.video.currentTime: ', this.video.currentTime);
    // this.video.load();
  }

  navToNextPage(): void {
    let currentTime;
    if (this.videoId === 1 && (this.overViewsStopIndex <= this.overViewTimeStops.length)) {
      if (!(this.overViewsStopIndex >= this.overViewTimeStops.length)) {
        currentTime = this.overViewTimeStops[this.overViewsStopIndex++];
        // console.log('overView: ', currentTime);
        this.video.currentTime = currentTime;
      } else {
        this.navToHome();
      }
    } else if (this.videoId === 2 && (this.wagonGuardStopIndex <= this.wagonGuardTimeStops.length)) {
      if (!(this.wagonGuardStopIndex >= this.wagonGuardTimeStops.length)) {
        currentTime = this.wagonGuardTimeStops[this.wagonGuardStopIndex++];
        // console.log('wagonGuard: ', currentTime);
        this.video.currentTime = currentTime;
      } else {
        this.navToHome();
      }
    } else if (this.videoId === 3 && (this.cbmTimeStopIndex <= this.cbmTimeStops.length)) {
      if (!(this.cbmTimeStopIndex >= this.cbmTimeStops.length)) {
        currentTime = this.cbmTimeStops[this.cbmTimeStopIndex++];
        // console.log('CBM: ', currentTime);
        this.video.currentTime = currentTime;
      } else {
        this.navToHome();
      }
    } else if (this.videoId === 4 && (this.automationStopIndex < this.automationTimeStops.length)) {
      if (!(this.automationStopIndex >= this.automationTimeStops.length)) {
        currentTime = this.automationTimeStops[this.automationStopIndex++];
        // console.log('automation: ', currentTime);
        this.video.currentTime = currentTime;
      } else {
        this.navToHome();
      }
    } else {
      this.navToHome();
      this.overViewsStopIndex = 0;
      this.wagonGuardStopIndex = 0;
      this.cbmTimeStopIndex = 0;
      this.automationStopIndex = 0;
    }
    // console.log(this.video.currentTime);
    this.video.play();
  }

  private openFullScreen() {
    const elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
}

