import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Card from "../Card";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const FAQs = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Card additionalClassName="flex flex-col gap-y-6">
      <h5 className="w-full text-center text-2xl font-bold">FAQs</h5>
      <div>
        <Accordion
          open={open === 1}
          icon={<Icon id={1} open={open} />}
          className="mb-2 p-[2px] rounded-lg bg-gradient-to-r from-blue-8 to-blue-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className={
              open === 1
                ? "bg-white rounded-t-md px-4"
                : "bg-white rounded-md px-4"
            }
          >
            How do I get started with creating a talking head video?
          </AccordionHeader>
          <AccordionBody className="bg-white rounded-b-md px-4">
            Simply upload a clear image of a face and an audio clip. Our AI will
            process the inputs to generate a realistic talking head video with
            synchronized facial expressions.
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={<Icon id={2} open={open} />}
          className="mb-2 p-[2px] rounded-lg bg-gradient-to-r from-blue-8 to-blue-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className={
              open === 2
                ? "bg-white rounded-t-md px-4"
                : "bg-white rounded-md px-4"
            }
          >
            What file formats are supported for image and audio uploads?
          </AccordionHeader>
          <AccordionBody className="bg-white rounded-b-md px-4">
            We currently support JPEG and PNG formats for images, and MP3
            formats for audio clips.
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={<Icon id={3} open={open} />}
          className="mb-2 p-[2px] rounded-lg bg-gradient-to-r from-blue-8 to-blue-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className={
              open === 3
                ? "bg-white rounded-t-md px-4"
                : "bg-white rounded-md px-4"
            }
          >
            Can I preview the video before downloading?
          </AccordionHeader>
          <AccordionBody className="bg-white rounded-b-md px-4">
            Yes, you can preview the animated video before finalizing and
            downloading it in your preferred resolution.
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          icon={<Icon id={4} open={open} />}
          className="mb-2 p-[2px] rounded-lg bg-gradient-to-r from-blue-8 to-blue-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className={
              open === 4
                ? "bg-white rounded-t-md px-4"
                : "bg-white rounded-md px-4"
            }
          >
            Is my data secure?
          </AccordionHeader>
          <AccordionBody className="bg-white rounded-b-md px-4">
            Absolutely. We implement robust security measures to ensure that
            your images and audio files are protected and handled in compliance
            with data protection regulations.
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 5}
          icon={<Icon id={5} open={open} />}
          className="mb-2 p-[2px] rounded-lg bg-gradient-to-r from-blue-8 to-blue-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(5)}
            className={
              open === 5
                ? "bg-white rounded-t-md px-4"
                : "bg-white rounded-md px-4"
            }
          >
            What resolutions are available for the final video download?
          </AccordionHeader>
          <AccordionBody className="bg-white rounded-b-md px-4">
            You can download your video in various resolutions, including
            standard and HD quality, depending on your needs.
          </AccordionBody>
        </Accordion>
      </div>
    </Card>
  );
};

export default FAQs;
