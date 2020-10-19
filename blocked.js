const urlParams = new URLSearchParams(window.location.search);
var targetLink = urlParams.get('u');

function editLink(navigateToEnd) {
	const linkElement = document.querySelector('span');
	linkElement.addEventListener('keydown', function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			linkElement.contentEditable = false;
			if (event.metaKey) {
				window.location.href = targetLink;
			}
		}
	}, false);
	linkElement.addEventListener('input', function(event) {
		targetLink = this.textContent;
		document.querySelector('#visit').setAttribute('href', targetLink);
		window.history.replaceState(null, '', '?u=' + targetLink);
	}, false);

	linkElement.contentEditable = true;

	if (navigateToEnd && linkElement.textContent.length > 0) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.setStart(linkElement, 1);
		range.setEnd(linkElement, 1);
		selection.removeAllRanges();
		selection.addRange(range);
	}
	linkElement.focus();
}

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
		linkElement.textContent = targetLink;
		linkElement.addEventListener('click', function() { editLink(false); });
		document.querySelector('#visit').setAttribute('href', targetLink);
		document.querySelector('#edit-icon').addEventListener('click', function() { editLink(true); });
		document.querySelector('#edit-text').addEventListener('click', function() { editLink(true); });
		document.querySelector('#copy').addEventListener('click', copyLink);
	} else {
		document.querySelector('#edit-icon').classList.add('hidden');
		document.querySelector('p:last-child').classList.add('hidden');
	}
});