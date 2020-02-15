export function scrollInto(scrollId) {
	let element = document.getElementById(`${scrollId}`);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
}
