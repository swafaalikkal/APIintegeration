let dataId = 10;

fetchData(dataId);

async function fetchData(id) {
    try{
        const response = await fetch(ENV.BASE_URL);

        if(!response.ok){
            throw new Error('response was not ok');
        }
        const data = await response.json();
        for(let item of data) {
            if(item.id == id ){
                for(let [key, value] of Object.entries(item)){
                    console.log(key + " : " + value);
                }
                return;
            }else{
                console.log("data not found");
            }
        }
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
}