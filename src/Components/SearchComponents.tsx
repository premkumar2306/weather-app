import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Icon } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { ImLocation } from 'react-icons/im'
import axios from "axios"
import { useEffect, useState } from "react"
import { Weather } from "./Weather"

const key = '1dabbd1dd47e4750918c6baa7cece85c';
const geoLocation = (pos: any) => {
    const crd = pos.coords
    const location: location = {
        lat: crd.latitude,
        long: crd.longitude
    }
    localStorage.setItem('location', JSON.stringify(location))
}

function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

interface location {
    lat: number,
    long: number
}


export const SearchComponents = () => {
    const [locationDetail, setLocationDetail] = useState<string>("")
    const [weatherDetail, setWeatherDetail] = useState<Array<void>>([])
    const [dayWeatherDetail, setDayWeatherDetail] = useState<Array<void>>([])
    const value = localStorage.getItem('location') || JSON.stringify({ lat: 38.685516, long: -101.073324 })
    let location: location;
    if (typeof value === 'string') {
        location = JSON.parse(value)
    }

    useEffect(() => {
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.lat}&lon=${location.long}&days=7&key=${key}`)
            .then((res) => setWeatherDetail(res.data))
        axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${location.lat}&lon=${location.long}&key=${key}`)
            .then((res) => setDayWeatherDetail(res.data))

    }, [])

    const getWeatherDetail = async () => {
        const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${locationDetail}&days=7&units=S&key=${key}`)
        const res = await data
        setWeatherDetail(res)
        const value = await axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${locationDetail}$units=S&key=${key}`)
        const dataRes = await value.data
        setDayWeatherDetail(dataRes)
    }

    return (
        <Box>
            <InputGroup my='5%'  >
                <InputLeftElement children={<Icon as={ImLocation} />} />
                <Input value={locationDetail} onChange={(({ target }) => setLocationDetail(target.value))} placeholder="Enter City Name" boxShadow='xs' />
                <InputRightElement onClick={getWeatherDetail} children={<Search2Icon />} />
            </InputGroup>
            <Weather getWeatherDetail={weatherDetail} singleDayDetail={dayWeatherDetail} />
        </Box>
    )
}

navigator.geolocation.getCurrentPosition(geoLocation, error)