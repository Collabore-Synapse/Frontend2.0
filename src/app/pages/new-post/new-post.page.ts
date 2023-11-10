import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  constructor() {}

  selectedSegment: string = 'elogio';

  ngOnInit() {}

  segmentChanged(segment: string) {
    this.selectedSegment = segment;
  }
}
