document.querySelector("#btn").addEventListener('click', function() {
    console.log('hello');
    document.querySelector(".instructions").style.display = "none"
    document.querySelector("#animated-cat").style.display = "flex"
    document.querySelector("#animated-cat").style.transition = "1s all"
})

function checkWinner() {
    let answersSpaceBG = document.querySelectorAll('.letter-zone')
    if (answersSpaceBG[0].classList.contains('correct-bg') && answersSpaceBG[1].classList.contains('correct-bg') && answersSpaceBG[2].classList.contains('correct-bg')) {
        document.querySelector(".congrats").style.display = "flex"
        document.querySelector("#correct").innerText = "1"
    }
}
 


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}


// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    // accept: '#yes-drop',
    accept: '.drag-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target
  
      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')
    //   draggableElement.textContent = 'Dragged in'
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
    //   event.relatedTarget.textContent = 'Dragged out'
    },
    ondrop: function (event) {
      //event.relatedTarget.textContent = 'correct';
      console.log(event.target.textContent.trim());
      console.log(event.relatedTarget.textContent.trim());


      if(event.relatedTarget.textContent.trim() == event.target.textContent.trim()) {
        event.target.classList.remove('incorrect-bg');
        event.target.classList.add('correct-bg');
      } else {
        event.target.classList.remove('correct-bg');
        event.target.classList.add('incorrect-bg');
      }

      checkWinner();


      
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  })
  
  interact('.drag-drop')
    .draggable({
    //   inertia: true,
    //   modifiers: [
    //     interact.modifiers.restrictRect({
    //       restriction: 'parent',
    //       endOnly: true
    //     })
    //   ],
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      listeners: { move: dragMoveListener }
    })












// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener



