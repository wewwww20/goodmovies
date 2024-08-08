import Typewriter from "typewriter-effect";

const Typing = () => {
  return (
    <>
      <Typewriter
        options={{
          strings: [
            " Movies touch our hearts, awaken our vision, and change the way we see things",
            "Cinema is a matter of what's in the frame and what's out.",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </>
  );
};

export default Typing;
