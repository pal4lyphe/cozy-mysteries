# The Cozy Crime Chronicles

A fan website celebrating classic cozy mystery TV shows like Columbo, Murder She Wrote, Midsomer Murders, and Agatha Christie's Poirot.

## Files Included

- `index.html` - Home page with show introductions and images
- `episodes.html` - Filterable and sortable episode guide with season filter
- `about.html` - About page
- `contact.html` - Contact form page (demo only - not functional yet)
- `styles.css` - All styling for the website
- `script.js` - Navigation and common functionality
- `episodes.js` - Episode loading, filtering, sorting, and season population
- `episodes-data.json` - Episode data with ratings, popularity, and streaming links
- `CSV_AND_AFFILIATES_GUIDE.md` - Guide for adding bulk data and monetization
- `IMAGES_AND_MONEY_GUIDE.md` - Complete guide for adding images and making money

## Features

### Navigation
- Responsive navigation bar that works on mobile and desktop
- Active page highlighting
- Smooth mobile menu toggle
- **Clickable logo** - Click "🔍 Cozy Crime Chronicles" to return home from any page

### Home Page
- Beautiful show cards with hover effects
- **TV show poster images** - Add your own images to the `images/` folder
- Direct links to episode pages for each show

### Episode Guide ⭐ FULLY FEATURED!
- **Filter by Show**: View episodes from specific shows
- **Filter by Season**: Dynamically populated season dropdown based on selected show
- **Sort by**: Most Popular, Highest Rated, Newest, Oldest, or Alphabetical
- **Search**: Find episodes by title, description, or show name
- **IMDb Ratings**: Star ratings displayed for each episode (⭐ 8.2/10)
- **Streaming Links**: Direct "Watch on..." buttons for each episode
- Links to IMDb and Wikipedia for more info

### Affiliate Link Support 💰
- Built-in support for affiliate streaming links
- Proper SEO tags (`rel="nofollow sponsored"`) for FTC compliance
- Ready for monetization with Acorn TV, Peacock, Amazon Associates, etc.
- See `CSV_AND_AFFILIATES_GUIDE.md` and `IMAGES_AND_MONEY_GUIDE.md` for complete setup

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

4. **Create images folder and upload show posters**:
   - Click "Add file" → "Upload files"
   - In the path box, type `images/` before uploading
   - Upload your 4 poster images: `columbo.jpg`, `murder-she-wrote.jpg`, `midsomer-murders.jpg`, `poirot.jpg`
   - Commit the changes

5. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select "main" branch as source
   - Save

6. **Your site will be live at**:
   - `https://yourusername.github.io/cozy-mysteries/`

## Adding TV Show Images

### Where to Find Images
- **TVMaze**: https://www.tvmaze.com/ - High-quality official posters
- **IMDb**: Right-click poster images and save
- **TheTVDB**: https://www.thetvdb.com/

### Required Images
Place these 4 images in the `images/` folder:
- `columbo.jpg` - Columbo poster (portrait orientation recommended)
- `murder-she-wrote.jpg` - Murder, She Wrote poster
- `midsomer-murders.jpg` - Midsomer Murders poster
- `poirot.jpg` - Agatha Christie's Poirot poster

### Image Specifications
- Format: JPG or PNG
- Recommended size: 500-800px wide
- Aspect ratio: Portrait (2:3 ratio ideal)
- File size: Keep under 500KB for fast loading

See `IMAGES_AND_MONEY_GUIDE.md` for detailed instructions!

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

**Important:** The season filter will automatically update when you add episodes with new season numbers!

### Bulk Import from CSV
See `CSV_AND_AFFILIATES_GUIDE.md` for:
- How to get episode data from IMDb, TVMaze API, TheTVDB
- Python script to convert CSV to JSON
- Browser-based converter (no coding required)

**Show codes:**
- `columbo` - For Columbo episodes
- `murder-she-wrote` - For Murder, She Wrote episodes
- `midsomer-murders` - For Midsomer Murders episodes
- `poirot` - For Agatha Christie's Poirot episodes

## Tracking Your Traffic

### GitHub Built-in Stats (Easiest)
1. Go to your repository on GitHub
2. Click "Insights" tab → "Traffic"
3. See views, unique visitors, and referring sites
4. **Limitation**: Only shows last 14 days

### Google Analytics (Most Detailed)
1. Sign up at https://analytics.google.com/
2. Create a property for your site
3. Add the tracking code to all HTML files (before `</head>` tag)
4. See detailed visitor stats, page views, traffic sources, etc.

## Monetization Setup

### Join Affiliate Programs
1. **Amazon Associates** - Easiest to get started (instant approval)
   - Link to DVD box sets
   - 24-hour cookie, 1-10% commission
   - Sign up: https://affiliate-program.amazon.com/

2. **Acorn TV** - Best for British shows like Midsomer Murders
   - High commissions (30-50% of first month)
   - Contact them directly for affiliate program

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

### Legal Requirement (IMPORTANT!)
Add this disclosure to your `about.html` page:
```html
<h2>Affiliate Disclosure</h2>
<p>
    This website contains affiliate links. When you subscribe through our 
    links, we may earn a small commission at no extra cost to you. This 
    helps us maintain the site.
</p>
```

**See `IMAGES_AND_MONEY_GUIDE.md` for complete monetization instructions including realistic earning expectations!**

## Making the Contact Form Work

### Option 1: Formspree (Recommended - Easiest!)
1. Sign up at https://formspree.io/ (free plan available)
2. Create a form and get your endpoint
3. In `contact.html`, change line ~43:
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
1. Edit `index.html` to add a new show card with image
2. Add show poster image to `images/` folder
3. Add episodes to `episodes-data.json` with a new show code
4. Update the filter dropdown in `episodes.html`

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

### Custom Domain (Optional)
Instead of `yourusername.github.io/cozy-mysteries/`:
1. Buy a domain (e.g., `cozycrimemysteries.com` from Namecheap ~$9/year)
2. In GitHub repo: Settings → Pages → Custom domain
3. Configure DNS records at your registrar
4. Wait 24 hours for DNS to propagate

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (responsive design)

## Updating Your Site

### Via GitHub Website
1. Go to your repository
2. Click on the file you want to update
3. Click the pencil icon (✏️ Edit)
4. Paste new content
5. Scroll down and click "Commit changes"

### Via GitHub Desktop (Easier for Multiple Updates)
1. Download GitHub Desktop
2. Clone your repository
3. Edit files locally
4. Commit and push changes

## Troubleshooting

### Season filter not showing
- Make sure your `episodes-data.json` is properly formatted
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console (F12) for errors

### Images not displaying
- Verify images are in the `images/` folder on GitHub
- Check filenames match exactly: `columbo.jpg`, `murder-she-wrote.jpg`, `midsomer-murders.jpg`, `poirot.jpg`
- Make sure images are JPG or PNG format

### "episodes.map is not a function" error
- Your JSON file is corrupted or improperly formatted
- Replace it with the working `episodes-data.json` provided
- Validate JSON at https://jsonlint.com/

## Credits

Website design and code created for cozy mystery enthusiasts.
Fonts from Google Fonts (Crimson Pro, Spectral, Courier Prime).

## License

Feel free to modify and customize this website for your personal use!

---

Happy sleuthing! 🔍
