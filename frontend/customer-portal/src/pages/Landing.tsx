import AboutUs from "../components/landing/About";
import CounterSection from "../components/landing/CounterSection";
import CustomerReviews from "../components/landing/CustomerReviews";
import ExclusiveMeals from "../components/landing/ExclusiveMeals";
import Hero from "../components/landing/Hero";
import PersonalisedSection from "../components/landing/PersonalisedSection";
import PopularCategory from "../components/landing/PopularCategory";
import Process from "../components/landing/Process";

const Landing = () => {


  return (
    <div>
      <Hero />
      <PopularCategory />
      <ExclusiveMeals />
      <Process />
      <PersonalisedSection />
      <CustomerReviews />
      <CounterSection />
      <AboutUs />
    </div>
  );
};

export default Landing;
