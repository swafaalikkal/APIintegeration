let dataId = 2;

fetchData(dataId);

async function fetchData(id) {
    try{
        const response = await fetch(ENV.BASE_URL);

        if(!response.ok){
            throw new Error('response was not ok');
        }
        const data = await response.json();
        let item = data.find(item => item.id === id)
            if(item){
                for(let [key, value] of Object.entries(item)){
                    console.log(key + " : " + value);
                }
                if(item.address){
                    console.log('Address:');
                    for(let[key, value] of Object.entries(item.address)){
                        console.log(key + " : " + value);
                    }
                    if(item.address.geo){
                        console.log('Geo Coordinates:');
                        for(let[key, value] of Object.entries(item.address.geo)){
                            console.log(key + " : " + value);
                        }
                    }
                }
                if(item.company){
                    console.log('Company:');
                    for(let[key, value] of Object.entries(item.company)){
                        console.log(key + " : " + value);
                    }
                }
            }
            else{
                console.log("data not found");
            }
        
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
}

