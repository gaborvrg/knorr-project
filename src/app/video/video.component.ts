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
  isWagon: boolean;
  wagonPart: string;
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
        this.isWagon = false;
        this.videoSource = './assets/test1.mp4';
        this.openFullScreen();
        break;
      }
      case 2: {
        this.isWagon = true;
        this.playWagonVideoParts('1');
        break;
      }
      case 3: {
        this.isWagon = false;
        this.videoSource = './assets/test3.mp4';
        this.openFullScreen();
        break;
      }
      case 4: {
        this.isWagon = false;
        this.videoSource = './assets/test4.mp4';
        this.openFullScreen();
        break;
      }
      case 5: {
        this.isWagon = false;
        this.videoSource = './assets/test5.mp4';
        this.openFullScreen();
        break;
      }
    }
  }

  playWagonVideoParts(actPart: string): void {
    let video: HTMLVideoElement;
    video = this.videoplayer.nativeElement;
    this.wagonPart = actPart;
    this.videoSource = './assets/Wagon Guard_' + this.wagonPart + '.mp4';
  }

  navToNextPart(wagonPart: number): void {
    wagonPart++;
    if (wagonPart === 6) {
      this.isWagon = false;
      this.videoId = 3;
      this.loadVideoById();
    } else {
      this.playWagonVideoParts(wagonPart.toString());
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
      this.navToHome();
    }
  }

  navToHome(): void {
    this.router.navigateByUrl('/');
  }

  navToNextPage(): void {
    if (this.videoId < 4) {
      const tempId = this.videoId + 1;
      this.router.navigate(['/video', (tempId)]);
      this.loadVideoById(tempId);
    } else {
      this.navToHome();
    }
  }
}
