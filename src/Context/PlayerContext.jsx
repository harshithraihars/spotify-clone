import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext()
const PlayerContextProvider = (props) => {
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()
    const [track, setTrack] = useState(songsData[0])
    const [playerStatus, setPlyaerStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })
    const play = () => {
        audioRef.current.play()
        setPlyaerStatus(true)
    }
    const pause = () => {
        audioRef.current.pause()
        setPlyaerStatus(false)
    }
    const playwithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play()
        setPlyaerStatus(true)
    }
    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play()
            setPlyaerStatus(true)
        }
    }
    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play()
            setPlyaerStatus(true)
        }
    }
    const seekSong = async (e) => {
        console.log(e)
        // audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)

        const rect = seekBg.current.getBoundingClientRect();
        const offsetX = e.nativeEvent.pageX - rect.left + window.pageXOffset; // Adjusting for page scroll using window.pageXOffset
        const seekPosition = (offsetX / rect.width) * audioRef.current.duration;
        audioRef.current.currentTime = seekPosition;

    }
    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime(
                    {
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    }
                )
            }
        }, 1000)
    }, [audioRef])
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlyaerStatus,
        time,
        setTime,
        play,
        pause,
        playwithId,
        previous,
        next,
        seekSong
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider