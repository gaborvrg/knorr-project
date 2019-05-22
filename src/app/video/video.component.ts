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
    let id = this.route.snapshot.paramMap.get('id');
    this.videoId = +id;
    this.loadVideoById();
  }

  private loadVideoById(id? : number) {
    if (id) {
      this.videoId = id; 
    }
    switch (this.videoId) {
      case 1: {
        this.videoSource = '../assets/videos/test1.mp4';
        this.openFullScreen();
        break;
      }
      case 2: {
        this.videoSource = '../assets/videos/test2.mp4';
        this.openFullScreen();
        break;
      }
      case 3: {
        this.videoSource = '../assets/videos/test3.mp4';
        this.openFullScreen();
        break;
      }
      case 4: {
        this.videoSource = '../assets/videos/test4.mp4';
        this.openFullScreen();
        break;
      }
      case 5: {
        this.videoSource = '../assets/videos/test5.mp4';
        this.openFullScreen();
        break;
      }
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

  private toggleVideo(event: any) : void{
    let video: HTMLVideoElement;
    video = this.videoplayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }

  private navToPreviousPage() : void {
    let tempId = this.videoId - 1;
    if (tempId!=0) {
      this.router.navigate(['/video', (tempId)]);
      this.loadVideoById(tempId);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  private navToHome() : void {
    this.router.navigateByUrl('/');
  }

  private navToNextPage() : void {
    if (this.videoId<4) {
      let tempId = this.videoId + 1;
      this.router.navigate(['/video', (tempId)]);
      this.loadVideoById(tempId);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
