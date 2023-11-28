import React, { useRef } from "react";
import Image from "next/image";

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // GPT code
  const smoothScroll = (element: HTMLElement) => {
    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scroll = easeInOutCubic(progress, startPosition, distance, duration);
      window.scrollTo(0, scroll);
      if (progress < duration) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  const scroll = () => {
    const aboutEl = scrollRef.current;
    if (aboutEl) {
      smoothScroll(aboutEl);
    }
  };

  // Not good very fast no good user experience
  // const scroll = () => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      <div className="relative h-[94vh] w-full flex flex-col items-center justify-center overflow-x-hidden">
        <div className="absolute inset-0">
          <Image src="/shapes.svg" alt="" layout="fill" objectFit="contain" />
        </div>

        <div className="flex flex-col items-center z-10">
          <h1 className="text-center text-white font-bold leading-none text-[30px] sm:text-[46px] md:text-6xl lg:text-7xl xl:text-8xl">
            Imagination fueled {""}
            <span>
              by
              <div>
                <Image src="/line.svg" alt="" layout="fixed" width={400} height={20} className="sm:flex hidden w-1/3" />
              </div>
            </span>
          </h1>
          <h1 className="text-center text-white font-bold leading-none text-[30px] sm:text-[46px] md:text-6xl lg:text-7xl xl:text-8xl">
            innovation
          </h1>
        </div>

        <button
          onClick={scroll}
          className="rounded-full absolute bottom-10 mb-4 flex items-center justify-center border-solid border-2 border-Neon-Green w-[100px] h-[100px]">
          <Image src="/arrowIcon.svg" alt="" width="32" height="24" />
        </button>
      </div>

      <div ref={scrollRef} className="flex flex-col justify-around bg-Eerie-Black py-8 h-[90vh]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 flex justify-center">
            <Image src="/placeholder.jpg" alt="About Us" width={500} height={300} />
          </div>
          <div className="md:w-1/2 text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 mx-4">About Us</h2>
            <p className="text-md md:text-lg text-justify mx-4">
              As a premier design and development studio, we specialize in transforming visionary ideas into tangible,
              products. Our passion lies in crafting experiences that are not only functional but also are precisely
              designed, ensuring that every project we touch leaves a lasting impression.
            </p>
          </div>
        </div>

        <div className="flex flex-col px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold my-8 md:mb-20">Proud to have worked with</h2>
          <div className="flex flex-wrap justify-around items-center gap-4 mb-16">
            <Image src="/placeholder.jpg" alt="Partner 1" width={175} height={175} />
            <Image src="/placeholder.jpg" alt="Partner 2" width={175} height={175} />
            <Image src="/placeholder.jpg" alt="Partner 3" width={175} height={175} />
            <Image src="/placeholder.jpg" alt="Partner 4" width={175} height={175} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
