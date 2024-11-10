import Card from "../../components/UI/Card";
import banner_img from "../../assets/about-banner.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-9 to-white">
      <img
        src={banner_img}
        alt="Banner Image"
        className="w-full max-h-[40vh] object-cover"
      />
      <div className="py-14 flex flex-col items-center gap-y-8">
        <Card additionalClassName="flex flex-col gap-y-6 justify-between bg-white rounded-md p-6 drop-shadow-lg max-md:w-full">
          <h2 className="text-xl font-bold text-blue-2">Our Mission</h2>
          <p>
            FaceFusion leverages several deep-learning approaches to generate
            animated videos from a single face image and an audio clip using
            Generative Adversarial Networks (GAN).
          </p>
          <p>
            The application's core functionality revolves around animating
            facial expressions and synchronizing mouth movements to match the
            provided audio, rendering the image with capabilities to speak
            naturally and expressively.
          </p>
        </Card>
        <Card additionalClassName="flex flex-col gap-y-6 justify-between bg-white rounded-md p-6 drop-shadow-lg max-md:w-full">
          <h2 className="text-xl font-bold text-blue-2">Our Vision</h2>
          <p>
            At FaceFusion, we envision a future where cutting-edge deep-learning
            technologies seamlessly transform static images into dynamic,
            lifelike animated videos. By leveraging advanced Generative
            Adversarial Networks (GANs), we aim to revolutionize the way users
            interact with visual content, enabling natural and expressive facial
            animations that synchronize perfectly with audio.
          </p>
          <p>
            Our goal is to empower creators, businesses, and educators with
            tools that simplify video production, enhance communication, and
            make content more engaging and accessible for all.
          </p>
        </Card>
        <Link
          to="/sample"
          className="text-base text-white bg-blue-2 px-3 py-2 rounded-md hover:bg-blue-3 transform transition-all duration-200 ease-in-out"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
