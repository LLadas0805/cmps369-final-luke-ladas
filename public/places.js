
const loadPlaces = async (param) => {
    
    
    

    
        for (const element of param) {
        
            
        
            
                
                const marker = L.marker([element[7], element[8]]).addTo(map)
                .bindPopup(`<b>${element[1]}  ${element[2]}</b><br/>${element[6]}`);

                
                
            
        }
    

    console.log(response);

    
   
}

const on_row_click = (event) => {

    
    



    const lat = event.target.getAttribute('data-lat');
    const lng = event.target.getAttribute('data-lng');

    map.flyTo(new L.LatLng(lat, lng));
 }


const map = L.map('map').setView([41, -74], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



