"use strict";
//.........................................................../variables/..............................................................
const form = document.querySelector(".form");
const pak = document.querySelector(".pak");
const distanceInput = document.querySelector(".distanceInput");
const form__container = document.querySelector(".form__container");
const durationInput = document.querySelector(".durationInput");
const caseInput = document.querySelector(".caseInput");
const input = document.querySelector("input");
const select__toggle = document.querySelector(".select__toggle");
const toggle__hidden = document.querySelector(".toggle__hidden");
const hidden = document.querySelector(".hidden");
const inputElevation = document.querySelector(".inputElevation");
const lab_input = document.querySelector(".lab_inp ");

//........................................................................../APP class and OBJECT/................................................

class app {
  #map;
  #mapreturn;
  #arrayWord = [];
  constructor() {
    this._getposition();
    form.addEventListener("submit", this._newWorkOut.bind(this));
    select__toggle.addEventListener("change", this._toggle);
    form__container.addEventListener("click", this._moveArrow.bind(this));
  }
  _getposition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert("cant acess the location");
      }
    );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapVar) {
    console.log(mapVar);
    console.log(".........");
    form.classList.remove("hidden");
    distanceInput.focus();
    this.#mapreturn = mapVar;
  }
  _hideFormAfter() {
    distanceInput.value =
      inputElevation.value =
      durationInput.value =
      caseInput.value =
        "";
    form.classList.add("hidden");
    // setTimeout(() => ((form.style.display = "grid"), 10000000));
  }
  _toggle() {
    inputElevation.closest(".lab_inp ").classList.toggle("toggle__hidden");
    caseInput.closest(".lab_inp ").classList.toggle("toggle__hidden");
  }
  _newWorkOut(e) {
    e.preventDefault();
    let word;
    const type = select__toggle.value;
    const distance = +distanceInput.value;
    const duration = +durationInput.value;
    if (type === "cycling") {
      const checkPositive = (...digit) => digit.every((val) => val > 0);
      const elv = +inputElevation.value;
      const checkString = (...digit) =>
        digit.every((val) => Number.isFinite(val));
      if (
        !checkString(distance, duration, elv) ||
        !checkPositive(distance, duration)
      )
        return alert("pakistan is pakistan");
      word = new cycling(this.#mapreturn.latlng, distance, duration, elv, type);
    }
    if (type === "running") {
      const cs = +caseInput.value;
      const checkPositive = (...digit) => digit.every((val) => val > 0);
      const checkString = (...digit) =>
        digit.every((val) => Number.isFinite(val));
      if (
        !checkString(distance, duration, cs) ||
        !checkPositive(distance, duration, cs)
      )
        return alert("pakistan is pakistan");
      word = new running(this.#mapreturn.latlng, distance, duration, cs, type);
      console.log(word);
    }
    this.#arrayWord.push(word);
    this._callMark(word); //object that has data in cycling or running
    // console.log(word);
    this._renderFrom(word);
    this._hideFormAfter();
  }
  _renderFrom(word) {
    console.log(word);
    let html = `
    <div class="renderForm ${word.names}-popup" id='${word.id}'>
              <h1 class="head1">${word.decription}</h1>
              <div class="inside-div">
                <p>${word.names === "cycling" ? "🚴‍♀️" : "🏃‍♂️"} ${
      word.distance
    } km</p>
                <p>⏱ ${word.duration} H</p>
                `;
    if (word.names === "cycling") {
      html += `<p>⚡ ${word.speed.toFixed(1)} H/km</p>
      <p>⛰ ${word.elevation} m</p>
    </div>
  </div>`;
    }
    if (word.names === "running") {
      console.log(word);
      html += `<p>⚡ ${word.pase.toFixed(1)} H/km</p>
      <p class='short'>🦶 ${word.cadence} spm</p>
    </div>
    </div>`;
    }
    form.insertAdjacentHTML("afterend", html);
  }
  _callMark(word) {
    const { lat, lng } = this.#mapreturn.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${word.names}-popup`,
        })
      )
      .setPopupContent(
        `${word.names === "cycling" ? "🚴‍♀️" : "🏃‍♂️"} ${word.decription}`
      )
      .openPopup();
  }
  _moveArrow(e) {
    const target = e.target;
    const mike = target.closest(".renderForm");
    // console.log(mike);
    const IDwork = this.#arrayWord.find((val) => val.id === mike.id);
    // console.log(IDwork.coords);
    this.#map.setView(IDwork.coords, 13, {
      animation: true,
      pan: { duration: 1 },
    });
  }
}

//................................................../workout Class/...............................................
class workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration, names) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
    this.names = names;
    this._setDate();
  }
  _setDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.decription = `${this.names[0].toUpperCase()}${this.names.slice(
      1
    )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}
class running extends workout {
  constructor(coords, distance, duration, cadence, names) {
    super(coords, distance, duration, names);
    this.cadence = cadence;
    this.calpase();
  }
  calpase() {
    this.pase = this.duration / this.distance;
    return this.pase;
  }
}
class cycling extends workout {
  constructor(coords, distance, duration, elvgain, names) {
    super(coords, distance, duration, names);
    this.elevation = elvgain;
    this.calspeed();
  }
  calspeed() {
    this.speed = this.distance / this.duration;
  }
}
// const workout1 = new workout([51.5, -0.12], 5.2, 25);
// const workout2 = new workout([51.5, -0.11], 5.2, 25);
//...................................................../instances/.......................................................
const insta = new app();
