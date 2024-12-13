let currentSong = new Audio();

let songsData;

function convertSecondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;

}


async function germySongs() {
    let data = await fetch("http://127.0.0.1:5500/songs/");
    let reposnse = await data.text();
    let element = document.createElement("div")
    element.innerHTML = reposnse;

    let aes = element.querySelectorAll("a");
    let Songs = [];
    for (let i = 0; i < aes.length; i++) {
        const allSongsList = aes[i];
        if (allSongsList.href.endsWith(".mp3")) {
            Songs.push(allSongsList.href.split("songs/")[1].replaceAll("%20", " "))
        }
    }
    return Songs;
}

const playMusic = (track) => {
    // let audio = new Audio(`http://127.0.0.1:5500/songs/${track}`)
    currentSong.src = `http://127.0.0.1:5500/songs/${track}`;
    currentSong.play()
    play.src = "pause.svg";

    document.querySelector(".songInfo").innerHTML = track;
    let x = document.querySelector(".songTime").innerHTML = "00:00";
    //    console.log(x)





}



async function main() {

    songsData = await germySongs()
    //  console.log(songsData)


    let displayPlaylist = document.querySelector(".playlist ul")
    for (const music of songsData) {
        let songsdisplay = document.createElement("li");
        songsdisplay.innerHTML = music
        displayPlaylist.appendChild(songsdisplay)
    }

    Array.from(document.querySelector(".playlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.innerHTML)
            playMusic(e.innerHTML)


        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        }
        else {
            currentSong.pause()
            play.src = "play.svg";
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songTime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)} / ${convertSecondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seek").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        console.log(e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
        currentSong.currentTime = (currentSong.duration) * percent / 100
    })


    // Next and previous buttons

    document.getElementById("previous").addEventListener("click", () => {
        console.log("Previous button clicked");
        let currentSongName = currentSong.src.split("/").slice(-1)[0].replace(/%20/g, " ");
        let index = songsData.indexOf(currentSongName);

        console.log(songsData, index);

        console.log("Current song: ", currentSongName);
        if ((index - 1) >= 0) {
            playMusic(songsData[index - 1])
        }
    });


    document.getElementById("next").addEventListener("click", () => {
        console.log("Next Click")

        let currentSongName = currentSong.src.split("/").slice(-1)[0].replace(/%20/g, " ");
        let index = songsData.indexOf(currentSongName);
        console.log(songsData, index);

        if ((index + 1) < songsData.length + 1) {
            playMusic(songsData[index + 1])
        }
    })

    // range volume btn 

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log(e, e.target, e.target.value)
        currentSong.volume = parseInt(e.target.value)/100;
    })


}

main()


document.querySelector(".hamberger").addEventListener("click", (e) => {
    document.querySelector(".playlistSide").style.left = 0 + "px";
})

document.querySelector(".close").addEventListener("click", (e) => {
    document.querySelector(".playlistSide").style.left = -504 + "px";
})



// songs

const mySongsShows = (image, title, about) => {

    let html = `<div class="cardImg">
    <div class="card" >
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${about}</p>
    
    </div>
    </div>
    </div>`;

    document.querySelector(".playlistrightsection").innerHTML = document.querySelector(".playlistrightsection").innerHTML + html;

}
mySongsShows("/images/songs2.jpg", "Hello songs", "This is song is on trebnding")
mySongsShows("/images/songs3.jpg", "Hello songs", "This is song is on trebnding")
mySongsShows("/images/songs4.jpg", "Hello songs", "This is song is on trebnding")