
type CryptoAddressProps = {
  address: string;
};
const CryptoAddress = ({ address }: CryptoAddressProps) => {
  return (
    <p
    >
      {address?.slice(0, 5)} . . . {address?.slice(-5)}
    </p>
  );
};

export default CryptoAddress;
