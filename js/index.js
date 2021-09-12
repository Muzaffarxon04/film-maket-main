let elForm = MakeElem('#form')
let movieList = MakeElem('.movie__list')
let movieGenreList = MakeElem('.movie__genre-list')
let movieGenre = MakeElem('.movie__genre')
let movieSearch = MakeElem('.movie__search')



function renderGenresSelect(films, element) {
    const result = []
    films.forEach(film => {
        film.genres.forEach(genre =>{
            if (!result.includes(genre)) {
                result.push(genre)
            }
        })
    })
    
    result.forEach(genre =>{
        const newOption = CreateDom('option')
        newOption.value = genre;
        newOption.textContent = genre
        
        element.appendChild(newOption)
    })
}

renderGenresSelect(films, movieGenre)



function render(arrFilm, element) {

    element.innerHTML = null
    arrFilm.forEach(film => {
        
        //creating elements
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newTime = CreateDom('time')
        let newGenreLi = CreateDom('h5')
        let newtext = CreateDom('p')
        let newbtn = CreateDom('button')
        
        // /////////modal window////////
let modalwin = CreateDom('div')
let modal = CreateDom('div')
let modaltitle = CreateDom('h2')
let modaldiscribtion = CreateDom('p')
let closebtn = CreateDom('button')

        //creating attributes 
        newLi.setAttribute('class','movie__item' )
        newImg.setAttribute('src', film.poster)
        newImg.setAttribute('width','150' )
        newImg.setAttribute('height','200')
        newHeading.setAttribute('class', 'movie__item-title')
        newTime.setAttribute('datetime', normalizeDate(film.release_date))
        newtext.setAttribute('class', 'text')
        newGenreLi.setAttribute('class', 'movie__genre')
        newbtn.setAttribute('class', 'learn__btn')    
        
        modalwin.setAttribute('class', 'modal__wrapper')
        modal.setAttribute('class', 'modal')
        modaldiscribtion.setAttribute('class', 'modal__text')
        
        modaltitle.setAttribute('class', 'modal__title')
        closebtn.setAttribute('class', 'close__btn')
        //elements content

        newHeading.textContent = film.title
        newtext.textContent = film.title
        newTime.textContent = normalizeDate(film.release_date)
        newGenreLi.textContent = film.genres
        newbtn.textContent = 'learn more'

     newbtn.dataset.uuid = film.id
        //appendChilds
        newLi.appendChild(newImg)
        newLi.appendChild(newHeading)
        newLi.appendChild(newtext)
        newLi.appendChild(newbtn)
        movieList.appendChild(newLi)

        modal.appendChild(newHeading)

        modal.appendChild(modaldiscribtion)
        modal.appendChild(newGenreLi)
        modal.appendChild(newTime)

        modal.appendChild(closebtn)
        modalwin.appendChild(modal)
        movieList.appendChild(modalwin)
        
 

        newbtn.addEventListener('click', (evn) =>{

            let filmID = evn.target.dataset.uuid
let x = arrFilm.find((e) => filmID == e.id)

            modaltitle.textContent= x.title
            modaldiscribtion.textContent = x.overview;
            closebtn.textContent = '✕'

            modalwin.classList.add('modal--active')
        })
closebtn.addEventListener('click', () =>{
    modalwin.classList.remove('modal--active')
})
        
    });
}

render(films, movieList)

function filterFilm(filmArr, format) {
    let filterAlph = filmArr.sort
    if (format === 'a_z') {
        filmArr.sort((a, b) =>{
            if (a.title > b.title) {
                return 1
            }
            else if (a.title < b.title) {
                return -1
            }
            else{
                return 0
            }
        })
        if (format === '') {
            
        }
    }
}

elForm.addEventListener('submit',(e)  =>{
    e.preventDefault()
    
    let selectGenres = movieGenre.value.trim()
    let searchFilms = movieSearch.value.trim()
    let regex = RegExp(searchFilms, 'gi')


    let searchedFilms = films.filter((film) =>{
        return film.title.match(regex)
    })
    
    

    let foundFilms = []
    
    if (selectGenres == 'All'){
        foundFilms = searchedFilms
    }else {
        foundFilms = searchedFilms.filter(film =>{
            return film.genres.includes(selectGenres)
        })
    }
    render(foundFilms,movieList )
})
