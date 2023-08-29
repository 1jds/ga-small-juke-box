import { Component } from 'react'
import AudioPlayer from './AudioPlayer.js'

class Jukebox extends Component {
  state = {
    song: '',
  }

  chooseSong = (song) => {
    this.setState({ song: song })
  }

  render() {
    return (
      <div>
        <h1 style={{ fontSize: 45 }}>Jukebox</h1>
        <p>
          <button
            className="eightbit-btn eightbit-btn--reset"
            onClick={() => this.chooseSong('')}
          >
            Disable Audio
          </button>
        </p>
        <p style={{ marginTop: 40 }}>Play song: </p>
        <div className="song-btns-grid">
          <button
            className="eightbit-btn eightbit-btn--proceed"
            onClick={() => this.chooseSong('/songs/fantasy-classical.mp3')}
          >
            Fantasy Classical
          </button>
          <button
            className="eightbit-btn eightbit-btn--proceed"
            onClick={() => this.chooseSong('/songs/gates-of-heaven.mp3')}
          >
            Gates of Heaven
          </button>
          <button
            className="eightbit-btn eightbit-btn--proceed"
            onClick={() => this.chooseSong('/songs/grand-orchestra.mp3')}
          >
            Grand Orchestra
          </button>
          <button
            className="eightbit-btn eightbit-btn--proceed"
            onClick={() => this.chooseSong('/songs/piano-song.mp3')}
          >
            Piano Song
          </button>
        </div>
        {this.state.song === '' ? (
          <p style={{ marginTop: 40 }}>Audio disabled</p>
        ) : (
          <AudioPlayer audioURL={this.state.song} />
        )}
      </div>
    )
  }
}

export default Jukebox
