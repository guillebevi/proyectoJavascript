const key = 
"f020c04f4db37f06f8c09a940b651d1f" ;

const requestCity = async (city) => {
    const baseURL = `https://api.openweathermap.org/data/2.5/weather`

    const query = `?q=${city}&appid=${key}`

    const response = await fetch(baseURL + query)
     
    const data = await response.json()

    return data
    
};

