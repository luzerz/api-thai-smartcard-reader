## Installation
### Windows
- Start PowerShell as Administrator and run: `$ npm install --global --production windows-build-tools`, or use option 2 in <https://github.com/nodejs/node-gyp#on-windows>
- Run `$ npm install`
- Run `$ npm run dev`


### MAC
- Run `$ sudo ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null`
- Run `$ brew install pcsc-lite`
- Run `$ npm run dev`
### Ubuntu & Pi
- Run `$ sudo apt-get install libpcsclite1 libpcsclite-dev pcscd`
- Run `$ npm install`
- Run `$ npm run dev`
