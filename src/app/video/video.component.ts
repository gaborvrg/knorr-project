import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['../home/home.component.css', './video.component.css']
})
export class VideoComponent implements OnInit {

  videoId: string;
  videoSource: string;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.loadVideoById();
  }
  private loadVideoById() {
    switch (this.videoId) {
      case '1': {
        this.videoSource = '../assets/videos/test1.mp4';
        break;
      }
      case '2': {
        this.videoSource = '../assets/videos/test2.mp4';
        break;
      }
      case '3': {
        this.videoSource = '../assets/videos/test3.mp4';
        break;
      }
      case '4': {
        this.videoSource = '../assets/videos/test4.mp4';
        break;
      }
      case '5': {
        this.videoSource = '../assets/videos/test5.mp4';
        break;
      }
    }
  }
  private toggleVideo(event: any) {
    let video: HTMLVideoElement;
    video = this.videoplayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }
}
