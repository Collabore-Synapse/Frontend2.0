import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Geolocation, Position } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationModal implements OnInit {
  map!: L.Map;
  customIcon!: L.Icon;
  circle!: L.Circle;
  marker!: L.Marker;
  constructor(private modalCtrl: ModalController) {}

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async ngOnInit() {
    await this.initMap();
  }

  async initMap() {
    this.map = L.map('map').setView([0, 0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    if ('geolocation' /*in navigator*/) {
      /*navigator.*/ Geolocation.getCurrentPosition().then(
        (position: Position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.map.setView([lat, lon], 15);

          const iconSize: [number, number] = [20, 20];
          const iconAnchor: [number, number] = [iconSize[0] / 2, iconSize[1]];
          const popupAnchor: [number, number] = [0, -iconSize[1]];

          this.customIcon = L.icon({
            iconUrl: '../../../assets/localizador.svg',
            iconSize: iconSize,
            iconAnchor: iconAnchor,
            popupAnchor: popupAnchor,
          });

          this.circle = L.circle([lat, lon], {
            color: '#4E4B59',
            fillColor: '#8391A1',
            fillOpacity: 0.3,
            radius: 100,
          }).addTo(this.map);

          this.marker = L.marker([lat, lon], {
            icon: this.customIcon,
            draggable: true,
          }).addTo(this.map);
          this.marker.bindTooltip(
            `<div style="color:red">distancia maxima atingida</div>`
          );
          const movingState = {
            moving: false,
            lastLat: 0,
            lastLng: 0,
          };
          this.marker.on('dragstart', () => {
            movingState.moving = true;
          });
          this.marker.on('dragend', () => {
            movingState.moving = false;
          });
          // Registre o evento de soltar o marcador para atualizar a posição original
          this.marker.on('drag', (e) => {
            const newLatLng = e.target.getLatLng();
            const circleCenter = this.circle.getBounds().getCenter();
            const distance = circleCenter.distanceTo(newLatLng);

            const { lat: mLat, lng: mLng } = this.marker.getLatLng();

            console.log('Nova posição do marcador:', newLatLng);

            if (distance > this.circle.getRadius()) {
              this.marker.setLatLng([movingState.lastLat, movingState.lastLng]);
              this.marker.openTooltip();
            } else {
              movingState.lastLat = mLat;
              movingState.lastLng = mLng;
              this.marker.closeTooltip();
            }
          });

          this.circle.on('click', ({ latlng }) => {
            this.marker.setLatLng(latlng);
          });
        },
        (error) => {
          console.error('Erro ao obter a localização:', error);
        }
      );
    } else {
      console.error('Geolocalização não suportada pelo navegador.');
    }
  }
  close() {
    this.modalCtrl.dismiss(undefined, `close`);
  }
  submit() {
    const position = this.marker.getLatLng();
    this.modalCtrl.dismiss(position, `submit`);
  }
}

// voltarHome(): void {
//   this.router.navigate(['/tabs/new-post']);
// }
