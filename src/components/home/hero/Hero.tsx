const Hero = () => {
  return (
    <section className="relative aspect-[2/1] w-full overflow-hidden bg-black">
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
  );
};

export default Hero;
