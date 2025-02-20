import ParticlesContainer from "../components/ParticlesContainer";
// import TypewriterEffect from "../components/TypewriterEffect";

const Sample = () => {
  // const examples = [
  //   "I'm a full-stack developer",
  //   "Wtf is happening with this shit",
  //   "I create and fix bugs",
  // ];

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      {/* <TypewriterEffect text={examples} /> */}
      <ParticlesContainer />
    </div>
  );
};

export default Sample;
