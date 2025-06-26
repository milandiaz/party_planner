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
const API = BASE + COHORT + RESOURCE;

// === State ===
let parties = [];
let selectedParty;

/** Updates state with all artists from the API */
async function getParties() {
  // TODO
  try {
    const response = await fetch(API + "/events");
    const result = await response.json();
    parties = result.data;
    console.log(response);
    console.log(result);
    // render();
  } catch (error) {
    console.error(error);
  }
}

/** Updates state with a single artist from the API */
async function getParty(id) {
  // TODO
  try {
    const response = await fetch(API + "/events/" + id);
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
  // TODO
  const $item = document.createElement("li");
  $item.innerHTML = `
  <li><a href="#selected">${party.name}</a></li>
  `;
  $item.addEventListener("click", () => getArtist(artist.id));

  return $item;
}

/** A list of names of all artists */
function PartyList() {
  // TODO
  const $list = document.createElement("ul");
  $list.classList.add("lineup");
  const $parties = parties.map(ArtistListItem);
  $list.replaceChildren(...$parties);

  return $list;
}

/** Detailed information about the selected artist */
function ArtistDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an artist to learn more.";
    return $p;
  }

  // TODO

  const $details = document.createElement("Article");
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
    <h1>Fullstack Gala</h1>
    <main>
      <section class>
        <h2>Lineup</h2>
        <ArtistList></ArtistList>
      </section>
      <section id="selected">
        <h2>Artist Details</h2>
        <ArtistDetails></ArtistDetails>
      </section>
    </main>
  `;
  $app.querySelector("ArtistList").replaceWith(ArtistList());
  $app.querySelector("ArtistDetails").replaceWith(ArtistDetails());
}

async function init() {
  await getArtists();
  render();
}

init();
