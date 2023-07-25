ifCookiesAccepted();

function acceptCookies() {
    // Get the current date and add 7 days to it for the expiration date
    const currentDate = new Date();
    const expiresDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Call the setCookie function with the desired values
    setCookie('name', 'test', expiresDate);

    closeCookiesPopup();

}
function closeCookiesPopup() {
    if (areCookiesAccepted()) {
        // If cookies have been accepted, update the element's style
        const element = document.getElementById('privacy-policies-message');
        if (element) {
            element.style.transform = 'translateY(200%)';
        }
    }

}
function getCookie(name) {
    // Split the document.cookie string into individual cookies
    const cookiesArray = document.cookie.split('; ');

    // Loop through the cookies to find the one with the specified name
    for (const cookie of cookiesArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue); // Decode the value to handle special characters
        }
    }

    // Return null if the cookie with the specified name is not found
    return null;
}
function setCookie(name, value, expires) {
    // Calculate the expiration date in UTC format
    const expirationDate = new Date(Date.now() + expires * 24 * 60 * 60 * 1000).toUTCString();

    // Set the cookie with the provided parameters
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate}; path=/`;

    // Update the local storage variable to indicate that cookies are accepted
    localStorage.setItem('accept-cookies', 'true');
    closeCookiesPopup();
}
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
function areCookiesAccepted() {
    return localStorage.getItem('accept-cookies') === 'true';
}

function removeDisplayedElement() {
    const displayedElement = document.querySelector('.displayed');
    if (displayedElement) {
        displayedElement.remove();
    }
}
function addDisplayedElement() {

    // If cookies have been accepted, update the element's style
    const element = document.getElementById('privacy-policies-message');
    if (element) {
        element.style.display = 'block';
    }
}
function ifCookiesAccepted(){
    const myCookieValue = getCookie('name');
    if (myCookieValue) {
        // If cookies have been accepted, remove class displayed (popup)
        removeDisplayedElement();
    }
    else {
        addDisplayedElement();
        console.log('Cookie not found!');
        localStorage.setItem('accept-cookies', 'false');

    }

}

