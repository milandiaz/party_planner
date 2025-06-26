/**
 * @typedef Artist
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-Milan"; // Make sure to change this!
const RESOURCE = "/events";
const API = `${BASE}${COHORT}/events`;

// === State ===
let parties = [];
let selectedParty;

/** Updates state with all artists from the API */
async function getParties() {
  // TODO
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    console.log(response);
    console.log(result);
    render();
  } catch (error) {
    console.error(error);
  }
}

/** Updates state with a single artist from the API */
async function getParty(id) {
  // TODO
  try {
    const response = await fetch(`${API}/${id}`);

    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

console.log(selectedParty);

// === Components ===

/** Artist name that shows more details about the artist when clicked */
function PartyListItem(party) {
  const $item = document.createElement("li");

  if (selectedParty && party.id === selectedParty.id) {
    $item.classList.add("selected");
  }

  const $link = document.createElement("a");
  $link.href = "#selected";
  $link.textContent = party.name;
  $link.addEventListener("click", () => getParty(party.id));

  $item.appendChild($link);
  return $item;
}

/** A list of names of all artists */
function PartyList() {
  // TODO
  const $list = document.createElement("ul");
  $list.classList.add("lineup");
  const $parties = parties.map(PartyListItem);
  $list.replaceChildren(...$parties);

  return $list;
}

/** Detailed information about the selected artist */
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an artist to learn more.";
    return $p;
  }

  // TODO

  const $details = document.createElement("article");
  $details.innerHTML = /* HTML */ ` <section class="artist">
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <figure></figure>
    <p>${selectedParty.description}</p>
  </section>`;

  return $details;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
    <section id="list">
      <h2>Upcoming Parties</h2>
    </section>
    <section id="selected">
      <h2>Party Details</h2>
    </section>
  </main>
`;

  $app.querySelector("#list").appendChild(PartyList());
  $app.querySelector("#selected").appendChild(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
