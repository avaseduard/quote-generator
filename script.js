const quoteBox = document.getElementById('quote-box');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author-name');
const twitterButton = document.getElementById('twitter');
const generateQuoteButton = document.getElementById('generate-quote');
const spinner = document.getElementById('spinner');
let quotesArr = [];

// Loading spinner function
const loading = function () {
  spinner.hidden = false;
  quoteBox.hidden = true;
};

// Hiding spinner function
const doneLoading = function () {
  quoteBox.hidden = false;
  spinner.hidden = true;
};

// Generating new quote
const generateQuote = function () {
  // Loading the spinner
  loading();

  // Random quote
  const quote = quotesArr[Math.floor(Math.random() * quotesArr.length)];

  // If author field is null, replace with "Unknown"
  if (!quote.author) quoteAuthor.textContent = 'Unknown';
  quoteAuthor.textContent = quote.author;

  // Adding the long class to longer quotes
  if (quote.text.length > 100) quoteText.classList.add('long-quote');
  quoteText.textContent = quote.text;

  // Hiding the spinner
  doneLoading();
};

// Getting quotes from API
const fetchQuotes = async function () {
  // Loading the spinner
  loading();

  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    // console.log(response);
    quotesArr = await response.json();
    // console.log(quotesArr[15]);
    generateQuote();
  } catch (error) {
    alert(`Oops, something went wrong! ${error}`);
  }
};

// Tweeting a quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
};

// Event listeners
generateQuoteButton.addEventListener('click', generateQuote);
twitterButton.addEventListener('click', tweetQuote);

// Initialize
fetchQuotes();
