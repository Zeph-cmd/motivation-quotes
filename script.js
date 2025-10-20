// Simple quotes store by category (multiple entries per category)
// For future: You can fetch quotes from APIs like https://zenquotes.io/api/quotes, https://api.quotable.io/random, or https://type.fit/api/quotes
// Example: fetch('https://api.quotable.io/random?tags=motivation')

// History management
let quoteHistory = [];
let currentHistoryIndex = -1;

const QUOTES = {
  life: [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
    { text: "We do not remember days, we remember moments.", author: "Cesare Pavese" },
    { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Life shrinks or expands in proportion to one's courage.", author: "Anais Nin" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
    { text: "When we are no longer able to change a situation, we are challenged to change ourselves.", author: "Viktor E. Frankl" },
    { text: "Life is a succession of lessons which must be lived to be understood.", author: "Ralph Waldo Emerson" }
  ],
  funny: [], // jokes will be fetched at runtime from an API
  cultural: [
    { text: "Culture is the widening of the mind and of the spirit.", author: "Jawaharlal Nehru" },
    { text: "A nation's culture resides in the hearts and in the soul of its people.", author: "Mahatma Gandhi" },
    { text: "Culture is the arts elevated to a set of beliefs.", author: "Thomas Wolfe" },
    { text: "The purpose of art is washing the dust of daily life off our souls.", author: "Pablo Picasso" },
    { text: "Stories are the communal currency of humanity.", author: "Tahir Shah" },
    { text: "We are shaped and fashioned by what we love.", author: "Johann Wolfgang von Goethe" },
    { text: "A people without the knowledge of their past history, origin and culture is like a tree without roots.", author: "Marcus Garvey" },
    { text: "From the Japanese tea ceremony to West African drumming, every ritual carries memory.", author: "Unknown" },
    { text: "The languages of the world are a treasure trove of perspective and wisdom.", author: "Unknown" },
    { text: "To understand another culture is to expand the circumference of your compassion.", author: "Unknown" },
    { text: "Dance, food, and story: culture breathes through daily life and ceremony.", author: "Unknown" },
    { text: "From folk tales to national anthems, culture preserves what matters.", author: "Unknown" }
  ],
  religious: [
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha", translation: null },
    { text: "You have the right to work, but never to the fruit of work.", author: "Bhagavad Gita", translation: "Karmanye vadhikaraste ma phaleshu kadachana" },
    { text: "And whoever saves one life, it is as if he had saved mankind entirely.", author: "Quran 5:32", translation: null },
    { text: "Love your neighbor as yourself.", author: "Jesus (Christian scripture)", translation: null },
    { text: "If I am not for myself, who will be for me? And if I am only for myself, what am I?", author: "Hillel (Jewish sage)", translation: null },
    { text: "There is but one religion, though there are a hundred versions of it.", author: "Baha'u'llah", translation: null },
    { text: "Recognize all humanity as one.", author: "Guru Nanak", translation: null },
    { text: "Let the beauty of what you love be what you do.", author: "Rumi", translation: null },
    { text: "The Tao that can be told is not the eternal Tao.", author: "Lao Tzu", translation: null },
    { text: "Do not be daunted by the enormity of the world's grief. Act justly, now.", author: "Jewish proverb", translation: null },
    { text: "True worship is not in outward show, but in purity of heart.", author: "Islamic tradition", translation: null },
    { text: "All that we are is the result of what we have thought.", author: "Buddha", translation: null },
    { text: "The supreme religion is to do good to others.", author: "Zoroastrian proverb", translation: null }
  ],
  anime: [
    { text: "People's lives don't end when they die, it ends when they lose faith.", author: "Itachi Uchiha, Naruto" },
    { text: "No matter how deep the night, it always turns to day, eventually.", author: "Brook, One Piece" },
    { text: "If you don’t take risks, you can’t create a future.", author: "Monkey D. Luffy, One Piece" },
    { text: "Whatever you lose, you’ll find it again. But what you throw away forever is never yours to find.", author: "Kenshin Himura, Rurouni Kenshin" },
    { text: "I want to see the world. I want to see that blue sky, the sea—and I want to know what it feels like to be free.", author: "Edward Elric, Fullmetal Alchemist" },
    { text: "No matter how many people you may save, they always end up alone.", author: "Rintarou Okabe, Steins;Gate" },
    { text: "Power comes in response to a need, not a desire. You have to create that need.", author: "Goku (paraphrase), Dragon Ball Z" },
    { text: "When people are protecting something truly special to them, they truly can become as strong as they can be.", author: "Naruto Uzumaki, Naruto" },
    { text: "A lesson without pain is meaningless. That’s because no one can gain without sacrificing something.", author: "Edward Elric, Fullmetal Alchemist" },
    { text: "It’s not the face that makes someone a monster; it’s the choices they make with their lives.", author: "Naruto" },
    { text: "To know sorrow is not terrifying. What is terrifying is to know you cannot go back to happiness you could have.", author: "Mikaela Hyakuya, Seraph of the End" },
    { text: "Even the smallest light dispels the deepest darkness.", author: "Anime proverb" }
  ],
  cosmic: [
    { text: "We are made of star stuff.", author: "Carl Sagan" },
    { text: "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself.", author: "Carl Sagan" },
    { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
    { text: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars.", author: "Carl Sagan" },
    { text: "Look up at the stars and not down at your feet.", author: "Stephen Hawking" },
    { text: "We are a way for the universe to know itself.", author: "Carl Sagan" },
    { text: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
    { text: "The more I study the universe, the more I am amazed at the harmony of things.", author: "Unknown" },
    { text: "There is a voice in the cosmos calling us to wonder.", author: "Unknown" },
    { text: "The heavens declare the glory of the Creator; our lives are chapters within that vastness.", author: "Pastor Obed Obeng Addai (CCI) - paraphrase" },
    { text: "You are a child of the universe, no less than the trees and the stars.", author: "Max Ehrmann" }
  ],
  zeph: [
    { text: "What you call failure is often the starting point of a new courage.", author: "Zeph" },
    { text: "To stand in truth is to stand alone for a moment until others find the courage to stand with you.", author: "Zeph" },
    { text: "The gravity of a quiet life is sometimes heavier than the loudest victory.", author: "Zeph" },
    { text: "When you watch the horizon long enough, you realize your smallness—and your power.", author: "Zeph" },
    { text: "A single honest thought can rearrange the universe of your day.", author: "Zeph" }
  ]
};

// tolerate the user's spelled category 'cultureal' by aliasing it to 'cultural'
QUOTES['cultureal'] = QUOTES['cultural'];

// DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const prevQuoteBtn = document.getElementById('prev-quote');
const copyQuoteBtn = document.getElementById('copy-quote');
const shareWhatsAppBtn = document.getElementById('share-whatsapp');
const categorySelect = document.getElementById('category');
const customArea = document.getElementById('custom-area');
const customQuoteField = document.getElementById('custom-quote');
const customAuthorField = document.getElementById('custom-author');

// pick a random item from an array
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomQuote(category) {
  if (category === 'custom') return null;
  const list = QUOTES[category] || [];
  if (!list.length) return { text: 'No quotes available for this category.', author: '' };
  return randomItem(list);
}

// Render with a smooth fade: fade out, swap text, fade in.
function renderQuote(q) {
  // fade out
  quoteText.style.opacity = 0;
  quoteAuthor.style.opacity = 0;

  // after fade-out, update text then fade in
  const FADE_OUT_MS = 220;
  setTimeout(() => {
    if (!q) {
      quoteText.textContent = '';
      quoteAuthor.textContent = '';
    } else {
      quoteText.textContent = `“${q.text}”`;
      quoteAuthor.textContent = q.author ? `— ${q.author}` : '';
    }
    // small delay to ensure browser applied the content change before fading in
    requestAnimationFrame(() => requestAnimationFrame(() => {
      quoteText.style.opacity = 1;
      quoteAuthor.style.opacity = 1;
    }));
  }, FADE_OUT_MS);
}

// History management functions
function addToHistory(quote) {
  if (currentHistoryIndex < quoteHistory.length - 1) {
    // If we're not at the end of history, truncate the future quotes
    quoteHistory = quoteHistory.slice(0, currentHistoryIndex + 1);
  }
  quoteHistory.push(quote);
  currentHistoryIndex = quoteHistory.length - 1;
  updateHistoryButtonState();
}

function updateHistoryButtonState() {
  prevQuoteBtn.disabled = currentHistoryIndex <= 0;
}

// UI event handlers
function getPreviousQuote() {
  if (currentHistoryIndex > 0) {
    currentHistoryIndex--;
    renderQuote(quoteHistory[currentHistoryIndex]);
    updateHistoryButtonState();
  }
}

// elements for translation area
const translationArea = document.getElementById('translation-area');
const translationText = document.getElementById('translation-text');
const toggleTranslationBtn = document.getElementById('toggle-translation');

function showTranslation(quote) {
  if (!quote || !quote.translation) {
    translationArea.hidden = true;
    return;
  }
  translationText.textContent = quote.translation;
  translationArea.hidden = false;
}

toggleTranslationBtn && toggleTranslationBtn.addEventListener('click', () => {
  // toggle visibility of translation text
  if (!translationArea) return;
  const isHidden = translationText.style.display === 'none' || !translationText.style.display;
  translationText.style.display = isHidden ? 'block' : 'none';
});

async function copyQuote() {
  const text = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const fullQuote = `${text} ${author}`.trim();
  
  try {
    await navigator.clipboard.writeText(fullQuote);
    // Visual feedback
    copyQuoteBtn.innerHTML = '<i class="fas fa-check icon"></i>';
    setTimeout(() => {
      copyQuoteBtn.innerHTML = '<i class="fas fa-copy icon"></i>';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function shareOnWhatsApp() {
  const text = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const fullQuote = `${text} ${author}`.trim();
  const encodedText = encodeURIComponent(fullQuote);
  window.open(`https://wa.me/?text=${encodedText}`, '_blank');
}

// Event listeners
categorySelect.addEventListener('change', () => {
  const cat = categorySelect.value;
  customArea.hidden = cat !== 'custom';
});

newQuoteBtn.addEventListener('click', () => {
  const cat = categorySelect.value;
  let quote;
  if (cat === 'custom') {
    const text = (customQuoteField.value || '').trim();
    const author = (customAuthorField.value || '').trim();
    if (!text) {
      quote = { text: 'Please enter a custom quote to display.', author: '' };
      renderQuote(quote);
      addToHistory(quote);
      showTranslation(quote);
      return;
    }
    quote = { text, author };
    renderQuote(quote);
    addToHistory(quote);
    showTranslation(quote);
    return;
  }

  if (cat === 'funny') {
    // fetch a random joke from Official Joke API
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(res => res.json())
      .then(j => {
        const jokeText = `${j.setup} ${j.punchline}`;
        const joke = { text: jokeText, author: '—' };
        renderQuote(joke);
        addToHistory(joke);
        showTranslation(joke);
      })
      .catch(err => {
        console.error('Failed to fetch joke:', err);
        const fallback = { text: 'Could not load a joke right now. Try again later.', author: '' };
        renderQuote(fallback);
        addToHistory(fallback);
        showTranslation(fallback);
      });
    return;
  }

  // default categories
  quote = pickRandomQuote(cat);
  renderQuote(quote);
  addToHistory(quote);
  showTranslation(quote);
});

prevQuoteBtn.addEventListener('click', getPreviousQuote);
copyQuoteBtn.addEventListener('click', copyQuote);
shareWhatsAppBtn.addEventListener('click', shareOnWhatsApp);

// initialize with a quote for the default selection
(function init() {
  // ensure elements have transition defined in CSS (see style.css)
  const initial = pickRandomQuote(categorySelect.value || 'life');
  // initially show without awkward flash by setting opacity 0 then rendering
  quoteText.style.opacity = 0;
  quoteAuthor.style.opacity = 0;
  setTimeout(() => {
    renderQuote(initial);
    addToHistory(initial);
  }, 80);
})();
