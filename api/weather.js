
export default async function handler(request, response) {
  
  const { city } = request.query; 
  
  const API_KEY = process.env.API_KEY; 

  try {
    const apiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await apiResponse.json();
    
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch weather data" });
  }
}