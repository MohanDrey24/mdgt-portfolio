import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      {/* <div className="bg-[url('/assets/herobg.png')] bg-cover bg-no-repeat bg-center"> */}
      <div className="bg-amber-400">
        <Hero />
      </div>
    </div>
  );
}
