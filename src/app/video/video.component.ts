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
  wagonGuardTimeStops = [3.033, 9.921, 20.259, 22.744];
  cbmTimeStops = [1.15, 6.339, 28.810, 68.543];
  automationTimeStops = [3.067, 27.317, 30.175, 41.608];
  // overViewTimeStops = [];
  // wagonGuardTimeStops = [];
  // cbmTimeStops = [];
  // automationTimeStops = [];

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
    if (this.currentTime >= this.overViewTimeStops[this.overViewsStopIndex]) {
      this.overViewTimeStops[this.overViewsStopIndex] = this.currentTime;
      this.video.pause();
      console.log('overViewTimeStops: ', this.overViewTimeStops);
    } else if (this.currentTime >= this.wagonGuardTimeStops[this.wagonGuardStopIndex]) {
      this.wagonGuardTimeStops[this.wagonGuardStopIndex] = this.currentTime;
      this.video.pause();
      console.log('wagonGuardTimeStops: ', this.wagonGuardTimeStops);
    }
  }

  onTimeUpdate(value: any): void {
    this.currentTime = value.target.currentTime;
    // console.log(this.currentTime);
    // switch (this.videoId) {
    //   case 1: {
    //     // if (this.currentTime >= this.overViewTimeStops[this.overViewsStopIndex]) {
    //     //   this.overViewTimeStops[this.overViewsStopIndex] = this.currentTime;
    //     //   this.video.pause();
    //     //   console.log('overViewTimeStops: ', this.overViewTimeStops);
    //     // }
    //     break;
    //   }
    //   case 2: {
    //     // if (this.currentTime >= this.wagonGuardTimeStops[this.wagonGuardStopIndex]) {
    //     //   this.wagonGuardTimeStops[this.wagonGuardStopIndex] = this.currentTime;
    //     //   this.video.pause();
    //     //   console.log('wagonGuardTimeStops: ', this.wagonGuardTimeStops);
    //     // }
    //     break;
    //   }
    //   case 3: {
    //     if (this.currentTime >= this.cbmTimeStops[this.cbmTimeStopIndex]) {
    //       this.cbmTimeStops[this.cbmTimeStopIndex] = this.currentTime;
    //       this.video.pause();
    //       console.log(this.cbmTimeStops);
    //     }
    //     break;
    //   }
    //   case 4: {
    //     if (this.currentTime >= this.automationTimeStops[this.automationStopIndex]) {
    //       this.automationTimeStops[this.automationStopIndex] = this.currentTime;
    //       this.video.pause();
    //       console.log(this.automationTimeStops);
    //     }
    //     break;
    //   }
    // }
  }

  onVideoEnded() {
    this.navToHome();
  }

  navToHome(): void {
    this.router.navigateByUrl('/');
  }

  // navToPreviousPage(): void {
  //   console.log(this.stopIndex);
  //   if (this.stopIndex <= 1 ) {
  //     this.navToHome();
  //     this.stopIndex = 0;
  //   } else {
  //     this.video.currentTime = this.wagonGuardTimeStops[this.stopIndex - 2];
  //     console.log(this.video.currentTime);
  //     this.video.play();
  //     this.stopIndex--;
  //   }
  // }

  navToNextPage(): void {
    let currentTime;
    if (this.overViewsStopIndex <= this.overViewTimeStops.length) {
      currentTime = this.overViewTimeStops[this.overViewsStopIndex++];
      console.log('overView: ', currentTime);
    } else if (this.wagonGuardStopIndex <= this.wagonGuardTimeStops.length) {
      currentTime = this.wagonGuardTimeStops[this.wagonGuardStopIndex++];
      console.log('wagonGuard: ', currentTime);
    } else if (this.cbmTimeStopIndex <= this.cbmTimeStops.length) {
      this.video.currentTime = this.cbmTimeStops[this.cbmTimeStopIndex++];
      console.log('CBM: ', currentTime);
    } else if (this.automationStopIndex <= this.automationTimeStops.length) {
      this.video.currentTime = this.automationTimeStops[this.automationStopIndex++];
      console.log('automation: ', currentTime);
    }
    // } else {
    //   this.navToHome();
    //   this.overViewsStopIndex = 0;
    //   this.wagonGuardStopIndex = 0;
    //   this.cbmTimeStopIndex = 0;
    //   this.automationStopIndex = 0;
    // }
    this.video.currentTime = currentTime;
    console.log(this.video.currentTime);
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

