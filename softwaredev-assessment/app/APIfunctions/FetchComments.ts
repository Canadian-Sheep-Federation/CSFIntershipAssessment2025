//Fetch comments for a specific team
export const fetchComments = async (id: string) => {
    if (!id) {
        console.error("Team ID is not defined");
        return;
    }
          const res = await fetch(`http://localhost:3000/api/getCommentsbyId?teamId=${id}`, {
                method: "GET",
                headers: {
                        "Content-Type": "application/json",
            },})
  
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          console.log(data);
          return data;
        };