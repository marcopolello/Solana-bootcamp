import { 
    Keypair, 
    Connection 
} from "@solana/web3.js";

// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "./test2.json";

// Creiamo una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creiamo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async() => {
    const balance = await connection.getBalance(keypair.publicKey);
    const pubblicKey = keypair.publicKey;
    console.log("BALANCE => " + balance);
    console.log("PUBLIC KEY => " + pubblicKey);
})();
