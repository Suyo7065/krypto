import { useEffect, useState } from 'react'

const APIKEY = import.meta.env.VITE_GIPHY_API

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState('')

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword
          .split(' ')
          .join('')}&limit=1`,
      )
      const { data } = await response.json()
      console.log(data)
      if (data.length > 0) {
        console.log('YIYIYI')
        setGifUrl(data[0]?.images?.downsized_medium.url)
      } else {
        console.log('YOOYOYOYO')
        setGifUrl(
          'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284',
        )
      }
    } catch (error) {
      console.log(error)
    }
    console.log(gifUrl)
  }

  useEffect(() => {
    if (keyword) fetchGifs()
  }, [keyword])

  return gifUrl
}

export default useFetch
