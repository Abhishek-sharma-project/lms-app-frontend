import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 px-6 py-20 md:py-16 min-h-[65vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute top-20 left-10 w-44 md:w-60 h-44 md:h-60 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-52 md:w-64 h-52 md:h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left content */}
        <div className="space-y-6 text-center md:text-left max-w-lg mx-auto md:mx-0">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Build Skills That Shape Your Future
          </h1>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Discover structured courses that help you grow with clarity,
            confidence and real career impact.
          </p>

          {/* Button */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              onClick={() => navigate("my-learning")}
              className="px-8 py-4 text-lg w-full md:w-auto cursor-pointer"
            >
              Start Learning
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/course/search?query")}
              className="px-8 py-4 text-lg w-full md:w-auto cursor-pointer"
            >
              Browse Courses
            </Button>
          </div>
        </div>

        {/* Right content */}
        <div className="flex justify-center md:justify-end w-full mt-12 md:mt-6">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{ loop: true }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl overflow-hidden bg-card shadow-lg border"
          >
            <CarouselContent>
              <CarouselItem className="flex justify-center items-center h-56 sm:h-60 md:h-72">
                <img
                  src="background.png"
                  alt="Slide 1"
                  className="w-full h-full object-cover rounded-xl"
                />
              </CarouselItem>

              <CarouselItem className="flex justify-center items-center h-56 sm:h-60 md:h-72">
                <img
                  src="background1.png"
                  alt="Slide 2"
                  className="w-full h-full object-cover rounded-xl"
                />
              </CarouselItem>

              <CarouselItem className="flex justify-center items-center h-56 sm:h-60 md:h-72">
                <img
                  src="background2.png"
                  alt="Slide 3"
                  className="w-full h-full object-cover rounded-xl"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
