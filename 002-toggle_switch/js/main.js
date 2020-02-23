// What’s happening here is that we’re removing a hidden attribute.
// With this in place: when JS isn’t available, your toggle will be hidden. This is great because when you apply actual functionality for your site, it’ll be with JS, so if the JS isn’t available, this component is pointless, so it’s best to be hidden.
const toggle = document.querySelector('.toggle')

toggle.removeAttribute('hidden')

// What we’re doing here is listening to our checkbox’s change event. We access the checkbox with event.target which returns the element that this event has happened on.

// Checkboxes give us a true/false representation of their checked state, so we add or remove a dark class on the <body> accordingly.
toggle.querySelector('input').addEventListener('change', evt => {
  if (evt.target.checked) {
    document.body.classList.add('dark')
    return
  }

  document.body.classList.remove('dark')
})
