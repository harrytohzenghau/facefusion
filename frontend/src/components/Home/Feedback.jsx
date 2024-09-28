import Card from "../UI/Card";
import review_1 from "../../assets/review-1.jpg";
import review_2 from "../../assets/review-2.jpg";
import review_3 from "../../assets/review-3.jpg";

const Feedback = () => {
  return (
    <div className="overflow-hidden relative w-full bg-gradient-to-r from-blue-9 to-white">
      <Card additionalClassName="flex flex-col gap-y-6">
        <h5 className="w-full text-center text-2xl font-bold">
          Client's Feedback
        </h5>
        <div className="flex gap-x-6 justify-between">
          <Card additionalClassName="flex flex-col justify-between bg-white rounded-md p-6 drop-shadow-lg">
            <div className="flex flex-col justify-between h-full gap-y-6">
              <p>
                "FaceFusion has completely transformed the way I create content.
                As an educator, I needed a quick and efficient way to produce
                engaging videos for my students. The AI-powered animations are
                incredibly lifelike, and the lip-syncing is spot-on. It's been a
                game-changer for my online courses!"
              </p>
              <div className="flex flex-col gap-y-6">
                <hr />
                <div className="flex gap-x-4 items-center">
                  <img
                    src={review_1}
                    alt="Review 1"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="font-bold">
                    Sarah L. <br /> Online Educator
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <Card additionalClassName="flex flex-col justify-between bg-white rounded-md p-6 drop-shadow-lg">
            <div className="flex flex-col justify-between h-full gap-y-6">
              <p>
                "I was amazed at how easy it was to use this platform. Within
                minutes, I had a professional-looking video that I could use for
                my marketing campaign. The quality is outstanding, and the
                ability to create personalized content has really helped my
                business stand out."
              </p>
              <div className="flex flex-col gap-y-6">
                <hr />
                <div className="flex gap-x-4 items-center">
                  <img
                    src={review_2}
                    alt="Review 2"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="font-bold">
                    Nguyen Quoc An
                    <br /> Digital Marketer
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <Card additionalClassName="flex flex-col justify-between bg-white rounded-md p-6 drop-shadow-lg">
            <div className="flex flex-col justify-between h-full gap-y-6">
              <p>
                "This tool is a must-have for any content creator. The ability
                to turn a static image into a talking head video with just an
                audio clip is beyond impressive. It’s saved me so much time, and
                the results always exceed my expectations. Highly recommend!"
              </p>
              <div className="flex flex-col gap-y-6">
                <hr />
                <div className="flex gap-x-4 items-center">
                  <img
                    src={review_3}
                    alt="Review 3"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="font-bold">
                    Emily R. <br /> Social Media Influencer
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Feedback;