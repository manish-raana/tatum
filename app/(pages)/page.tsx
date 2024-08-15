import AddressForm from "@/components/AddressForm";

export default function Home() {  
  return (
    <main className="flex flex-col min-h-screen items-center justify-start p-24">
      <p className="text-3xl">Crypto Portfolio <i><b>powered by Tatum</b></i></p>
      
      <div className="mt-20 w-full flex flex-col items-center justify-center">
        <p>Check Wallet Balance and NFTs for you wallet</p>
        <AddressForm />
      </div>
    </main>
  );
}
