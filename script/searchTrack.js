import {API_URL} from './const.js';
export const searchController = (renderCatalog, checkCount) => {
    const search = document.querySelector('.search');

    search.addEventListener('submit', async (e) => {
        e.preventDefault();
        const playlist = await fetch(`${API_URL}api/music?{search="${search.search.value}"}`).then((data) => {
            console.log(data);
            return data.json();
        })


        console.log(playlist);
        renderCatalog(playlist);
        checkCount();
    })
}