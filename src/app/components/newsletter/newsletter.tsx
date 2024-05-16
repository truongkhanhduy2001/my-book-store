import "./newsletter.css";
import Image from "next/image";
export default function Newsletter() {
  return (
    <section
      className="newsletter flex top-0 left-0 right-0 relative mt-[var(--margin-top)]"
      id="newsletter"
    >
      <div className="newsletter-container m-[auto] max-w-[var(--width-home)] w-[100%]">
        <div className="newsletter-content flex items-center justify-center">
          <div className="newsletter-left flex pl-[15px] pr-[15px] flex-[60%] justify-center !relative">
            <Image
              className="newsletter-img-1 max-w-[200px] w-[100%] h-[auto] !relative"
              src="/images/newsletter-1.png"
              alt="newsletter"
              fill
              priority={true}
              sizes="(max-with: 768px)100vw"
            />
            <Image
              className="newsletter-img-2 max-w-[200px] w-[100%] h-[auto] !relative"
              src="/images/newsletter-2.png"
              alt="newsletter"
              fill
              priority={true}
              sizes="(max-with: 768px)100vw"
            />
          </div>
          <div className="newsletter-right pl-[15px] pr-[15px] flex-[40%]">
            <h2 className="newsletter-heading text-[22px] mb-[20px] text-[var(--title-color)]">
              Sign Up for the
              <strong className="text-[var(--first-color)] text-[24px] ml-[10px]">
                NEWSLETTER
              </strong>
            </h2>
            <input
              type="email"
              className="email-input text-[var(--title-color)] w-[350px] p-[10px] mb-[10px] border border-solid border-[var(--border-color)] rounded-[5px] text-[16px] hover:border-[var(--first-color)] duration-[100ms]"
              placeholder="Enter your email"
            ></input>
            <button className="subscribe-button block mt-[10px] pt-[10px] pb-[10px] pl-[20px] pr-[20px] bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px] text-[16px] cursor-pointer hover:shadow-[0_4px_32px_var(--first-color)]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
