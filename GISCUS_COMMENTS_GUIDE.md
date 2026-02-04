# Adding Comments with Giscus

Giscus is a free, open-source comments system powered by GitHub Discussions. It's perfect for your site!

## Why Giscus?

✅ **Free forever** - No costs, no limits
✅ **No ads** - Clean, professional look
✅ **GitHub-based** - Visitors comment using GitHub accounts (keeps quality high)
✅ **Easy setup** - Just add a script tag
✅ **Privacy-friendly** - No tracking, GDPR compliant
✅ **Markdown support** - Visitors can format their comments
✅ **Reactions** - 👍 👎 ❤️ 🎉 emoji reactions

## Setup (10 minutes)

### Step 1: Enable GitHub Discussions

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Features** section
4. Check ✅ **Discussions**
5. Click **Set up discussions**
6. A discussion will be created automatically

### Step 2: Install Giscus App

1. Go to https://github.com/apps/giscus
2. Click **Install**
3. Choose your repository
4. Click **Install**

### Step 3: Configure Giscus

1. Go to https://giscus.app/
2. Fill out the configuration:

**Repository:**
```
yourusername/cozy-mysteries
```

**Page ↔️ Discussions Mapping:**
- Choose: **Discussion title contains page `pathname`**
- This creates a new discussion for each episode

**Discussion Category:**
- Choose: **Announcements** (or create a "Comments" category)

**Features:**
- ✅ Enable reactions for the main post
- ✅ Emit discussion metadata
- Choose theme: **preferred_color_scheme** (matches your site colors)

3. **Copy the generated script** - it will look like this:

```html
<script src="https://giscus.app/client.js"
        data-repo="YOUR-USERNAME/cozy-mysteries"
        data-repo-id="YOUR-REPO-ID"
        data-category="Announcements"
        data-category-id="YOUR-CATEGORY-ID"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
```

### Step 4: Add to Your Episodes Page

**Option A: Comments on Individual Episodes (Recommended)**

Create a new file `episode-details.html` for viewing single episodes with comments.

**Option B: Comments Section on Episodes Page**

Add to the bottom of `episodes.html`, before the closing `</div>`:

```html
        <div id="comments-section" style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--charcoal);">
            <h2 style="text-align: center; margin-bottom: 2rem;">💬 Community Discussion</h2>
            
            <!-- Paste your Giscus script here -->
            <script src="https://giscus.app/client.js"
                    data-repo="YOUR-USERNAME/cozy-mysteries"
                    data-repo-id="..."
                    data-category="Announcements"
                    data-category-id="..."
                    data-mapping="pathname"
                    data-strict="0"
                    data-reactions-enabled="1"
                    data-emit-metadata="0"
                    data-input-position="bottom"
                    data-theme="preferred_color_scheme"
                    data-lang="en"
                    crossorigin="anonymous"
                    async>
            </script>
        </div>
```

### Step 5: Customize Appearance (Optional)

Add CSS to match your site's aesthetic:

```css
.giscus {
    font-family: 'Crimson Pro', serif;
}

.giscus-frame {
    border: 2px solid var(--charcoal) !important;
    background: var(--cream) !important;
}
```

## How It Works

1. **Visitors comment** using their GitHub account
2. **Comments appear** in your GitHub Discussions
3. **You moderate** via GitHub (delete spam, etc.)
4. **Discussions stay forever** - no third-party service risk

## Advanced: Per-Episode Comments

Want separate comments for each episode? Create individual episode detail pages:

1. Create `episode-detail.html` template
2. Use URL parameters: `episode-detail.html?id=columbo-s1e1`
3. Giscus will create separate discussions automatically

## Managing Comments

- **View all comments:** GitHub repo → Discussions tab
- **Moderate:** Delete, lock, or hide discussions
- **Get notified:** GitHub notifications when someone comments
- **Analytics:** See which episodes get most discussion

## Alternatives to Giscus

If your visitors don't have GitHub accounts:

- **Disqus** - Most popular, but has ads (free tier)
- **Commento** - Paid ($10/month), privacy-focused
- **Utterances** - Similar to Giscus, GitHub Issues instead of Discussions

## Privacy Note

Giscus requires visitors to sign in with GitHub. This keeps quality high but may reduce participation. For a site about classic TV, your audience is likely tech-savvy enough!

---

**Need help?** Check the [Giscus documentation](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)
