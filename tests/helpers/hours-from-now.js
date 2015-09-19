export default function(hours) {
  return new Date(new Date().valueOf() + (60*60*1000*hours));
}
