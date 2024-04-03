// audio-player.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  audioSource: string = 'assets/mp3/lotr.mp3';

  audioVolume: number = 1;
  audioProgress: number = 0;

  togglePlayPause(): void {
    const audio = this.audioElement.nativeElement;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  setVolume(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.audioVolume = parseFloat(target.value);
      this.audioElement.nativeElement.volume = this.audioVolume;
    }
  }

  updateProgress(): void {
    const audio = this.audioElement.nativeElement;
    this.audioProgress = audio.currentTime / audio.duration;
  }
}
