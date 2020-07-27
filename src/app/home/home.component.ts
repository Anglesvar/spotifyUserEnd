import { Component, ViewChild, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player/public_api';
import { MatBasicAudioPlayerComponent, MatAdvancedAudioPlayerComponent } from 'projects/ngx-audio-player/src/public_api';
import { SongService } from '../service/song.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PlaylistService } from '../service/playlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = [];
  message: string;
  flag = true;
  songData = [];
  msaapPlaylist = [];
  userPlaylist = [];
  playlistForm: FormGroup;
  songListDisplay: boolean = true;
  ExcludedSongs = [];
  globalPlayListId: number;
  ownerId: number;
  currentPlaylist = [];
  searchForm: FormGroup;
  songMP3:string;
  displayName:string;
  displayOrNot:boolean=false;

  constructor(private router: Router,private songService: SongService, private fb: FormBuilder, private http: HttpClient, private playlistService: PlaylistService) {
    if(!localStorage.getItem("ownerId"))
      this.router.navigateByUrl("/login");
    this.playlistForm = this.fb.group({
      'playListName': this.fb.control(''),
    });
    this.searchForm = this.fb.group({
      'searchSong': this.fb.control(''),
      'searchAlbum': this.fb.control(''),
      'searchArtist': this.fb.control('')
    });
    this.ownerId = parseInt(localStorage.getItem('ownerId'));
    this.displayName = localStorage.getItem('displayName');
  }
  ngOnInit() {
    this.getAllPlaylists();
    this.songService.getSongs().subscribe(res => {
      console.log(res);
      this.songData = res;
      res.forEach(element => {
        console.log(element);
        this.data = res;
        var obj = new Object();
        obj['title'] = element.songName,
          obj['link'] = element.songLink

        this.msaapPlaylist.push(obj);
      });
      console.log(this.songData);
    });
  }
  getAllSongs(){
    this.songService.getSongs().subscribe(res => {
      console.log(res);
      this.songData = res;
      this.searchForm.reset();
    });
  }
  searchSong(value) {
    console.log(this.searchForm.value.searchSong);
    this.songData = [];
    if (value != null || value != '' || value != ' ') {
      this.songService.PostSearchSong(this.searchForm.value.searchSong).subscribe(res => {
        res.forEach(element => {
          this.songData.push(element);
        });
      })
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  searchByArtist(value) {
    console.log(this.searchForm.value.searchArtist);
    this.songData = [];
    if (value != null || value != '' || value != ' ') {
      this.songService.postSearchByArtist(this.searchForm.value.searchArtist).subscribe(res => {
        res.forEach(element => {
          this.songData.push(element);
        });
      })
    }
  }
  searchByAlbum(value) {
    console.log(this.searchForm.value.searchAlbum);
    this.songData = [];
    if (value != null || value != '' || value != ' ') {
      this.songService.postSearchByAlbum(this.searchForm.value.searchAlbum).subscribe(res => {
        res.forEach(element => {
          this.songData.push(element);
        });
      })
    }
  }


  playSong(dataSource) {
    console.log(dataSource);
    this.songMP3 = dataSource;
  }
  getAllPlaylists() {
    this.userPlaylist = [];
    this.playlistService.getPlaylists().subscribe(res => {

      res.forEach(element => {
        this.userPlaylist.push(element);
      });
      console.log(this.userPlaylist);
    })
  }
  openPlaylistForm() {
    this.flag = !this.flag;
  }
  createPlaylist() {
    console.log(this.playlistForm.value);
    var playlistdata = {
      playListName: this.playlistForm.value.playListName,
      ownerId: this.ownerId
    }
    this.userPlaylist.forEach(element => {
      if (this.playlistForm.value.playListName == element.playListName)
        return;
    });
    this.playlistService.postAddPlayList(playlistdata).subscribe(res => {
      console.log(res);

      this.flag = !this.flag;
      this.getAllPlaylists()
    })
  }
  deletePlaylist(playlistId) {
    this.playlistService.deletePlayListRequest(playlistId).subscribe(res => {
      console.log(res);
      this.getAllPlaylists();
    })
  }
  addSongToPlayList(id) {
    var obj = {
      songId: id,
      playlistId: this.globalPlayListId,
      ownerId: this.ownerId
    }
    this.songService.postAddSongToPlaylist(obj).subscribe(res => {
      console.log(res);
      this.displaySongs(this.globalPlayListId);
      this.displayExcludedSongs();

    })
  }
  getSongsfromPlaylist() {
    this.playlistService.getSongsByPlaylist(this.globalPlayListId).subscribe(res => {
      console.log(res);
      //this.currentPlaylist=res;
      this.msaapPlaylist = []
      res.forEach(element => {
        this.msaapPlaylist.push({
          title: element.songName,
          link: element.songLink
        })
      });
    })
  }
  displaySongs(playlistId) {
    this.displayOrNot = true;
    console.log(playlistId);
    this.globalPlayListId = playlistId;
    this.getSongsfromPlaylist();
  }
  private fmaBaseUrl = 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music';
  // Start of Basic Player Instance 1

  // Material Style Basic Audio Player Title and Audio URL
  msbapTitle1 = 'In Love | A Himitsu feat. Nori';
  msbapAudioUrl1 = 'https://audiograb.com/songs/nori-in-love-chill-royalty-free-music-xiMvrlfD.mp3';

  msbapDisplayTitle1 = true;
  msbapDisplayVolumeControls1 = true;

  // Optional Additional Examples 
  // - Logging Current Time

  @ViewChild("basic1")
  basicPlayer1: MatBasicAudioPlayerComponent;

  basicPlayerCurrentTrack1: string;
  basicPlayerCurrentTime1: any;

  logCurrentTrackBasicPlayer1() {
    this.basicPlayerCurrentTrack1 = this.basicPlayer1.title;
  }

  logCurrentTimeBasicPlayer1() {
    this.basicPlayer1.audioPlayerService.getCurrentTime().subscribe(time => {
      this.basicPlayerCurrentTime1 = time;
    })
  }
  // End of Basic Player Instance 1
  // Start of Basic Player Instance 2
  // Material Style Basic Audio Player Title and Audio URL
  msbapTitle2 = 'Cartoon – On & On (feat. Daniel Levi) [NCS Release]';
  msbapAudioUrl2 = 'https://audiograb.com/songs/daniel-levi-chill-royalty-free-music-m5BTrEAILs.mp3';

  msbapDisplayTitle2 = true;
  msbapDisplayVolumeControls2 = true;

  // Optional Additional Examples 
  // - Logging Current Time

  @ViewChild("basic2")
  basicPlayer2: MatBasicAudioPlayerComponent;

  basicPlayerCurrentTrack2: string;
  basicPlayerCurrentTime2: any;

  logCurrentTrackBasicPlayer2() {
    this.basicPlayerCurrentTrack2 = this.basicPlayer2.title;
  }

  logCurrentTimeBasicPlayer2() {
    this.basicPlayer2.audioPlayerService.getCurrentTime().subscribe(time => {
      this.basicPlayerCurrentTime2 = time;
    });
  }
  // End of Basic Player Instance 2
  // Material Style Advance Audio Player Playlist

  @ViewChild("advanced")
  advancedPlayer: MatAdvancedAudioPlayerComponent;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [2, 4, 6];

  msaapDisplayVolumeControls = true;

  currentTrack: Track = null;
  currentTime: any;

  appendTracksToPlaylistDisable = false;
  counter = 1;

  onEnded(event) {
    console.log(event);
    // your logic which needs to
    // be triggered once the
    // track ends goes here.

    // example
    this.currentTrack = null;
  }

  logCurrentTrack() {
    this.advancedPlayer.audioPlayerService.getCurrentTrack().subscribe(track => {
      this.currentTrack = track;
    });
  }

  logCurrentTime() {
    this.advancedPlayer.audioPlayerService.getCurrentTime().subscribe(time => {
      this.currentTime = time;
    });
  }

  consoleLogCurrentData() {
    // logCurrentTrack();
    // logCurrentTime();
    // Make sure to subscribe (by calling above methods)
    // before getting the data
    console.log(this.currentTrack.title + ' : ' + this.currentTime);
  }
  displayPlaylistSongs() {
    this.songListDisplay = !this.songListDisplay;
    this.currentPlaylist = [];
    this.ExcludedSongs = [];
    this.playlistService.getSongsByPlaylist(this.globalPlayListId).subscribe(res => {
      res.forEach(element => {
        this.currentPlaylist.push(element);
      });
      this.playlistService.getExcludedSongList(this.globalPlayListId).subscribe(res => {
        console.log(res);
        res.forEach(element => {
          this.ExcludedSongs.push(element);
        });

        console.log("xyz", this.ExcludedSongs);

      })
    })
  }

  deleteFromPlayList(id) {
    var obj = {
      songId: parseInt(id),
      playlistId: this.globalPlayListId,
      ownerId: this.ownerId
    }
    this.playlistService.deleteFromPlayListRequest(obj).subscribe(res => {
      console.log(res);
      this.currentPlaylist=[];
      this.playlistService.getSongsByPlaylist(this.globalPlayListId).subscribe(res => {
        res.forEach(element => {
          this.currentPlaylist.push(element);
        });
        this.displayExcludedSongs();
        this.displaySongs(this.globalPlayListId);
      });
    })

  }

  displayExcludedSongs() {
    this.songListDisplay = !this.songListDisplay;
    this.ExcludedSongs = [];
    console.log(this.globalPlayListId);
    this.playlistService.getExcludedSongList(this.globalPlayListId).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.ExcludedSongs.push(element);
      });

      console.log("xyz", this.ExcludedSongs);
      this.displayPlaylistSongs()
    })

  }

  // Start needed for demo purpose
  // Basic Player 1
  changeMsbapDisplayTitle1(event) {
    this.msbapDisplayTitle1 = event.checked;
  }

  changeMsbapDisplayVolumeControls1(event) {
    this.msbapDisplayVolumeControls1 = event.checked;
  }

  // Basic Player 2
  changeMsbapDisplayTitle2(event) {
    this.msbapDisplayTitle2 = event.checked;
  }

  changeMsbapDisplayVolumeControls2(event) {
    this.msbapDisplayVolumeControls2 = event.checked;
  }

  // Advanced Player
  changeMsaapDisplayTitle(event) {
    this.msaapDisplayTitle = event.checked;
  }

  changeMsaapDisplayPlayList(event) {
    this.msaapDisplayPlayList = event.checked;
  }

  changeMsaapDisplayVolumeControls(event) {
    this.msaapDisplayVolumeControls = event.checked;
  }
  // End needed for demo purpose
}
