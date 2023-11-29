import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { last, map, tap,catchError,EMPTY } from 'rxjs';
export enum ImageUploadState{
INIT,
UPLOADING,
SUCCESS,
FAIL
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent  implements OnInit {

  @Input() imageBlob?:Blob;
  public progressMessage:string="aguarde...";
  public state = ImageUploadState.INIT;
  public states = ImageUploadState;
  public uploadPercent?: number;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.sendPfp(this.imageBlob!)
  }

  public sendPfp(imageBlob: Blob) {
    const formData = new FormData();
    formData.append("image", imageBlob);

    const req = new HttpRequest('POST', `${environment.API}/image/pfp`, formData, {
      reportProgress: true
    })

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(<any>event,imageBlob)),
      tap(message => this.showProgress(message)),
      last(),
      catchError(error=>this.handleError(error))
    ).subscribe({complete:()=>{
      this.modalCtrl.dismiss()
    }})
  }

  private showProgress(message: string) {
    this.progressMessage = message;
  }
  private handleError(error:any){
    console.error(error);
    this.state = ImageUploadState.FAIL;
    return EMPTY
  }

  private getEventMessage(event: HttpEvent<any>,blob:Blob) {
    console.log(event);
    switch (event.type) {
      case HttpEventType.Sent:
        this.state = ImageUploadState.UPLOADING
        return `Enviando Imagem de tamanho: ${blob.size}.`;
  
      case HttpEventType.UploadProgress:
        this.state = ImageUploadState.UPLOADING
        const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        this.uploadPercent = percentDone
        return `Enviando: ${percentDone}%.`;
  
      case HttpEventType.Response:
        this.state = ImageUploadState.SUCCESS
        return `Imagem enviada com sucesso`;
  
      default:
        this.state = ImageUploadState.SUCCESS
        return `File pfp surprising upload event: ${event.type}.`;
    }
  }

}
