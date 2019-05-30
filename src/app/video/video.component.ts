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
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
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
        this.videoSource = './assets/Overview_FULL.mp4';
        this.openFullScreen();
        break;
      }
      case 2: {
        this.videoSource = './assets/Wagon Guard_FULL.mp4';
        this.openFullScreen();
        break;
      }
      case 3: {
        this.videoSource = './assets/CBM_FULL.mp4';
        this.openFullScreen();
        break;
      }
      case 4: {
        this.videoSource = './assets/Automation_FULL.mp4';
        this.openFullScreen();
        break;
      }
      default: {
        this.navToHome();
      }
    }
  }


  onVideoEnded() {
    this.navToHome();
  }

  navToHome(): void {
    this.router.navigateByUrl('/');
  }

  onTimeUpdate(value) {
    console.log(value.target.currentTime);
  }

  // toggleVideo(event: any): void {
    //   let video: HTMLVideoElement;
    //   video = this.videoplayer.nativeElement;
  //   video.paused ? video.play() : video.pause();
  // }

  navToPreviousPage(): void {
    const tempId = this.videoId - 1;
    if (tempId !== 0) {
      this.router.navigate(['/video', (tempId)]);
      this.loadVideoById(tempId);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  navToNextPage(): void {
    if (this.videoId < 4) {
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

// playVideoParts(type: string, actPart: number): void {
//   this.videoPart = actPart;
//   this.videoSource = './assets/' + type + '_' + this.videoPart + '.mp4';
// }

// navToPreviousPart(videoPart: any): void {
//   videoPart--;
//   if (videoPart < 1) {
//     this.videoId--;
//     this.loadVideoById();
//   } else {
//     this.playVideoParts(this.videoName, videoPart.toString());
//   }
// }

// navToNextPart(videoPart: any): void {
//   videoPart++;
//   if (videoPart > this.nrOfVideoParts) {
//     this.videoId++;
//     this.loadVideoById();
//     // this.navToHome();
//   } else {
//     this.playVideoParts(this.videoName, videoPart.toString());
//   }
// }
