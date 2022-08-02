import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';

import * as tablatureService from '../../../services/tablatureService';
import PlayerControls from './PlayerControls';

const Player = () => {
	let { tabId }	= useParams();
	
	const remoteUrl    = tablatureService.serviceUrl();
	const appUrl       = tablatureService.appUrl();
	
    const alphatabApiRef    = useRef( null );
	const scoreHeadRef      = useRef( null );
    const scoreBodyRef      = useRef( null );

    const [loaded, setLoaded]               = useState( false );
    const [scoreLoaded, setScoreLoaded]     = useState( false );
    
	useEffect(() => {
		alphatabApiRef.current    = new window.alphaTab.AlphaTabApi( scoreBodyRef.current, {

            file: `${remoteUrl}/tablatures/${tabId}/read`,
            core: {
                logLevel: 'debug',
                engine: 'html5',
                tracks: 0
            },
	  		display: {
		        layoutMode: 'page',
		        staveProfile: 'scoretab'
		    },
		    notation: {
		        rhythmMode: 'showwithbars',
		        elements: {
		            scoreTitle: false,
		            scoreSubTitle: false,
		            scoreArtist: false,
		            scoreAlbum: false,
		            scoreWords: false,
		            scoreMusic: false,
		            scoreWordsAndMusic: false,
		            scoreCopyright: false,
		            guitarTuning: true
		        }
		    },
            player: {
                enablePlayer: true,
                enableUserInteraction: true,
                enableCursor: true,
                //soundFont: `${appUrl}/soundfont/sonivox.sf2`
                soundFont: '/soundfont/sonivox.sf2'
            },
		    logging: 'debug',
		});
		
		alphatabApiRef.current.soundFontLoad.on( (e) => {
            console.log( 'soundFont Loading: Loaded(' + e.loaded + '), Total(' + e.total + ')' );
        });
        
		alphatabApiRef.current.soundFontLoaded.on( () => {
			console.log( 'SoundFont Loaded !!!' );
  			setLoaded( true );
		});
		
		alphatabApiRef.current.scoreLoaded.on( score => {
			console.log( 'Score Loaded !!!' );
			setScoreLoaded( true );
			
			scoreHeadRef.current.querySelector( '.artist' ).innerText    = score.artist;
			scoreHeadRef.current.querySelector( '.title' ).innerText     = score.title;
			scoreHeadRef.current.querySelector( '.album' ).innerText     = score.album;
		});
		
		/**
         * This event is fired when all required data for playback is loaded and ready. The player is ready for playback when 
         * all background workers are started, the audio output is initialized, a soundfont is loaded, and a song was loaded into the player as midi file.
         */
		alphatabApiRef.current.playerReady.on( () => {
            console.log( 'Player Ready !!!' );
        });
		
  	}, [tabId]);
  
	return (
		<div className="row" style={{marginTop: "80px"}}>
	        { scoreLoaded ? ( <PlayerControls player={alphatabApiRef.current} /> ) : '' }
	    
	        <div id="tablatureWrapper">
	            <div id="song-details" ref={scoreHeadRef}>
	                <h1 className="artist"></h1>
	                <h2 className="title"></h2>
	                <h3 className="album"></h3>
	                
	            </div>
	            <div id="alphaTab" ref={scoreBodyRef}
	                data-add-favorite-url={`${remoteUrl}/tablatures/${tabId}/add-favorite`}
	            ></div>
	        </div>
	    </div>
	);
};

export default Player;
