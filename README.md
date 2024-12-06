# AnixPlay
The Ultimate Platform To Watch Anime

**COMING SOON**



**If you're facing any error while running the server in Githut Codespace. Try the following Steps**
In your GitHub Codespace, you should run these commands in sequence:

First, clear the npm cache:
in Terminal
npm cache clean --force
Then remove the node_modules folder and package-lock.json:
in Terminal
rm -rf node_modules package-lock.json
Install dependencies:
in Terminal
npm install --legacy-peer-deps
Start the development server:
in Terminal
npm run dev
