yarn add @types/node typescript @solana/web3.js bs58 yarn tsc --init --rootDir ./ --outDir ./dist --esModuleInterop --lib ES2019 --module commonjs --resolveJsonModule true --noImplicitAny true

1. npm run keygen || yarn keygen => primo comando, creazione private e public key del wallet.
2. npm run airdrop || yarn airdrop => dare fondi al nostro wallet
3. npm transfer || yarn transfer => trasferire fondi da un wallet all'altro