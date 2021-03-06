import _ from 'lodash';
import style from './track.css';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Waveform from 'Components/Waveform/Waveform';
import { streamTrack } from 'Sources/SoundcloudSource';
import { playTrack, pauseTrack } from 'Actions/PlayerActions';

class Track extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		samples: PropTypes.object,
		position: PropTypes.number,
		duration: PropTypes.number,
		currentTrack: PropTypes.object,
		playing: PropTypes.bool.isRequired,
		track: PropTypes.object.isRequired,
	};

	/**
	 * Get the cover image source.
	 *
	 * @return {String}
	 */
	getImage() {
		const src = this.props.track.artwork_url || this.props.track.user.avatar_url;
		return src.replace('large', 't300x300');
	}

	/**
	 * Check if this track is the current played track.
	 *
	 * @return {Boolean}
	 */
	isCurrentTrack() {
		return this.props.currentTrack.id === this.props.track.id;
	}

	/**
	 * Check if this track is playing.
	 *
	 * @return {Boolean}
	 */
	isPlaying() {
		return this.props.playing && this.isCurrentTrack();
	}

	/**
	 * Invoked when the play button is clicked.
	 *
	 * @return {void}
	 */
	onPlayClick() {
		if (this.isPlaying()) {
			return pauseTrack();
		}

		return playTrack(this.props.track);
	}

	/**
	 * Render the play button.
	 * @return {ReactElement}
	 */
	renderPlayButton() {
		const icon = (this.isPlaying()) ? 'fa fa-pause' : 'fa fa-play';

		return (
			<div className={style.play} onClick={this.onPlayClick.bind(this)}>
				<i className={icon} />
			</div>
		);
	}

	/**
	 * Render the component.

	 * @return {ReactElement}
	 */
	render() {
		const track = this.props.track;

		return (
			<div className={style.container}>
				<div className={style.header}>
					<div className={style.cover}>
						<img src={this.getImage()} />
					</div>

					<div>
						{/* Meta */}
						<div className={style.meta}>
							{this.renderPlayButton()}
							<div>
								<h5 className={style.user}>{track.user.username}</h5>
								<Link to={`/track/${track.id}`} className={style.title}>
									{track.title}
								</Link>
							</div>
						</div>

						{/* Waveform */}
						<div className={style.waveform}>
							<Waveform {...this.props} />
						</div>
					</div>
				</div>

				<div className={style.wrapper}>
					<div className={style.main}>
						<p className={style.description}>{track.description}</p>
					</div>
					<aside className={style.aside}>

					</aside>
				</div>

			</div>
		);
	}
}

export default Track;
