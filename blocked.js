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
	document.querySelector('p a:last-child').innerHTML = 'copy ✔'; //.appendChild(document.createTextNode(' ✔'));
}

document.addEventListener('DOMContentLoaded', function(){
	document.querySelector('p span:first-child').appendChild(document.createTextNode(targetLink));
	document.querySelector('p a:first-child').setAttribute('href', targetLink);
	document.querySelector('p a:last-child').addEventListener('click', copyLink);
});