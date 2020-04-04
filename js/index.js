
const API_KEY = "AIzaSyAF6Fpdkbso7a-2rLLWX-YNJDEAtU6wNh8";

function fetchVideos( searchTerm, token ){

    let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${searchTerm}&maxResults=10&pageToken=${token}`

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
          console.log(responseJSON)
            displayResults( responseJSON, searchTerm);
        })
        .catch( err => {
            console.log( err );
        });
}

function displayResults( data, searchTerm){
    let results = document.querySelector( '.results' );

    results.innerHTML = "";

    for( let i = 0; i < data.items.length; i ++ ){

        results.innerHTML += `
            <div>
                <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
                  <h2>
                      ${data.items[i].snippet.title}
                  </h2>
                </a>
                <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
                  <div>
                      <img src="${data.items[i].snippet.thumbnails.medium.url}" />
                  </div>
                </a>
            </div>
        `;
    }
    extraButtons(data, results, searchTerm)
}

function extraButtons(data, results, searchTerm){

  if(data.hasOwnProperty("prevPageToken")){
    results.innerHTML += `
    <span class="extrabt">
      <button type="button" name="button" class="prev">Prev</button>
      <button type="button" name="button" class="next">Next</button>
    </span>
    `;

    let prevbut = document.querySelector( '.prev' );
    let nextbut = document.querySelector( '.next' );

    prevbut.addEventListener('click', (event) =>{
      fetchVideos(searchTerm, data.prevPageToken)
    });

    nextbut.addEventListener('click', (event) =>{
      fetchVideos(searchTerm, data.nextPageToken)
    });


  }else{
    results.innerHTML += `
    <span class="extrabt">
      <button type="button" name="button" class="next">Next</button>
    </span>
    `;
    let nextbut = document.querySelector( '.next' );

    nextbut.addEventListener('click', (event) =>{
      fetchVideos(searchTerm, data.nextPageToken)
    });

  }
}

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        let searchTerm = document.querySelector( '#searchTerm' ).value;

        fetchVideos(searchTerm, "");

    });
}


function init(){
    watchForm();
}

init();
