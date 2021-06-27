import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private storage: StorageService<google.maps.LatLng[]>,
  ) { }

  private STORAGE_KEY = 'MARKERS_DB';

  private markersSubject: BehaviorSubject<google.maps.LatLng[]> = new BehaviorSubject<google.maps.LatLng[]>(this.getMarkers())
  public markers$: Observable<google.maps.LatLng[]> = this.markersSubject.asObservable()

  getMarkers(): google.maps.LatLng[] {
    const markers = this.storage.load(this.STORAGE_KEY)
    return markers ? markers : []
  }

  addMarker(marker: google.maps.LatLng) {
    console.log(marker);
    
    let markers = this.storage.load(this.STORAGE_KEY) || []
    markers.push(marker)
    this.storage.save(this.STORAGE_KEY, markers)
    this.markersSubject.next(markers)
  }
}
