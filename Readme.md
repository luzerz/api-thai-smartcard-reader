## Installation
### Windows
- Required Visual-studio 2019(Desktop development with c++) [Click to Download](https://docs.microsoft.com/en-us/cpp/build/vscpp-step-0-installation?view=msvc-160) 
- Required Python 2.7 for node-gyp [Download](https://www.python.org/download/releases/2.7)
- Start PowerShell as Administrator and run: `$ npm install --global --production windows-build-tools`, or use option 2 in <https://github.com/nodejs/node-gyp#on-windows>
- Run `$ npm install`
- Run `$ npm run dev`

### MAC
- Run `$ sudo ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null`
- Run `$ brew install pcsc-lite`
- Run `$ npm install`
- Run `$ npm run dev`

### Ubuntu & Pi
- Run `$ sudo apt-get install libpcsclite1 libpcsclite-dev pcscd`
- Run `$ npm install`
- Run `$ npm run dev`
