window.moment.tz.add([
  'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
]);

export default function (time) {
	return window.moment(new Date(time)).tz('America/New_York');
}
