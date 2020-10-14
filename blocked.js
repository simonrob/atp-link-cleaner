const urlParams = new URLSearchParams(window.location.search);
const targetLink = urlParams.get('u');

function copyLink() {
	const copySource = document.createElement('textarea');
	copySource.value = targetLink;
	copySource.setAttribute('readonly', '');
	copySource.style.position = 'absolute';
	copySource.style.left = '-9999px';
	document.body.appendChild(copySource);

	copySource.select();
	document.execCommand('copy');
	document.body.removeChild(copySource);
	document.querySelector('icon').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function(){
	if (targetLink) {
		const linkElement = document.querySelector('span');
		linkElement.innerHTML = '';
		linkElement.appendChild(document.createTextNode(targetLink));
		document.querySelector('a:first-child').setAttribute('href', targetLink);
		document.querySelector('a:last-child').addEventListener('click', copyLink);
	} else {
		document.querySelector('p:last-child').classList.add('hidden');
	}
});