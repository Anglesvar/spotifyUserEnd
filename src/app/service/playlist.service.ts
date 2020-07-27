import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }
  postAddPlayList(data): Observable<any>{
    return this.http.post("https://localhost:44381/api/PlayList/addplaylist",data);
  }
  getPlaylists():Observable<any>{
    let ownerId = parseInt(localStorage.getItem('ownerId'));
    return this.http.post("https://localhost:44381/api/PlayList/getallplaylists?ownerId="+ownerId,{'ownerId':ownerId });
  }
  getSongsByPlaylist(id): Observable<any>{
    return this.http.post("https://localhost:44381/api/PlayList/getsongsbyplaylist?id="+id,{id:id});
  }
  getExcludedSongList(playlistId): Observable<any>{
    console.log(playlistId);
    
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/Song/excludedSongs?playListId="+playlistId,{playListId: playlistId});
  }
  deletePlayListRequest(playlistId): Observable<any>{
    return this.http.delete("https://spotify-chubb.azurewebsites.net/api/PlayList/deleteplaylist?playListId="+playlistId);
  }
  deleteFromPlayListRequest(data){
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/PlayList/deletesongfromplaylist",data);
  }
}
