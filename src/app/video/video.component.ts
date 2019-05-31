import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['../home/home.component.css', './video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {

  videoId: number;
  videoSource: string;
  videoPart: number;
  videoName: string;
  nrOfVideoParts: number;
  videoPlayer: HTMLVideoElement;

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.videoId = +id;
    this.loadVideoById();
  }

  ngAfterViewInit() {
    this.videoPlayer = this.videoplayer.nativeElement;
  }

  private loadVideoById() {
    switch (this.videoId) {
      case 1: {
        this.videoName = 'Overview';
        this.nrOfVideoParts = 3;
        this.playVideoParts(this.videoName, 1);
        this.openFullScreen();
        break;
      }
      case 2: {
        this.videoName = 'Wagon Guard';
        this.nrOfVideoParts = 5;
        this.playVideoParts(this.videoName, 1);
        this.openFullScreen();
        break;
      }
      case 3: {
        this.videoName = 'CBM';
        this.nrOfVideoParts = 5;
        this.playVideoParts(this.videoName, 1);
        this.openFullScreen();
        break;
      }
      case 4: {
        this.videoName = 'Automation';
        this.nrOfVideoParts = 5;
        this.playVideoParts(this.videoName, 1);
        this.openFullScreen();
        break;
      }
      default: {
        this.navToHome();
      }
    }
  }

  playVideoParts(type: string, actPart: number): void {
    this.videoPart = actPart;
    this.videoSource = './assets/' + type + '_' + this.videoPart + '.mp4';
  }

  navToPreviousPart(videoPart: any): void {
    videoPart--;
    if (videoPart < 1) {
      this.navToHome();
    } else {
      this.playVideoParts(this.videoName, videoPart.toString());
    }
  }

  navToNextPart(videoPart: any): void {
    videoPart++;
    if (videoPart > this.nrOfVideoParts) {
      this.videoId++;
      this.loadVideoById();
      // this.navToHome();
    } else {
      this.playVideoParts(this.videoName, videoPart.toString());
    }
  }

  onVideoEnded() {
    if (this.videoPart >= this.nrOfVideoParts) {
      this.navToHome();
    }
  }

  navToHome(): void {
    this.router.navigateByUrl('/');
  }

  toggleVideo(event: any): void {
    if (!this.videoPlayer.ended) {
      this.videoPlayer.paused ? this.videoPlayer.play() : this.videoPlayer.pause();
    }
  }

  openFullScreen() {
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
