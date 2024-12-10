const userDetails = document.getElementById("user-details");
const loading = document.getElementById("loading");
const cardContainer = document.getElementById("card-container");
loading.classList.remove("d-none");
cardContainer.classList.add("d-none");

window.addEventListener("load", () => setTimeout(fetchData,5000));

async function fetchData() {
    loading.classList.remove("d-flex");
    loading.classList.add("d-none");
    try{
        const response = await fetch(`${ENV.BASE_URL}/users/2`);
        if(!response.ok){
            throw new Error('response was not ok');
        }

        const data = await response.json();
        if(data){
            for(let [key, value] of Object.entries(data)){
                console.log(`${key} : ${value}`);
            }
            if(data.address){
                console.log('Address:');
                for(let[key, value] of Object.entries(data.address)){
                    console.log(`${key} : ${value}`);
                }
                if(data.address.geo){
                    console.log("Geo Coordinates:");
                    for(let[key, value] of Object.entries(data.address.geo)){
                        console.log(`${key} : ${value}`);
                    }
                }
            }
            if(data.company){
                console.log('Company:');
                for(let[key, value] of Object.entries(data.company)){
                    console.log(`${key} : ${value}`);
                }
            }
            displayUserDetails(data);
        }
        else{
            console.log("data not found");
        }
        
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayUserDetails(data) {
    cardContainer.classList.remove("d-none");

    const userInfo = `
        <ul class="list-group  list-group-flush">
            <li class="list-group-item"><strong>Id:</strong> ${data.id}</li>
            <li class="list-group-item"><strong>Name:</strong> ${data.name}</li>
            <li class="list-group-item"><strong>Username:</strong> ${data.username}</li>
            <li class="list-group-item"><strong>Email:</strong> ${data.email}</li>
            <li class="list-group-item"><strong>Address:</strong> 
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Street: ${data.address.street}</li>
                    <li class="list-group-item">Suite: ${data.address.suite}</li>
                    <li class="list-group-item">City: ${data.address.city}</li>
                    <li class="list-group-item">Zipcode: ${data.address.zipcode}</li>
                    <li class="list-group-item">Geo Coordinates:
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">lat: ${data.address.geo.lat}</li>
                        <li class="list-group-item">lat: ${data.address.geo.lng}</li>
                    </ul>
                    </li>
                </ul>
            </li>
            <li class="list-group-item"><strong>Phone:</strong> ${data.phone}</li>
            <li class="list-group-item"><strong>Website:</strong> ${data.website}</li>
            <li class="list-group-item"><strong>Company:</strong>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Name: ${data.company.name}</li>
                <li class="list-group-item">Catch Phrase: ${data.company.catchPhrase}</li>
                <li class="list-group-item">BS: ${data.company.bs}</li>
            </ul>
            </li>
        </ul>
    `;

    userDetails.innerHTML = userInfo;
}
