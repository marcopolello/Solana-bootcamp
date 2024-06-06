import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionArgs, CreateMetadataAccountV3InstructionAccounts, DataV2Args, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { publicKey as publicKeySerializer, string} from '@metaplex-foundation/umi/serializers';

import wallet from "../wallet.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized")

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));

debugger;

// const mint = new PublicKey("AW2Uw1qWH183jjQSbksFoHK1GeagNdLmyWd5DAQFdjWQ");
const mint = publicKey("AW2Uw1qWH183jjQSbksFoHK1GeagNdLmyWd5DAQFdjWQ");

//seed deterministici del nostro account, bisogna serializzarli e poi passarli al PDA (Program Derived Address)
const seeds = [
    string({size: "variable"}).serialize("metadata"),
    publicKeySerializer().serialize(MPL_TOKEN_METADATA_PROGRAM_ID),
    publicKeySerializer().serialize(mint),
];
const metadata = umi.eddsa.findPda(MPL_TOKEN_METADATA_PROGRAM_ID, seeds);

(async() => {

    let accounts: CreateMetadataAccountV3InstructionAccounts = {
        metadata: metadata,
        mint: mint,
        mintAuthority: myKeypairSigner,
    }

    let data: DataV2Args = {
        name: "TestLogoPol",
        symbol: "TLP",
        uri: "https://arweave.net/6CaUeB1Vvp0fbXjOMcQhOTAmsB_8Oz4JpJNkR_qGAJY",
        sellerFeeBasisPoints: 500,
        creators: [
            {
                address: keypair.publicKey,
                verified: true,
                share: 100,
            }
        ],
        collection: null,
        uses: null,
    }

    let args: CreateMetadataAccountV3InstructionArgs = {
        data: data,
        isMutable: true,
        collectionDetails: null,
    }

    let tx = createMetadataAccountV3(
        umi,
        {
            ...accounts,
            ...args,
        }
    )

    let result = await tx.sendAndConfirm(umi);

    const signature = umi.transactions.deserialize(result.signature);
    //console.log("Signature: ", signature);
    //console.log("Signature message: ", signature.message);
    console.log(`Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/${tx}?cluster=devnet`)

})();