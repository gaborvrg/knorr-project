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
  stopIndex = 0;
  video: HTMLVideoElement;
  overViewTimeStops = [2.43835, 30.566];
  wagonGuardTimeStops = [3.033, 10.0, 20.159, 22.744];
  cbmTimeStops = [1.15, 6.339, 28.810, 68.255];
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
        this.videoSource = './assets/Overview.mp4';
        this.openFullScreen();
        break;
      }
      case 2: {
        this.videoSource = './assets/Wagon Guard.mp4';
        this.openFullScreen();
        break;
      }
      case 3: {
        this.videoSource = './assets/CBM.mp4';
        this.openFullScreen();
        break;
      }
      case 4: {
        this.videoSource = './assets/Automation.mp4';
        this.openFullScreen();
        break;
      }
      default: {
        this.navToHome();
      }
    }
  }

  onTimeUpdate(value: any): void {
    this.currentTime = value.target.currentTime;
    console.log(this.currentTime);
    switch (this.videoId) {
      case 1: {
        if (this.currentTime >= this.overViewTimeStops[this.stopIndex]) {
          this.video.pause();
          this.stopIndex++;
        }
        break;
      }
      case 2: {
        if (this.currentTime >= this.wagonGuardTimeStops[this.stopIndex]) {
          this.video.pause();
          this.stopIndex++;
        }
        break;
      }
      case 3: {
        if (this.currentTime >= this.cbmTimeStops[this.stopIndex]) {
          this.video.pause();
          this.stopIndex++;
        }
        break;
      }
      case 4: {
        if (this.currentTime >= this.automationTimeStops[this.stopIndex]) {
          this.video.pause();
          this.stopIndex++;
        }
        break;
      }
    }
  }

  onVideoEnded() {
    this.navToHome();
  }

  navToHome(): void {
    this.router.navigateByUrl('/');
  }

  navToPreviousPage(): void {
    const tempId = this.videoId - 1;
    if ((!this.video.ended) && (this.overViewTimeStops.length >= this.stopIndex) ||
      (!this.video.ended) && (this.wagonGuardTimeStops.length >= this.stopIndex) ||
      (!this.video.ended) && (this.cbmTimeStops.length >= this.stopIndex) ||
      (!this.video.ended) && (this.automationTimeStops.length >= this.stopIndex)) {
      this.video.currentTime = 0;
      this.video.play();
    } else if (tempId !== 0) {
      this.stopIndex = 0;
      this.router.navigate(['/video', (tempId)]);
      this.loadVideoById(tempId);
    } else {
      this.stopIndex = 0;
      this.router.navigateByUrl('/');
    }
  }

  navToNextPage(): void {
    if ((!this.video.ended) && (this.overViewTimeStops.length >= this.stopIndex) ||
        (!this.video.ended) && (this.wagonGuardTimeStops.length >= this.stopIndex) ||
        (!this.video.ended) && (this.cbmTimeStops.length >= this.stopIndex) ||
        (!this.video.ended) && (this.automationTimeStops.length >= this.stopIndex)) {
      this.video.currentTime = this.currentTime;
      // this.video.currentTime = 22;
      this.video.play();
    } else if (this.videoId < 4) {
      this.stopIndex = 0;
      const tempId = this.videoId + 1;
      this.router.navigate(['/video', (tempId)]);
      this.loadVideoById(tempId);
    } else {
      this.router.navigateByUrl('/');
    }
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

