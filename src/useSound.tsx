import { useState } from "react";

type Src = 'pi' | 'pii';

type Audios = {
    [K in Src]: HTMLAudioElement;
}

const audios: Audios = {
    pi: new Audio('/pi.mp3'),
    pii: new Audio('/pii.mp3'),
};

function useSound() {
    const [nowPlaying, setNowPlaying] = useState<Src>('pii');

    function play(src: Src = nowPlaying, time?: number) {
        if (time !== undefined) {
            audios[src].currentTime = 0;
        }
        audios[src].play();
        setNowPlaying(() => src);
    }

    function pause(src: Src = nowPlaying) {
        audios[src].pause();
    }

    return [play, pause] as const;
}

export default useSound;
