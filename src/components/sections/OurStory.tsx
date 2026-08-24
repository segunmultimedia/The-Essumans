import StoryTimeline from "@/components/ui/StoryTimeline";

export default function OurStory() {
  return (
    <section
      id="our-story"
      aria-label="Our Story"
      className="w-full bg-[#FBF7F1] section-pad"
    >
      <div className="container-e">
        {/* Section intro — centered header block */}
        <div className="text-center max-w-[600px] mx-auto">
          <p className="text-eyebrow text-[#5C202C] mb-5">The Essumans</p>
          <h2 className="text-section-heading text-[#1E1E1E] mb-5">
            Our Story
          </h2>
          <p className="text-body text-[#6B6560]">
            Every love story is beautiful. This one is ours.
          </p>
        </div>

        {/* Timeline milestones */}
        <StoryTimeline />
      </div>
    </section>
  );
}
