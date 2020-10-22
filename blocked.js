const urlParams = new URLSearchParams(window.location.search);
const originalLink = urlParams.get('u');
var targetLink = originalLink;

function setLink(link) {
	targetLink = link;
	document.querySelector('span').textContent = targetLink;
	document.querySelector('#visit').setAttribute('href', targetLink);
	window.history.replaceState(null, '', '?u=' + targetLink);
	setRootLink();
}

function editLink(navigateToEnd) {
	const linkElement = document.querySelector('span');
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
	document.querySelector('icon.copy').classList.remove('hidden');
}

function setRootLink() {
	const rootLink = document.querySelector('#root');
	const rootLinkParts = targetLink.split(/[/?]/);
	if (rootLinkParts.length >= 3) {
		rootLink.setAttribute('href', rootLinkParts[0] + '//' + rootLinkParts[2] + '/');
	} else {
		rootLink.setAttribute('href', '#');
	}
}

function stripLink() {
	setLink(targetLink.split('?')[0]);
}

function resetLink() {
	setLink(originalLink);
}

document.addEventListener('DOMContentLoaded', function(){
	if (targetLink) {
		setLink(targetLink);

		const linkElement = document.querySelector('span');
		linkElement.addEventListener('keydown', function(event) {
			if (event.keyCode == 13) {
				event.preventDefault();
				linkElement.contentEditable = false;
				if (event.metaKey) {
					document.querySelector('#visit').click();
				}
			}
		}, false);
		linkElement.addEventListener('input', function(event) {
			setLink(this.textContent);
		}, false);

		linkElement.addEventListener('click', function() { editLink(false); });
		document.querySelector('#edit').addEventListener('click', function() { editLink(true); });
		document.querySelector('#copy').addEventListener('click', copyLink);
		document.querySelector('#strip').addEventListener('click', stripLink);
		document.querySelector('#reset').addEventListener('click', resetLink);
	} else {
		document.querySelector('#edit').classList.add('hidden');
		const options = document.querySelectorAll('.options');
		options.forEach(option => {
			option.classList.add('hidden');
		});
	}
});