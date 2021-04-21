import Lsi from "./time-zone-lsi";

const timeZones = ["Europe/Prague", "Asia/Tokyo", "America/Los_Angeles"];

function list() {
  return timeZones;
}

function getLsi(timeZone) {
  return Lsi[timeZone];
}

export { list, getLsi };
export default { list, getLsi };
