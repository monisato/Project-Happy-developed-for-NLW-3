// tipos de dados
// string ""
// number 01
// object {}
// boolean true or false
// array []

// create map
const map = L.map("mapid").setView([-27.218094, -49.6499905], 15);

// create and add tilelayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // addd icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// adicionar o campo de fotos
function addPhotoField() {
  // pegar o container de fotos #images
  const container = document.querySelector("#images");

  // pegar o container para duplicar .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");

  // realizar o clone da última image adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
  // igual == ----- diferente != ------
  const input = newFieldContainer.children[0];
  if (input.value == "") {
    return;
  }

  // limpar o campo antes de adicionar ao container de imagens
  input.value = "";

  // adicionar o clone ao container de #images
  container.appendChild(newFieldContainer);
}

// remover container de foto adicionada
// console.log(event.currentTarget) testar o que está disparando o event
function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  // menor e igual <= ---- maior e igual >= ---- poderia ser | <= 1 |
  if (fieldsContainer.length < 2) {
    //limpar o valor do campo
    span.parentNode.children[0].value = "";
    return;
  }

  // deletar o campo
  span.parentNode.remove();
}

// selecionar sim e não
function toggleSelect(event) {
  // retirar a class .active (dos botões)
  document
    .querySelectorAll(".button-select button")
    // versão resumida --- .forEach( button => button.classList.remove('active') )
    .forEach(function (button) {
      button.classList.remove("active");
    });

  // colocar a class .active no botão clicado
  const button = event.currentTarget;
  button.classList.add("active");

  // atualizar o meu input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]');

  // verificar se sim ou não data-value 1 ou 0
  input.value = button.dataset.value;
}

function validate(event) {
  
  // validar se lat e lng estão preenchidos - desafio 
    
  const needsLat = document.querySelector('[name="lat"]');
  const needsLng = document.querySelector('[name="lng"]');
  
  if(needsLat.value == "" || needsLng.value == "" ) {
    event.preventDefault()
    alert('Selecione uma localização no mapa!')
  } 
}