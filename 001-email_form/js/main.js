// The role of the JavaScript in this context is to replace the native HTML validation and present a more accessible,
// helpful alternative. This is a good way to work because we know when our JavaScript fails,
// we will still be helping users, but when it’s available, we’re providing an enhanced experience.

// Generate an alert component based on the passed state key
// @param  {String} state must be 'error' or 'success'
// @return {String} A HTML string of the component output

// What we have here is a simple function that takes a state parameter and returns back an .alert component with the
// relevant content in it. If it’s an error, we get the error content and data-state attribute (which controls style) or
// if it’s success, we get the opposite content and icon.

// Notice how both the iconPath and messages objects have consistent error and success keys.
// This makes rendering the output markup much easier because we know (from the rest of our upcoming JS)
// that our state is either error or success, so we can confidently grab the icon with iconPaths[state].
const renderAlert = (state = 'error') => {
  const iconPaths = {
    error:
      'M11.148 4.374a.973.973 0 01.334-.332c.236-.143.506-.178.756-.116s.474.216.614.448l8.466 14.133a.994.994 0 01-.155 1.192.99.99 0 01-.693.301H3.533a.997.997 0 01-.855-1.486zM9.432 3.346l-8.47 14.14c-.422.731-.506 1.55-.308 2.29s.68 1.408 1.398 1.822c.464.268.976.4 1.475.402H20.47a3 3 0 002.572-4.507L14.568 3.346a2.995 2.995 0 00-4.123-1.014c-.429.26-.775.615-1.012 1.014zM11 9v4a1 1 0 002 0V9a1 1 0 00-2 0zm2 8a1 1 0 10-2 0 1 1 0 002 0z',
    success:
      'M19.293 5.293L9 15.586l-4.293-4.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l11-11a.999.999 0 10-1.414-1.414z',
  }

  const messages = {
    error: '<b>Please use a valid email.</b> Like: person@inbox.com.',
    success: '<b>Yay! Thank you!</b> We’ve sent a confirmation link to your inbox.',
  }

  return `
    <figure className='alert' data-state='${state}'>
      <svg
        className='alert__icon'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
      >
        <path fill='currentColor' d='${iconPaths[state]}' />
      </svg>
      <p className='alert__content'>${messages[state]}</p>
    </figure>
  `
}

// Main app function. Grabs signup elements and validates email with regex and
// blocks submission and renders alert if it fails.
// If successful, it’ll allow the form to progress.

const init = () => {
  const emailElement = document.querySelector('#email')
  const formElement = document.querySelector('#signupForm')
  const alertElement = document.querySelector('[role="alert"]')
  const validationRegex = new RegExp(emailElement.getAttribute('pattern') || '[^@]+@[^.]+..+', 'i')

  emailElement.removeAttribute('required')
  emailElement.removeAttribute('pattern')
  formElement.setAttribute('novalidate', '')

  formElement.addEventListener('submit', evt => {
    evt.preventDefault()

    if (!validationRegex.test(emailElement.value.trim())) {
      alertElement.innerHTML = renderAlert('error')
      emailElement.setAttribute('aria-invalid', 'true')
      return
    }

    // POST YOUR FORM WITH AJAX OR WHATNOT THEN RUN THIS
    formElement.parentElement.removeChild(formElement)
    alertElement.innerHTML = renderAlert('success')
  })
}

init()

// We start off by grabbing three elements: the email <input />, the outer <form> element and the <div role="alert">
// element that is our alert container.
// We then define our validation Regular Exception by trying to grab it from the email field.
// We set a static version as a fallback, by using the || operator, just in case we can’t grab it from the email input.
// Next up, we remove the validation attributes. You might be thinking “what the heck is this guy doing?!”,
// but there’s a reason for this. Now that we’re validating with JavaScript, we should be providing the most consistent
// user experience as possible and because we’re handling feedback with a role="alert" element, the user,
// regardless of their tech, will see or hear a feedback message. The form also won’t submit. Solid, right?
// We also add a novalidate attribute to the form, to make sure any other native messages don’t sneak in.
// The last bit is a good ol’ event. We listen for the <form>’s submit event and run our validation check by testing
// the email <input>’s value against our Regular Exception. This returns false if it fails,
// so we can use a ! in our if block to test for the opposite return value. This means that code in our if block is the
// error code and we can set the success state as our default state, without using an else. Remember,
// to keep things clean like this, you must return out of your if block to prevent the default code running!
// When the email validation fails, we set aria-invalid="true", which instructs assistive technology that there’s
// an error with the inputted content. We also run our renderMessage function and immediately set it as
// the HTML of the role="alert" element, which makes it immediately announce itself to a screen reader.
// We can use the innerHTML property safely because we have complete control of the HTML that’s generated.
// The default success state is now up to you. You could post the data with
// [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to the server or if you want the
// native <form> functionality, you could move the evt.preventDefault() line to inside the validation error block instead.
// This means it’ll only prevent postback if there’s an issue! For our demo, we remove the form and let the success .alert
// completely take over. This would ideally happen after the form data has posted.
