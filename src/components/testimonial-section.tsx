import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "The AI agents have transformed how our team manages research. We're saving hours each day and getting better results.",
    author: "Sarah Johnson",
    role: "Research Director, TechInsights",
    rating: 5,
  },
  {
    id: 2,
    content:
      "I was skeptical about AI automation, but these tools have exceeded my expectations. The data processing capabilities alone have saved us countless hours.",
    author: "Michael Chen",
    role: "Data Scientist, Analytics Co",
    rating: 5,
  },
  {
    id: 3,
    content:
      "As a solo entrepreneur, these AI agents feel like having a small team working alongside me. The email management tool is particularly impressive.",
    author: "Alex Rivera",
    role: "Founder, DigitalNomad",
    rating: 4,
  },
];
export default function TestimonialSection() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover how our AI agents and automation tools are transforming
            workflows for professionals across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-foreground italic mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
