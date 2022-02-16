# Muso App


### Prerequisite
- Node v8.4+, npm or yarn package manager
- Clone the backend repo from [https://github.com/Muso-AI/MusoBackend](https://github.com/Muso-AI/MusoBackend) and run it as written in README.md file

### Project Setting up
- Clone the repo, and run `npm install`
- Create `src/config.js` from `src/config.js.example` and update the endpoints

### Run development server
`npm run dev`

### Build project
`npm run build`

## HTTPS (SSL) and custom domain for local development
In order to test authorization with Facebook and Apple we need our `localhost` to run with `https` protocol. Moreover, "Login with Apple" doesn't work with `localhost` domain.

### Generate new SSL certificate
Self signed certificate is the answer to the question: how can we set up `https` for localhost development. The ones that we have now valid for 365 days. But don't worry if they expire. We have dedicated bash script which allows to generate a new ones.

**Important**: Even if you pulled repository with still valid SSL certificates, on mac OS you have to add `*.crt` file to Keychain Access app and make it trusted. Otherwise, browser will consider our self signed certificate as invalid.

Navigate to `certificates` directory and run `../scripts/generate-certificate.sh`. After you answer questions, you will see newly created certificates in that directory.

**Important 2**: Certificate generated for `localhost` domain **cannot** be used for `muso.dev` domain. Thus you have to generate two separate certificates: one for `localhost` and another one for `muso.dev`.

### Custom domain
We use `muso.dev` domain to test "Login with Apple" locally. In order to accomplish it we need to edit `/etc/hosts/` file.

**Important**: These steps tested only on mac OS.

1) Open `hosts` file with `sudo` command:
```
sudo nano /etc/hosts
```
2) Navigate to the end of the file and insert following code:
```
127.0.0.1 muso.dev
```
3) Now, we need to update local DNS table, thus `muso.dev` will resolve into `127.0.0.1` IP (aka `localhost`):
```
sudo killall -HUP mDNSResponder
```
