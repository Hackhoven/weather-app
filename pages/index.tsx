import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/index.module.css';
import axios from 'axios';

const Home: React.FC = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const fetchWeather = async (locationKey: string) => {
        try {
            const weatherResponse = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, {
                params: {
                    apikey: 'YOUR API KEY',
                    language: 'en-us',
                    details: true,
                    metric: true,
                }
            });

            const weatherData = weatherResponse.data[0];
            console.log('Weather Data:', weatherData);
            setWeatherData(weatherData);
            setSearchResults([]); // Clear search results when weather data is fetched
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const searchCities = async () => {
        try {
            const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search`, {
                params: {
                    apikey: 'YOUR API KEY',
                    q: city,
                    language: 'en-us',
                    details: false,
                    metric: true,
                }
            });

            if (response.data.length > 0) {
                const selectedCity = response.data[0]; // Select the first city from the search results
                setCity(selectedCity.LocalizedName); // Update the input field with the selected city name
                await fetchWeather(selectedCity.Key); // Fetch weather data for the selected city
            } else {
                // Handle case when no cities are found
                console.log('No cities found for the search query:', city);
            }
        } catch (error) {
            console.error('Error searching cities:', error);
        }
    };

    return (
        <Layout>
            <div className={styles.container}>
                <img src='/weather-image.jpg' alt='weather' className={styles.weatherImage} />

                <div className={styles.inputContainer}>
                    <input type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} />
                    <button onClick={searchCities}>Search</button>
                </div>

                <div className={styles.searchResultsContainer}>
                    {searchResults.length > 0 && (
                        <div className={styles.searchResults}>
                            <h3>Search Results</h3>
                            <ul>
                                {searchResults.map((result: any) => (
                                    <li key={result.Key}>{result.LocalizedName}, {result.Country.LocalizedName}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles.weatherData}>
                    {weatherData && (
                        <div>
                            <h2>Current Weather</h2>
                            <p>Temperature: {weatherData.Temperature?.Metric.Value} °{weatherData.Temperature?.Metric.Unit}</p>
                            <p>Weather Condition: {weatherData.WeatherText}</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className={styles.footer}>
                <div>
                    &copy; 2024 Hackhoven's Weather App. All rights reserved.
                </div>
            </footer>
        </Layout>
    );
};

export default Home;
