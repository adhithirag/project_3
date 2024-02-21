function displayInformationCard(id, title, information, position, themap, icon) {
    let customControl = L.control({position: position});
    customControl.onAdd = function (myMap) {
        d3.select(`#${id}`).remove();
        let div = L.DomUtil.create('div', 'info legend leaflet-control');
        div.id = id;
        let iconEl = typeof icon !== "undefined" ? `<strong><span class='fa ${icon}'></span>&nbsp;${title}</strong>` : `<h3>${title}</h3>`;
        div.innerHTML = `${iconEl}<hr/>${information}`;
        return div;
    };
    customControl.addTo(themap);
}

function displayInformationBox(id, information, position, themap, icon) {
    let customControl = L.control({position: position});
    customControl.onAdd = function (myMap) {
        d3.select(`#${id}`).remove();
        let div = L.DomUtil.create('div', 'info legend leaflet-control');
        div.id = id;
        let iconEl = typeof icon !== "undefined" ? `<span style="font-size: 23px; padding:2px;" class='fa ${icon}'></span>&nbsp;${information}` : `<h4>${information}</h4>`;
        div.innerHTML = `${iconEl}`;
        return div;
    };
    customControl.addTo(themap);
}