# Guide: Adding Episode Data from CSV Files & Monetization

## Part 1: Working with CSV Files

### Where to Get Episode Data

1. **IMDb Datasets** (Best Option)
   - Go to: https://datasets.imdbws.com/
   - Download `title.episode.tsv.gz` (episode info)
   - Download `title.basics.tsv.gz` (titles and years)
   - Download `title.ratings.tsv.gz` (ratings)

2. **TheTVDB API**
   - Website: https://thetvdb.com/
   - Requires free API key
   - Has comprehensive episode data

3. **TVMaze API** (Easiest)
   - Website: https://www.tvmaze.com/api
   - No API key needed
   - Example: https://api.tvmaze.com/shows/548/episodes (for Columbo)

### Converting CSV to JSON

#### Method 1: Online Converter (Easiest)
1. Go to: https://csvjson.com/csv2json
2. Upload your CSV file
3. Click "Convert"
4. Copy the JSON output
5. **Format it to match your structure** (see below)

#### Method 2: Using Python Script

Create a file called `csv_to_json.py`:

```python
import csv
import json

# Read CSV file
csv_file = 'episodes.csv'  # Your CSV filename
json_file = 'episodes-data.json'

episodes = []

with open(csv_file, 'r', encoding='utf-8') as f:
    csv_reader = csv.DictReader(f)
    
    for row in csv_reader:
        episode = {
            "show": row['show_id'],  # e.g., "columbo"
            "showName": row['show_name'],  # e.g., "Columbo"
            "season": int(row['season']),
            "episode": int(row['episode']),
            "title": row['title'],
            "year": int(row['year']),
            "rating": float(row['rating']) if row.get('rating') else None,
            "popularity": int(row['popularity']) if row.get('popularity') else 50,
            "description": row['description'],
            "links": {
                "imdb": row['imdb_url'] if row.get('imdb_url') else None,
                "wiki": row['wiki_url'] if row.get('wiki_url') else None,
                "streaming": {
                    "platform": row['streaming_platform'],
                    "url": row['streaming_url'],
                    "affiliate": True
                } if row.get('streaming_url') else None
            }
        }
        episodes.append(episode)

# Write to JSON file
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(episodes, f, indent=2, ensure_ascii=False)

print(f"Converted {len(episodes)} episodes to JSON!")
```

**Your CSV should have these columns:**
```
show_id,show_name,season,episode,title,year,rating,popularity,description,imdb_url,wiki_url,streaming_platform,streaming_url
columbo,Columbo,1,1,Murder by the Book,1971,8.2,85,"Description here",https://imdb.com/...,https://wiki...,Peacock,https://peacock...
```

#### Method 3: Using JavaScript in Browser

Create an HTML file to convert CSV in your browser:

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSV to JSON Converter</title>
</head>
<body>
    <h1>Convert Episodes CSV to JSON</h1>
    <input type="file" id="csvFile" accept=".csv">
    <button onclick="convertCSV()">Convert</button>
    <pre id="output"></pre>

    <script>
        function convertCSV() {
            const file = document.getElementById('csvFile').files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',');
                const episodes = [];
                
                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;
                    
                    const values = lines[i].split(',');
                    const episode = {
                        show: values[0],
                        showName: values[1],
                        season: parseInt(values[2]),
                        episode: parseInt(values[3]),
                        title: values[4],
                        year: parseInt(values[5]),
                        rating: parseFloat(values[6]) || null,
                        popularity: parseInt(values[7]) || 50,
                        description: values[8],
                        links: {
                            imdb: values[9] || null,
                            wiki: values[10] || null,
                            streaming: values[12] ? {
                                platform: values[11],
                                url: values[12],
                                affiliate: true
                            } : null
                        }
                    };
                    episodes.push(episode);
                }
                
                document.getElementById('output').textContent = 
                    JSON.stringify(episodes, null, 2);
            };
            
            reader.readAsText(file);
        }
    </script>
</body>
</html>
```

---

## Part 2: Monetization with Affiliate Links

### Setting Up Affiliate Programs

#### 1. **Streaming Service Affiliate Programs**

**Peacock (NBCUniversal)**
- Columbo and Murder, She Wrote are on Peacock
- Join: https://www.peacocktv.com/affiliates (if available)
- Alternative: Use generic entertainment affiliate networks

**Acorn TV** (Best for British shows)
- Midsomer Murders is on Acorn TV
- Join: https://acorn.tv/affiliates
- Commission: Usually 30-50% of first month subscription

**Amazon Prime Video**
- Join: https://affiliate-program.amazon.com/
- Commission: 24-hour cookie, commissions on any purchases
- Many classic shows available

**Paramount+, Hulu, etc.**
- Check each platform's affiliate program
- Most use ShareASale, CJ Affiliate, or Rakuten Advertising

#### 2. **Affiliate Networks** (Easier than individual programs)

**ShareASale**
- Website: https://www.shareasale.com/
- Includes: Many streaming services
- Easy to manage multiple programs

**CJ Affiliate (Commission Junction)**
- Website: https://www.cj.com/
- Large selection of entertainment affiliates

**Impact**
- Website: https://impact.com/
- Growing network with streaming services

**Rakuten Advertising**
- Website: https://rakutenadvertising.com/
- Major brands and streaming platforms

### How to Add Affiliate Links

Once you join an affiliate program, you'll get tracking links. Update your JSON:

```json
"streaming": {
    "platform": "Peacock",
    "url": "https://peacocktv.sjv.io/c/YOUR-AFFILIATE-ID/episode-link",
    "affiliate": true
}
```

**Important:** The `affiliate: true` flag adds `rel="nofollow sponsored"` to comply with FTC guidelines.

### Legal Requirements

**FTC Disclosure (Required in USA)**

Add this to your website footer or About page:

```
"Disclosure: This website contains affiliate links. When you click on links 
to various streaming services and make a purchase, this can result in a 
commission for us. We only recommend services we believe provide value to 
our readers."
```

You can add this to your `about.html`:

```html
<h2>Affiliate Disclosure</h2>
<p>
    Some links on this website are affiliate links, which means we may earn 
    a small commission if you subscribe to a streaming service through our 
    links. This comes at no extra cost to you and helps us maintain this 
    website. We only recommend services where these classic mystery shows 
    are actually available and that we believe offer good value.
</p>
```

### Monetization Alternatives

If affiliate programs don't work out:

1. **Google AdSense**
   - Easy to set up
   - Automatic ads
   - Lower revenue but passive

2. **Buy Me a Coffee / Ko-fi**
   - Direct support from fans
   - One-time or monthly donations

3. **Patreon**
   - Exclusive content for supporters
   - Episode reviews, recommendations

4. **Amazon Associates**
   - Link to DVD box sets
   - Mystery book recommendations

---

## Part 3: Quick Setup Checklist

- [ ] Join affiliate programs (Acorn TV, Amazon, ShareASale)
- [ ] Get your affiliate tracking links
- [ ] Add affiliate disclosure to About page
- [ ] Update JSON file with affiliate links
- [ ] Test all links work correctly
- [ ] Add `rel="nofollow sponsored"` to affiliate links (already in code!)
- [ ] Monitor which links get clicks (use affiliate dashboard)

---

## Tips for Success

1. **Be Honest**: Only link to services that actually have the shows
2. **Check Availability**: Streaming rights change - verify periodically
3. **Multiple Options**: Link to multiple platforms when available
4. **Free Trials**: Highlight when services offer free trials
5. **Regional Info**: Note if shows are region-specific
6. **Keep Updated**: Streaming catalogs change monthly

---

## Example: Complete Episode Entry

```json
{
    "show": "columbo",
    "showName": "Columbo",
    "season": 1,
    "episode": 1,
    "title": "Murder by the Book",
    "year": 1971,
    "rating": 8.2,
    "popularity": 85,
    "description": "Mystery writer Ken Franklin kills his partner...",
    "links": {
        "imdb": "https://www.imdb.com/title/tt0067906/",
        "wiki": "https://en.wikipedia.org/wiki/Murder_by_the_Book_(Columbo)",
        "streaming": {
            "platform": "Peacock",
            "url": "https://peacocktv.com/YOUR-AFFILIATE-LINK",
            "affiliate": true
        }
    }
}
```

---

Need help with a specific step? Let me know!
