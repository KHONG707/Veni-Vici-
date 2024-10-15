class APIService {
    constructor(apiKey) {
      this.apiKey = apiKey;
    }
  
    async fetchRandomCat() {
      const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": this.apiKey
      });
  
      const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };
  
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions);
        const data = await response.json();
  
        if (data.length > 0) {
          return data[0]; // Return the first cat image object
        } else {
          throw new Error('No cat image available.');
        }
      } catch (error) {
        console.error('Error fetching cat data:', error);
        throw error;
      }
    }
  }
  
  export default APIService;
  