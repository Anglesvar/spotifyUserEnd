import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }
  getSongs(): Observable<any>{
    return this.http.get("https://spotify-chubb.azurewebsites.net/api/Song/allsongs");
  }
  postAddSongToPlaylist(data): Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/PlayList/addsongtoplaylist",data);
  }
  PostSearchSong(data): Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/Song/searchbysongname?songName="+data,{songName:data})
  }
  postSearchByArtist(data): Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/Song/searchbysongartist?artistName="+data,{artistName:data})
  }
  postSearchByAlbum(data): Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/Song/searchbysongalbum?songAlbum="+data,{songAlbum:data});
  }
}
