const Hero = () => {
  return (
    <>
      <section className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:hidden">
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
          src="/video.webm"
          poster="/poster.webp"
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
