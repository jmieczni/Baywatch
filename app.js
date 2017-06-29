const app = {
  init(selectors) {
    this.flicks = []
    this.max = -1
    defaultBackgroundColor = 'cadetblue'
    likedBackgroundColor = 'deeppink'
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      //Passing the function itselft, we dont want it to just run, so no ()
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderUpButton() {
    const button = document.createElement('button')
    button.textContent = 'Move Up'
    button.className += 'success button upButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {

    })

    return button
  },

  renderDownButton() {
    const button = document.createElement('button')
    button.textContent = 'Move Down'
    button.className += 'success button downButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      
    })

    return button
  },

  getIndexOfFlick(parentElement) {
    let index = -1

    for (var i = 0; i < app.flicks.length; i++){
      if (app.flicks[i].id === parseInt(parentElement.id)) {
        index = i;
      }
    }

    return index
  },

  renderRemoveButton(text) {
    const button = document.createElement('button')
    button.textContent = (text)
    button.className += 'button removeButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const parent = ev.target.parentElement 
      const index = app.getIndexOfFlick(parent)     
      parent.parentNode.removeChild(parent)

      //Remove the flick from the array of flicks
      app.flicks.splice((index), 1)
      app.max --
    })

    return button
  },

  //Part 2 of Homework
  renderLikeButton(text) {
    const button = document.createElement('button')
    button.textContent = (text) 
    button.className += 'button likeButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const parentElement = ev.target.parentElement
      console.log('like button clicked. parentElement id= ' + parentElement.id)
      console.log(parentElement)

      let index = app.getIndexOfFlick(parentElement)
      console.log('parent element id: ' + parentElement.id)
      console.log('parent element id array location: ' + index)

      //Change background color and button text
      if (app.flicks[index].favorited) {
        parentElement.style.backgroundColor = defaultBackgroundColor
        app.flicks[index].favorited = false;

        //Change the button text
        for (let i = 0; i < parentElement.childNodes.length; i++){
          if ((parentElement.childNodes[i].className === 'likeButton')) {
            parentElement.childNodes[i].textContent = 'Like'
          }
        }

      } else {
        parentElement.style.backgroundColor = likedBackgroundColor
        app.flicks[index].favorited = true;

        //Change the button text
        for (let i = 0; i < parentElement.childNodes.length; i++){
          if ((parentElement.childNodes[i].className === 'likeButton')) {
            parentElement.childNodes[i].textContent = 'Unlike'
          }
        }    
      }
    })

    return button
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    item.id = flick.id
    item.style.fontSize = '2rem'
    item.style.backgroundColor = defaultBackgroundColor
    item.style.borderRadius = '6px'

    //Add the Like Button the the li element
    item.appendChild(this.renderLikeButton('Like'))

    //Add the Remove Button to the li element
    item.appendChild(this.renderRemoveButton('Remove'))

    //Add the Down Button to the li element
    item.appendChild(this.renderDownButton())

    //Add the Up Button to the li element
    item.appendChild(this.renderUpButton())

    return item
  },

  handleSubmit(ev) {
    //Keeps the page from refreshing
    ev.preventDefault()

    const f = ev.target
    this.max ++

    const flick = {
      name: f.flickName.value,
      id: this.max,
      favorited: false,
    }

    //Part 1 of Homework
    this.flicks.push(flick)

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)
    
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})