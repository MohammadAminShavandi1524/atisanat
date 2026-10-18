const Hero = () => {
  return (
    <>
      <section className="relative aspect-[1080/1920] w-full overflow-hidden bg-black sm:hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/mobile-video.webm"
          poster="/mobile-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </section>

      <section className="relative hidden aspect-[2/1] w-full overflow-hidden bg-black sm:block">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video2.webm"
          poster="/poster2.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </section>
    </>
  );
};

export default Hero;
