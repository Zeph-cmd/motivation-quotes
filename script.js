// Simple quotes store by category (multiple entries per category)
// For future: You can fetch quotes from APIs like https://zenquotes.io/api/quotes, https://api.quotable.io/random, or https://type.fit/api/quotes
// Example: fetch('https://api.quotable.io/random?tags=motivation')

// History management
let quoteHistory = [];
let currentHistoryIndex = -1;

const QUOTES = {
  motivational: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Small daily improvements are the key to staggering long-term results.", author: "James Clear" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { text: "If at first you don’t succeed, then skydiving definitely isn’t for you.", author: "Steven Wright" }, // humor
    { text: "The elevator to success is out of order. You’ll have to use the stairs, one step at a time.", author: "Joe Girard" }, // humor
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
  ],
  love: [
    { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
    { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
    { text: "Love doesn’t make the world go round. Love is what makes the ride worthwhile.", author: "Franklin P. Jones" },
    { text: "Gravitation is not responsible for people falling in love.", author: "Albert Einstein" }, // humor
    { text: "We accept the love we think we deserve.", author: "Stephen Chbosky" },
    { text: "Love is a friendship set to music.", author: "Joseph Campbell" },
    { text: "If you can’t love yourself, how in the hell you gonna love somebody else?", author: "RuPaul" }
  ],
  life: [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life is short, smile while you still have teeth.", author: "Unknown" }, // humor
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
    { text: "Good friends, good books, and a sleepy conscience: this is the ideal life.", author: "Mark Twain" },
    { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" }
  ],
  success: [
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't aim for success if you want it; just do what you love.", author: "Dale Carnegie" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
    { text: "Success is stumbling from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { text: "Behind every successful man is a surprised woman.", author: "Maryon Pearson" }, // humor
    { text: "The road to success is dotted with many tempting parking spaces.", author: "Will Rogers" }, // humor
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" }
  ],
  funny: [
    { text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde" },
    { text: "If you think you are too small to make a difference, try sleeping with a mosquito.", author: "Dalai Lama" },
    { text: "I used to think I was indecisive, but now I'm not so sure.", author: "Unknown" },
    { text: "I'm not arguing, I'm just explaining why I'm right.", author: "Unknown" },
    { text: "My bed is a magical place where I suddenly remember everything I forgot to do.", author: "Unknown" },
    { text: "Why don’t scientists trust atoms? Because they make up everything!", author: "Unknown" },
    { text: "If at first you don’t succeed, then skydiving definitely isn’t for you.", author: "Steven Wright" }
  ],
  wisdom: [
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "Wise men speak because they have something to say; fools because they have to say something.", author: "Plato" },
    { text: "A wise man can learn more from a foolish question than a fool can learn from a wise answer.", author: "Bruce Lee" },
    { text: "If you think you are too small to make a difference, try sleeping with a mosquito.", author: "Dalai Lama" }, // humor
    { text: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" }
  ],
  discipline: [
    { text: "We must all suffer one of two things: the pain of discipline or the pain of regret.", author: "Jim Rohn" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln (attributed)" },
    { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Discipline is remembering what you want.", author: "David Campbell" },
    { text: "I could agree with you but then we’d both be wrong.", author: "Russell Lynes" }, // humor
    { text: "The difference between try and triumph is just a little umph!", author: "Marvin Phillips" }
  ],
  peace: [
    { text: "Peace begins with a smile.", author: "Mother Teresa" },
    { text: "Peace cannot be kept by force; it can only be achieved by understanding.", author: "Albert Einstein" },
    { text: "When the power of love overcomes the love of power, the world will know peace.", author: "Jimi Hendrix" },
    { text: "If you want peace, you don’t talk to your friends. You talk to your enemies.", author: "Desmond Tutu" },
    { text: "If you want to make peace with your enemy, you have to work with your enemy. Then he becomes your partner.", author: "Nelson Mandela" },
    { text: "Peace: it does not mean to be in a place where there is no noise, trouble, or hard work. It means to be in the midst of those things and still be calm in your heart.", author: "Unknown" }
  ],
  courage: [
    { text: "Courage is grace under pressure.", author: "Ernest Hemingway" },
    { text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'", author: "Mary Anne Radmacher" },
    { text: "You cannot swim for new horizons until you have courage to lose sight of the shore.", author: "William Faulkner" },
    { text: "Courage is being scared to death, but saddling up anyway.", author: "John Wayne" },
    { text: "If you’re going through hell, keep going.", author: "Winston Churchill" },
    { text: "Courage is knowing what not to fear.", author: "Plato" },
    { text: "If at first you don’t succeed, skydiving is not for you.", author: "Steven Wright" } // humor
  ],
  idioms: [
    { text: "Break the ice.", author: "(Idiom)" },
    { text: "Hit the nail on the head.", author: "(Idiom)" },
    { text: "Let the cat out of the bag.", author: "(Idiom)" },
    { text: "Bite the bullet.", author: "(Idiom)" },
    { text: "Kick the bucket.", author: "(Idiom, not recommended!)" }, // humor
    { text: "Spill the beans.", author: "(Idiom)" },
    { text: "When pigs fly.", author: "(Idiom)" }
  ],
  cultural: [
    { text: "Culture is the widening of the mind and of the spirit.", author: "Jawaharlal Nehru" },
    { text: "A nation's culture resides in the hearts and in the soul of its people.", author: "Mahatma Gandhi" },
    { text: "Culture is not just an accessory, it’s the main outfit.", author: "Unknown" }, // humor
    { text: "Preservation of one's own culture does not require contempt or disrespect for other cultures.", author: "Cesar Chavez" },
    { text: "Culture is the arts elevated to a set of beliefs.", author: "Thomas Wolfe" },
    { text: "Every culture has its own way of making you feel at home.", author: "Unknown" }
  ],
  educational: [
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Education is what remains after one has forgotten what one has learned in school.", author: "Albert Einstein" }, // humor
    { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" }
  ],
  religious: [
    { text: "Faith is taking the first step even when you don't see the whole staircase.", author: "Martin Luther King Jr." },
    { text: "Do unto others as you would have them do unto you.", author: "Biblical (Golden Rule)" },
    { text: "God helps those who help themselves.", author: "Benjamin Franklin" },
    { text: "Prayer is not asking. It is a longing of the soul.", author: "Mahatma Gandhi" },
    { text: "When you focus on being a blessing, God makes sure that you are always blessed in abundance.", author: "Joel Osteen" },
    { text: "If God wanted us to bend over, he’d put diamonds on the floor.", author: "Joan Rivers" } // humor
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
    } else {
      quote = { text, author };
    }
  } else {
    quote = pickRandomQuote(cat);
  }
  
  renderQuote(quote);
  addToHistory(quote);
});

prevQuoteBtn.addEventListener('click', getPreviousQuote);
copyQuoteBtn.addEventListener('click', copyQuote);
shareWhatsAppBtn.addEventListener('click', shareOnWhatsApp);

// initialize with a quote for the default selection
(function init() {
  // ensure elements have transition defined in CSS (see style.css)
  const initial = pickRandomQuote(categorySelect.value || 'motivational');
  // initially show without awkward flash by setting opacity 0 then rendering
  quoteText.style.opacity = 0;
  quoteAuthor.style.opacity = 0;
  setTimeout(() => {
    renderQuote(initial);
    addToHistory(initial);
  }, 80);
})();
