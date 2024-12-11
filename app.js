
const userDetails = document.getElementById("user-details");
const loading = document.getElementById("loading");
const cardContainer = document.getElementById("card-container");

cardContainer.classList.add("d-none");

window.addEventListener("load", () => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get("id");
    if(userId) {
        fetchData(userId);
    }
    else{
        userDetails.innerHTML = `<p class="text-danger">user not found</p>`;
    }
});

async function fetchData(userId) {
    try{
        const response = await fetch(`${ENV.BASE_URL}/${userId}`);
        if(!response.ok){
            throw new Error(`response was not ok. ${error.message}`);
        }

        const data = await response.json();
        setTimeout(() => {
            if(data){
                displayUserDetails(data);
            }
            else{
                hideLoading();
                userDetails.innerHTML = `<p class="text-danger">data not found</p>`;
            }
        },5000);
    }
    catch(error){
        hideLoading();
        console.error('There was a problem with the fetch operation:', error);
        userDetails.innerHTML = `<p class="text-danger text-center" >Error: Data not found. Please try again</p>`;
    }
}

function displayUserDetails(data) {
    hideLoading();

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

function hideLoading() {
    loading.classList.remove("d-flex");
    loading.classList.add("d-none");
    cardContainer.classList.remove("d-none");

}