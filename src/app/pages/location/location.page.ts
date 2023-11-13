import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  // map!: L.Map


  // constructor() { }

  // ngOnInit() {
  //     this.map = L.map('map', {
  //       center: [25.3791924, 55.4765436],
  //       zoom: 15,
  //       renderer: L.canvas()
  //     })

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(this.map)

  //   setTimeout(() => {
  //     this.map.invalidateSize();
  //   }, 0);
  // }




  map!: L.Map;
  customIcon!: L.Icon;
  circle!: L.Circle;
  marker!: L.Marker;
  constructor(private router: Router) {}

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

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          console.log(lat, ' ', lon);

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
            radius: 1000,
          }).addTo(this.map);

          this.marker = L.marker([lat, lon], {
            icon: this.customIcon,
            draggable: true,
          }).addTo(this.map);

          // Registre o evento de soltar o marcador para atualizar a posição original
          this.marker.on('dragend', (e) => {
            e.target._origLatLng = e.target.getLatLng();
            const newLatLng = e.target.getLatLng();
            console.log('Lat: ', newLatLng.lat, 'Long:', newLatLng.lng);
            console.log();
          });

          // Registre o evento de arrastar do marcador
          this.marker.on('drag', (e) => {
            // Verifique se as novas coordenadas estão dentro do círculo
            const latlng = e.target.getLatLng();
            if (this.circle.getBounds().contains(latlng)) {
              // As novas coordenadas estão dentro do círculo
              e.target._origLatLng = latlng; // Atualiza a posição original
            } else {
              // As novas coordenadas estão fora do círculo, então reverta para a posição anterior
              e.target.setLatLng(e.target._origLatLng);
            }
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

  // voltarHome(): void {
  //   this.router.navigate(['/tabs/new-post']);
  // }
}
