const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

//Fetch teams of the East Conference
export const fetchOneTeam = async (id: string) => {
          if (!API_KEY || !API_HOST) {
            console.error("API key or host is not defined");
            console.log(API_HOST, API_KEY);
            return;
          }
      
          const res = await fetch(`https://${API_HOST}/teams/?id=${id}`, {
              //Use parameters to fetch teams of each conference
              method: "GET",
            headers: {
              "X-Rapidapi-Key": API_KEY,
              "X-Rapidapi-Host": API_HOST,
              "Host": API_HOST,
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          console.log(res);
      
          const data = await res.json();
          console.log(data);
          return data;
};
