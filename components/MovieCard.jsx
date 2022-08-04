import { useState } from "react"
export default function MovieCard(props){
    const [imageLoaded, setImageLoaded] = useState(false)
    let imgURL = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
    const handleGuess = () => {
        if (props.side === "left")
            props.updateGuess(1)
        if (props.side === "right")
            props.updateGuess(2)
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={imgURL} className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={()=> setImageLoaded(true)}></img>
            <div onClick={()=>{handleGuess(); setImageLoaded(false);}} className="text-center text-red-300 text-lg font-semibold hover:text-blue-600 cursor-pointer" >{props.movie.title}</div>
        </div>
    )
}