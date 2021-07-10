document.addEventListener('DOMContentLoaded', (ev) => {
    var invalidPosition = -1;
    var keyDefaultQueryParams = '?q=';
    var queryParams = window.location.search || null;

    verifyExecuteAnimation();

    document.querySelector('#input-search').addEventListener('keyup', (ev) => {
        let keyEnter = 'enter';

        if (ev.key.toLowerCase() == keyEnter) {
            let urlToPranks = generateUrlToPranks();
            insertValueToClipboard(urlToPranks);
        }
    });

    document.querySelector('#btn-search').addEventListener('click', (ev) => {
        ev.preventDefault();
        let urlToPranks = generateUrlToPranks();
        insertValueToClipboard(urlToPranks);
    });

    function verifyExecuteAnimation() {
        if (existSearchTerm()) {
            executeAnimation(getSearchTerm());
        }
    }

    function existSearchTerm() {
        return queryParams && queryParams.indexOf(keyDefaultQueryParams) != invalidPosition;
    }

    function getSearchTerm() {
        let searchTerm = new URLSearchParams(queryParams).get('q');
        return searchTerm;
    }

    function executeAnimation(searchWordInGoogle) {
        firstStepToSearch();
        animationWrite(searchWordInGoogle);
    }

    function animationWrite(word) {
        let elementInput = document.querySelector('#input-search');
        addWordInput(elementInput, word);
    }

    function addWordInput(elementInput, word) {
        let index = 0;
        let total = word.length;

        let intervalWordInput = setInterval(() => {
            if (index >= total) {
                clearInterval(intervalWordInput);
                animationStepsToSearch(null, null, () => redirectToGoogle(word));
                return;
            }

            elementInput.value += word[index];
            index++;
        }, 200);
    }

    function firstStepToSearch() {
        let step = ['1: Passo Clique na caixa de pesquisa'];
        animationStepsToSearch(step, 100);
    }

    function animationStepsToSearch(steps=null, time=null, cb=false) {
        time = time || 1500;
        steps = steps || ['2: Passo aperte o enter', 'Muito, Dificil né?!'];
        let index = 0;
        let total = steps.length;
        let elementSteps = document.querySelector('#steps');

        let intervalSteps = setInterval(() => {
            if (index >= total) {
                clearInterval(intervalSteps);
                if (cb && typeof(cb) == 'function') {
                    cb();
                }
                return;
            }

            elementSteps.textContent = steps[index];
            index++;
        }, time);
    }

    function redirectToGoogle(word) {
        let urlGoogle = 'https://www.google.com/search?q=';
        window.location.href = urlGoogle + word;
    }

    function generateUrlToPranks() {
        let elementInput = document.querySelector('#input-search');
        let searchTerm = elementInput.value;

        if (!searchTerm) {
            return;
        }

        let urlPermitaMe = location.href + '?q=';
        let urlToPranks = generateUrl(urlPermitaMe + searchTerm.trim());

        return urlToPranks;
    }

    function generateUrl(value) {
        let url = new URL(value);
        return url;
    }

    function insertValueToClipboard(value) {
        if (!value) {
            return;
        }

        navigator.clipboard.writeText(value).then(function() {
            addModal();
            console.log('ok!');
          }, function() {
            console.log('faild!');
        });
    }

    function addModal() {
        removeModal();

        let message = 'Seu link foi copiado com sucesso! Envie para um dos seus amigos ou familiares.';
        let div = document.createElement('div');
        div.append(message);
        div.classList.add('modal');

        document.querySelector('body').append(div);
    }

    function removeModal() {
        let modal = document.querySelector('.modal');

        if (modal) {
            modal.remove();
        }
    }
});
