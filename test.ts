import {
  TokenTransfer,
  type TokenId,
  type ChainAddress,
  UniversalAddress,
  toNative,
} from "@wormhole-foundation/sdk-connect";
import { wormhole } from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";

const main = async () => {
  const wh = await wormhole("Mainnet", [evm]);

  const token: TokenId = {
    chain: "Fantom",
    address: "native",
  };

  const sourceAddress: ChainAddress = {
    chain: "Fantom",
    address: toNative(
      "Fantom",
      new UniversalAddress("0xb926E36D439106090Be1151347CFB916E44AFE00")
    ),
  };
  const targetAddress: ChainAddress = {
    chain: "Moonbeam",
    address: toNative(
      "Fantom",
      new UniversalAddress("0xb926E36D439106090Be1151347CFB916E44AFE00")
    ),
  };

  const sourceChain = wh.getChain('Fantom');
  const targetChain = wh.getChain('Moonbeam');
  let amount = BigInt("1964174809988270000");

  // Create a TokenTransfer object to track the state of the transfer over time
  const xfer = await wh.tokenTransfer(
    token,
    amount,
    sourceAddress,
    targetAddress,
    true,
    undefined
  );

  const quote = await TokenTransfer.quoteTransfer(
    wh,
    sourceChain,
    targetChain,
    xfer.transfer
  );
  console.log(quote);
};

main();
