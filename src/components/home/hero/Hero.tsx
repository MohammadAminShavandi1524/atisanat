const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-[4/5] w-full sm:aspect-[2/1]">
        <picture>
          <source media="(max-width: 639px)" srcSet="/mobile-poster.webp" />

          <img
            src="/poster.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>

        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/poster.webp"
        >
          <source
            media="(max-width: 639px)"
            src="/mobile-video.webm"
            type="video/webm"
          />

          <source src="/video.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
};

export default Hero;
