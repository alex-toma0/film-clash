import Head from 'next/head'
import getRandomInt from '../utils/getRandomInt'
import MovieCard from '../components/MovieCard'
import Score from '../components/Score'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { useRouter} from 'next/router'
export default function Home(props) {  
  const router = useRouter()
  const [guess, setGuess] = useState(0)
  const [score, setScore] = useState(0)
  const [data, setData] = useState()
  const [left, setLeft] = useState()
  const [right, setRight] = useState()
  const [loading, setLoading] = useState(false)
  const [showAlert, setAlert] = useState(false)
  useEffect( () => {
    setLoading(true)
    const fetchMovies = async () => {
      let page = 1 + getRandomInt(20)
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=6a267a4c1d4e66f5cba8c5bbb1982eec&page=${page}&language=en-US` 
      let res = await fetch(url)
      let json = await res.json()
      let movieList = json.results
      let leftIndex = getRandomInt(movieList.length)
      let rightIndex = getRandomInt(movieList.length)
      while (rightIndex === leftIndex)
        rightIndex = getRandomInt(movieList.length)
      setLeft(leftIndex)
      setRight(rightIndex)
      setData(movieList)
    }
    if (showAlert) {
      alert("Game over!")
      setTimeout(()=>{}, 1000)
      router.reload()
    }
    // Load the movies initially
    if (guess === 0) {
      fetchMovies()
    }

    // When the user chose the first movie
    if (guess === 1) {
      if (data[left].popularity <= data[right].popularity) {
        setScore(score + 1)
        setGuess(0)
      }
      else {
        setAlert(true)
      }
    }
    // When the user chose the second movie
    if (guess === 2) {
      if (data[right].popularity <= data[left].popularity) {
        setScore(score + 1)
        setGuess(0)
      }
      else {
        setAlert(true)
      }
    }
    setLoading(false)
    
  }, [guess, showAlert])
  
  const updateGuess = (number) => {
    setGuess(number)
  }

  // Displays a loading message before data response is fetched
  if (loading || !data)
    return <p>Loading...</p>
  console.log(`left popularity: ${data[left].popularity}
    right popularity: ${data[right].popularity}`)
  
    
  return (
    
      <div className="h-screen w-screen">
       <Header title="FilmClash"/>
       <Head>
        <title>Film Clash</title>
       </Head>
       <div className="flex flex-col w-full h-5/6 justify-center items-center bg-gradient-to-b from-gray-800 to-gray-600">
        <div className="w-full flex flex-row justify-evenly items-center">
          <MovieCard movie={data[left]} updateGuess={updateGuess} side="left"/>
          <div className="text-2xl md:text-5xl font-extrabold text-red-400">VS</div>
          <MovieCard movie={data[right]} updateGuess={updateGuess} side="right"/>
        </div>
          <Score score={score} ></Score>
         </div>
       </div>
     
  )
}

