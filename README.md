# The Cozy Crime Chronicles

A fan website celebrating classic cozy mystery TV shows like Columbo, Murder She Wrote, and Midsomer Murders.

## Files Included

- `index.html` - Home page with show introductions
- `episodes.html` - Filterable and sortable episode guide
- `about.html` - About page
- `contact.html` - Contact form page (demo only - not functional yet)
- `styles.css` - All styling for the website
- `script.js` - Navigation and common functionality
- `episodes.js` - Episode loading, filtering, and sorting
- `episodes-data.json` - Episode data with ratings, popularity, and streaming links
- `CSV_AND_AFFILIATES_GUIDE.md` - Guide for adding bulk data and monetization

## Features

### Navigation
- Responsive navigation bar that works on mobile and desktop
- Active page highlighting
- Smooth mobile menu toggle

### Episode Guide ⭐ NEW FEATURES!
- **Sort by**: Most Popular, Highest Rated, Newest, Oldest, or Alphabetical
- **Filter by show**: View episodes from specific shows
- **Search**: Find episodes by title, description, or show name
- **IMDb Ratings**: Star ratings displayed for each episode (⭐ 8.2/10)
- **Streaming Links**: Direct "Watch on..." buttons for each episode
- Links to IMDb and Wikipedia for more info

### Affiliate Link Support 💰
- Built-in support for affiliate streaming links
- Proper SEO tags (`rel="nofollow sponsored"`) for FTC compliance
- Ready for monetization with Acorn TV, Peacock, Amazon Associates, etc.
- See `CSV_AND_AFFILIATES_GUIDE.md` for complete setup instructions

### Contact Form ⚠️ IMPORTANT
- **Currently NOT functional** - it's a demonstration only
- When someone submits the form, it shows a message but doesn't send emails
- Form data is logged to browser console for testing
- **To make it work**, you need to integrate with a service (see instructions below)

## How to Host on GitHub Pages

1. **Create a GitHub account** at github.com

2. **Create a new repository**:
   - Name it `cozy-mysteries` (or `yourusername.github.io` for a personal site)
   - Make it public
   - Don't add README (we have one)

3. **Upload files**:
   - Click "Add file" → "Upload files"
   - Drag all the files from this folder
   - Commit the changes

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select "main" branch as source
   - Save

5. **Your site will be live at**:
   - `https://yourusername.github.io/cozy-mysteries/`

## How to Add More Episodes

### Manual Method
Edit the `episodes-data.json` file and add new entries following this format:

```json
{
  "show": "columbo",
  "showName": "Columbo",
  "season": 1,
  "episode": 3,
  "title": "Episode Title Here",
  "year": 1971,
  "rating": 8.5,
  "popularity": 85,
  "description": "Brief description of the episode plot.",
  "links": {
    "imdb": "https://www.imdb.com/title/...",
    "wiki": "https://en.wikipedia.org/wiki/...",
    "streaming": {
      "platform": "Peacock",
      "url": "https://peacocktv.com/YOUR-AFFILIATE-LINK",
      "affiliate": true
    }
  }
}
```

### Bulk Import from CSV
See `CSV_AND_AFFILIATES_GUIDE.md` for:
- How to get episode data from IMDb, TVMaze API, TheTVDB
- Python script to convert CSV to JSON
- Browser-based converter (no coding required)

**Show codes:**
- `columbo` - For Columbo episodes
- `murder-she-wrote` - For Murder, She Wrote episodes
- `midsomer-murders` - For Midsomer Murders episodes

## Monetization Setup

### Join Affiliate Programs
1. **Acorn TV** - Best for British shows like Midsomer Murders
   - High commissions (30-50% of first month)
   - Sign up at their affiliate page

2. **Amazon Associates** - Easiest to get started
   - 24-hour cookie
   - Link to DVD sets and streaming

3. **ShareASale** - Multiple streaming services in one place
   - Join at https://www.shareasale.com/

### Add Your Affiliate Links
Once approved, replace the placeholder URLs in `episodes-data.json`:
```json
"streaming": {
  "platform": "Peacock",
  "url": "https://peacocktv.sjv.io/YOUR-TRACKING-CODE",
  "affiliate": true
}
```

### Legal Requirement
Add this disclosure to your About page (template included in guide):
```
"This website contains affiliate links. When you subscribe through our 
links, we may earn a small commission at no extra cost to you."
```

## Making the Contact Form Work

### Option 1: Formspree (Recommended - Easiest!)
1. Sign up at https://formspree.io/ (free plan available)
2. Get your form endpoint
3. In `contact.html`, find the form tag and change it to:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```
4. Remove or comment out the JavaScript at the bottom of `contact.html`

### Option 2: Netlify Forms
If hosting on Netlify instead of GitHub Pages:
1. In `contact.html`, add `netlify` attribute to the form:
   ```html
   <form id="contact-form" netlify name="contact" method="POST">
   ```
2. Remove the JavaScript at the bottom of the file

### Option 3: EmailJS (More complex but flexible)
1. Sign up at https://www.emailjs.com/
2. Follow their JavaScript integration guide
3. Replace the current form submission handler in `contact.html`

## Customization Ideas

### Add More Shows
1. Edit `index.html` to add a new show card
2. Add episodes to `episodes-data.json` with a new show code
3. Update the filter dropdown in `episodes.html`
4. Add the show option to the filter select element

### Change Colors
Edit the `:root` section in `styles.css`:
```css
:root {
    --cream: #f4f1e8;
    --burgundy: #8b3a3a;
    --deep-green: #2d4a3e;
    --gold: #c9a961;
    /* etc. */
}
```

### Add a Blog
Create a new `blog.html` page following the same structure as the other pages.

### Add Social Media Links
Add them to the footer in each HTML file or create a dedicated social section.

### Add Episode Reviews
Extend the JSON structure to include:
```json
"review": "Your thoughts on the episode...",
"favorite": true
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (responsive design)

## Updating Your Site

To update files on GitHub:
1. Go to your repository
2. Click on the file you want to update
3. Click the pencil icon (Edit)
4. Paste new content
5. Scroll down and click "Commit changes"

Or use GitHub Desktop for easier updates!

## Credits

Website design and code created for cozy mystery enthusiasts.
Fonts from Google Fonts (Crimson Pro, Spectral, Courier Prime).

## License

Feel free to modify and customize this website for your personal use!

---

Happy sleuthing! 🔍
