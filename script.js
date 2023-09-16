const form = document.querySelector(".form");
const inputDistance = document.querySelector(".input--distance");
const inputDuratin = document.querySelector(".form--inputduration");
const inputCadence = document.querySelector(".form--inputcadence");
const inputElevation = document.querySelector(".form--inputelevationgain");
const fromBtn=document.querySelector(".form--button");
const optType=document.querySelector(".form--inputtype");


class workouts{
  #map;
  #mapEvent;
  constructor(){
    this._getLocation();
    document.addEventListener("keydown", this._newWorkout.bind(this));

      optType.addEventListener("change",this._toggleField);

  }

  _getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
        alert("Location not found");
      })
    }
  }

  _loadMap(position){
      const { longitude } = position.coords;
      const { latitude } = position.coords;
      // console.log(longitude);
      // console.log(latitude);
      const coord = [latitude, longitude];
      // console.log(coord);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      this.#map = L.map("map").setView(coord, 15);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);

      this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE){
    this.#mapEvent = mapE;
    // console.log(mapE);
    form.classList.remove("form--hidden");
    inputCadence.value=inputDistance.value=inputDuratin.value=inputElevation.value="";
    inputDistance.focus();
  }

  _toggleField(){
        inputCadence.closest(".form--row").classList.toggle("form--row--hidden");
        inputElevation.closest(".form--row").classList.toggle("form--row--hidden");
  }

  _newWorkout(e){
    if(e.key==="Enter"){
      e.preventDefault();
      const { lat } = this.#mapEvent.latlng;
      const { lng } = this.#mapEvent.latlng;
    // console.log(lat, lng);
    L.marker([lat, lng])
    .addTo(this.#map)
    .bindPopup(
        L.popup({
          maxWidth: 20,
          minWidth: 120,
          autoClose: false,
          closeOnClick: false,
          className: "running",
        })
        )
        .setPopupContent("Workout")
        .openPopup();
      }
  }

};


const workout=new workouts();


