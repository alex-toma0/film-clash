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
        <div className="flex flex-col w-1/3 h-full items-center justify-center align-middle break-words">
            <img src={imgURL} className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={()=> setImageLoaded(true)}></img>
            <span onClick={()=>{handleGuess(); setImageLoaded(false);}} className="md:text-lg mt-3 p-0 text-sm text-center text-red-400 
            font-semibold hover:text-blue-600 cursor-pointer h-1/2" >{props.movie.title}</span>
        </div>
    )
}