# BG TRADE YARD — Gift Card Marketplace Prototype

A responsive static frontend prototype built with HTML, CSS, and vanilla JavaScript.

## Files
- `index.html` — page structure and forms
- `style.css` — layout, visual design, responsive styles
- `script.js` — sample listings, search, filters, estimator, and demo inquiry review

## Run locally
1. Extract the ZIP file.
2. Open the `bg_trade_yard` folder.
3. Double-click `index.html` to open it in a modern browser.
4. For a more realistic local server, install Visual Studio Code and the Live Server extension, open this folder, then choose **Go Live**.

No package installation or API key is needed.

## Important limitations
This is a frontend demo, not a production marketplace:
- Listings are sample data in `script.js`.
- The inquiry form validates and displays a local summary only. It does not send or persist requests.
- There is no login, database, payment integration, seller verification, live exchange rate, or admin dashboard.
- Do not collect gift card claim codes, PINs, passwords, or bank credentials through this demo.
- Before handling real trades, build a secure backend, validate input server-side, protect personal data, verify sellers and card ownership, and obtain appropriate legal/compliance advice for the jurisdictions you serve.

## Deploy with GitHub Pages
1. Create/sign in to GitHub and create a new **public** repository, for example `bg-trade-yard`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root (not inside an extra nested folder).
3. Open **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**.
5. Select the `main` branch and `/(root)`, then save.
6. Wait for GitHub Pages to publish and use the URL shown in Settings → Pages.

GitHub Pages hosts static files only. It cannot safely process private trade requests or keep API keys secret. Do not put secrets in these files.
