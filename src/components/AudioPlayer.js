import { Component } from 'react'

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'paused',
      ended: false,
      playbackProgress: 0,
      duration: 0,
    }
  }
  audioElement = new Audio(this.props.audioURL)

  componentDidMount() {
    this.setState({
      status: 'playing',
    })
    this.audioElement.autoplay = true
    this.audioElement.addEventListener('timeupdate', (e) => {
      this.setState({
        playbackProgress: Math.floor(this.audioElement.currentTime),
      })
      this.setState({
        duration: Math.floor(this.audioElement.duration),
      })
    })
    this.audioElement.addEventListener('ended', (e) => {
      this.setState({
        status: 'paused',
        ended: true,
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.audioURL !== this.props.audioURL) {
      if (this.props.audioURL) {
        this.audioElement.pause()
        this.audioElement.removeEventListener('timeupdate', (e) => {
          this.setState({
            playbackProgress: Math.floor(this.audioElement.currentTime),
          })
          this.setState({
            duration: Math.floor(this.audioElement.duration),
          })
        })
        this.setState({
          status: 'playing',
        })
        this.audioElement = new Audio(this.props.audioURL)
        this.audioElement.addEventListener('timeupdate', (e) => {
          this.setState({
            playbackProgress: Math.floor(this.audioElement.currentTime),
          })
          this.setState({
            duration: Math.floor(this.audioElement.duration),
          })
        })
        this.audioElement.play()
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      status: 'paused',
    })
    this.audioElement.pause()
    this.audioElement.removeEventListener('ended', (e) => {
      this.setState({
        status: 'paused',
        ended: true,
      })
    })
    this.audioElement.removeEventListener('timeupdate', (e) => {
      this.setState({
        playbackProgress: Math.floor(this.audioElement.currentTime),
      })
      this.setState({
        duration: Math.floor(this.audioElement.duration),
      })
    })
  }

  handlePlayPause = () => {
    if (this.state.status === 'playing') {
      this.setState({
        status: 'paused',
      })
      this.audioElement.pause()
    } else {
      this.setState({
        status: 'playing',
      })
      this.audioElement.play()
    }
  }

  handleSliderChange = (e) => {
    let { value } = e.target
    this.setState({
      playbackProgress: value,
    })
    this.audioElement.currentTime = value
  }

  convertTime = (timestamp) => {
    let minutes = Math.floor(timestamp / 60)
    let seconds = timestamp - minutes * 60
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    timestamp = minutes + ':' + seconds
    return timestamp
  } // Code modified from https://www.creativebloq.com/how-to/build-a-simple-music-player-with-react

  render() {
    return (
      <div>
        <p style={{ marginTop: 40, marginBottom: 25 }}>
          Playing: {this.state.ended ? 'finished' : this.props.audioURL}
        </p>
        <button className="eightbit-btn" onClick={this.handlePlayPause}>
          {this.state.status === 'paused' ? 'Play' : 'Pause'}
        </button>
        <div className="progress-display-flex">
          <p>{this.convertTime(this.state.playbackProgress)}/</p>
          <p>{this.convertTime(this.state.duration)}mins</p>
        </div>
        <input
          className="slider"
          value={this.state.playbackProgress}
          onChange={this.handleSliderChange}
          max={this.state.duration}
          min="0"
          step="1"
          type="range"
          aria-label="scrubber"
          style={{ width: '30%' }}
        />
      </div>
    )
  }
}

export default AudioPlayer
